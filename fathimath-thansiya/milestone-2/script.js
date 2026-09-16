/* Voice Calculator — vanilla JS, no dependencies.
 * Expects elements from index.html: #expression, #result, #mic, #mic-label,
 * #speak-toggle, #hint, #history-list, #clear-history, #mode-calc, #mode-voice,
 * and the .keys grid containing buttons with data-action attributes.
 */
(() => {
  'use strict';

  // ---------- State ----------
  const state = {
    expression: '',       // built expression string (e.g. "12+5*3")
    lastResult: '',       // last computed result text
    justEvaluated: false, // true right after pressing '=' so next digit starts fresh
    history: [],          // [{expr, value}]
    mode: 'calc',         // 'calc' | 'voice'
    speak: false,
  };

  // ---------- DOM ----------
  const $expr = document.getElementById('expression');
  const $res  = document.getElementById('result');
  const $mic  = document.getElementById('mic');
  const $micLabel = document.getElementById('mic-label');
  const $speak = document.getElementById('speak-toggle');
  const $hint = document.getElementById('hint');
  const $history = document.getElementById('history-list');
  const $clearHistory = document.getElementById('clear-history');
  const $modeCalc = document.getElementById('mode-calc');
  const $modeVoice = document.getElementById('mode-voice');

  // ---------- Display helpers ----------
  function setExpression(text) {
    state.expression = text;
    $expr.textContent = text;
  }
  function setResult(text, isError = false) {
    $res.textContent = text;
    $res.classList.toggle('error', !!isError);
    state.lastResult = text;
  }
  function setHint(msg, isError = false) {
    $hint.textContent = msg || '';
    $hint.classList.toggle('warn', !!isError);
  }

  // ---------- Calculator core ----------
  function evaluateExpression(expr) {
    // Allow digits, single ops (+ - * /), double-star (**), parens, dot, whitespace.
    let clean = String(expr).replace(/[^0-9+\-*/().\s]/g, '').replace(/\s+/g, '');
    if (!clean) throw new Error('Empty expression');
    if (!/^-?[0-9+\-*/().]+$/.test(clean)) throw new Error('Invalid characters');
    // Replace "**" with a placeholder so the "no two adjacent operators" check
    // doesn't mis-flag it. Then forbid any remaining adjacent operators.
    clean = clean.replace(/\*\*/g, '^');
    if (/[+\-*/.^][+\-*/.^]/.test(clean)) throw new Error('Bad format');
    if (/\.\d*\./.test(clean)) throw new Error('Bad format');
    clean = clean.replace(/\^/g, '**');
    // eslint-disable-next-line no-new-func
    const value = Function('"use strict"; return (' + clean + ')')();
    if (!Number.isFinite(value)) throw new Error('Math error');
    return value;
  }

  function formatNumber(n) {
    if (Number.isInteger(n)) return String(n);
    // up to 10 significant digits, strip trailing zeros
    const rounded = parseFloat(n.toPrecision(10));
    return String(rounded);
  }

  function commit(value, exprOverride) {
    const expr = exprOverride != null ? exprOverride : state.expression;
    let resultText;
    try {
      const v = evaluateExpression(expr);
      resultText = formatNumber(v);
      pushHistory(expr, resultText);
      if (state.speak && state.mode === 'voice') speakResult(expr, resultText);
    } catch (e) {
      resultText = e.message || 'Error';
    }
    setResult(resultText, !/^-?\d+(\.\d+)?$/.test(resultText));
    state.justEvaluated = true;
  }

  function pushHistory(expr, value) {
    state.history.unshift({ expr, value });
    if (state.history.length > 20) state.history.pop();
    renderHistory();
  }

  function renderHistory() {
    if (!state.history.length) {
      $history.innerHTML = '<div class="history-empty">No calculations yet.</div>';
      return;
    }
    $history.innerHTML = state.history
      .map((h, i) => `<div class="row" data-i="${i}" title="Click to reuse">
            <span class="expr">${escapeHtml(h.expr)}</span>
            <span class="val">${escapeHtml(h.value)}</span>
          </div>`)
      .join('');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // ---------- Keypad ----------
  function appendToken(token) {
    if (state.justEvaluated) {
      // Start a fresh expression after "=" unless user adds an operator (continuation).
      if (/[0-9.(]/.test(token)) {
        setExpression('');
      }
      state.justEvaluated = false;
    }
    // Prevent two operators in a row, but allow leading minus
    const last = state.expression.slice(-1);
    if (/[+\-*/]/.test(token) && /[+\-*/]/.test(last)) {
      // Replace the previous operator
      setExpression(state.expression.slice(0, -1) + token);
      return;
    }
    // Prevent leading operator except minus
    if (/[+*/]/.test(token) && state.expression === '') return;
    setExpression(state.expression + token);
  }

  document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.action;
      const v = btn.dataset.value;
      switch (a) {
        case 'digit':   appendToken(v); break;
        case 'dot':     appendToken('.'); break;
        case 'op':      appendToken(v); break;
        case 'clear':   setExpression(''); setResult('0'); state.justEvaluated = false; break;
        case 'sign': {
          // Toggle sign of the current number (or whole expression)
          if (!state.expression) { setExpression('-'); break; }
          // Find last number
          const m = state.expression.match(/(-?\d+(\.\d+)?)$/);
          if (!m) {
            if (state.expression.startsWith('-')) setExpression(state.expression.slice(1));
            else setExpression('-' + state.expression);
          } else {
            const num = m[1];
            const toggled = num.startsWith('-') ? num.slice(1) : '-' + num;
            setExpression(state.expression.slice(0, m.index) + toggled);
          }
          break;
        }
        case 'percent': {
          // Treat trailing number as /100
          const m = state.expression.match(/(\d+(\.\d+)?)$/);
          if (m) {
            const start = state.expression.slice(0, m.index);
            const num = m[1];
            setExpression(start + '(' + num + '/100)');
          }
          break;
        }
        case 'equals': commit(null, state.expression); break;
      }
    });
  });

  // ---------- History interactions ----------
  $history.addEventListener('click', (e) => {
    const row = e.target.closest('.row');
    if (!row) return;
    const i = Number(row.dataset.i);
    const h = state.history[i];
    if (!h) return;
    setExpression(h.expr);
    setResult(h.value);
    state.justEvaluated = true;
  });
  $clearHistory.addEventListener('click', () => {
    state.history = [];
    renderHistory();
  });

  // ---------- Mode toggle ----------
  function setMode(m) {
    state.mode = m;
    $modeCalc.classList.toggle('active', m === 'calc');
    $modeVoice.classList.toggle('active', m === 'voice');
    $modeCalc.setAttribute('aria-selected', m === 'calc');
    $modeVoice.setAttribute('aria-selected', m === 'voice');
    if (m === 'voice' && recognition && recognition.state !== 'listening') {
      setHint('Voice mode — tap the mic and speak a math expression.');
    } else if (m === 'calc') {
      setHint('Use the keypad, or tap Voice to switch.');
    }
  }
  $modeCalc.addEventListener('click', () => setMode('calc'));
  $modeVoice.addEventListener('click', () => setMode('voice'));

  // ---------- Speak toggle ----------
  $speak.addEventListener('click', () => {
    state.speak = !state.speak;
    $speak.setAttribute('aria-pressed', String(state.speak));
  });

  // ---------- Spoken math → expression ----------
  // Exposed via outer var so recognition.onresult (declared below) can call it.
  const SMALL = {
    zero:0, one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9,
    ten:10, eleven:11, twelve:12, thirteen:13, fourteen:14, fifteen:15,
    sixteen:16, seventeen:17, eighteen:18, nineteen:19,
  };
  const TENS  = { twenty:20, thirty:30, forty:40, fifty:50, sixty:60, seventy:70, eighty:80, ninety:90 };
  const SCALE = { hundred:100, thousand:1000, million:1000000, billion:1000000000 };

  function spokenToExpression(text) {
    if (!text) return '';
    let s = ' ' + text.toLowerCase().replace(/[?!.,]/g, ' ') + ' ';

    // Operator words. Each alternation is grouped so word-boundary anchors apply to every alternative.
    s = s.replace(/\bplus\b/g, ' + ');
    s = s.replace(/\b(?:add(?:ed)?|added to)\b/g, ' + ');
    s = s.replace(/\b(?:minus|less)\b/g, ' - ');
    s = s.replace(/\b(?:times|multiplied by|into|x)\b/g, ' * ');
    s = s.replace(/\b(?:divided?|divide)\s+by\b/g, ' / ');
    s = s.replace(/\b(?:divide|over)\b/g, ' / ');
    s = s.replace(/\bmod(?:ulo)?\b/g, ' % ');
    s = s.replace(/\b(?:raise[d]? to (?:the )?power of|to the power of|power of)\b/g, ' ** ');
    s = s.replace(/\bsquared\b/g, ' ** 2 ');
    s = s.replace(/\bcubed\b/g, ' ** 3 ');
    s = s.replace(/\bpoint\b/g, '.');
    s = s.replace(/\bopen(?:ing)?\s*(?:bracket|paren|parenthesis)\b/g, '(');
    s = s.replace(/\bclose[d]?\s*(?:bracket|paren|parenthesis)\b/g, ')');
    s = s.replace(/\bpercent(?:\s+of)?\b/g, '% ');

    // Tokens: number words, digit runs, operators, parens, whitespace
    const tokens = s.match(/[A-Za-z]+|\d+|[+\-*/%().]|\s+/g) || [];

    // Parse each run of consecutive number words as a single English number
    // using standard place-value rules (hundred/thousand/million/billion).
    const out = [];
    let numWords = [];
    const flushNum = () => {
      if (numWords.length) {
        let current = 0, total = 0;
        for (const w of numWords) {
          if (SMALL[w] != null) current += SMALL[w];
          else if (TENS[w] != null) current += TENS[w];
          else if (SCALE[w] != null) {
            if (current === 0) current = 1;
            current *= SCALE[w];
            if (SCALE[w] >= 1000) { total += current; current = 0; }
          }
        }
        out.push(String(total + current));
        numWords = [];
      }
    };
    for (const t of tokens) {
      if (t.trim() === '') continue;
      if (/^[+\-*/%().]$/.test(t)) { flushNum(); out.push(t); continue; }
      if (/^\d+$/.test(t)) { flushNum(); out.push(t); continue; }
      if (SMALL[t] != null || TENS[t] != null || SCALE[t] != null) { numWords.push(t); continue; }
      // Unknown word — drop
    }
    flushNum();

    let expr = out.join('');

    // "X percent" → "(X/100)"; strip stray "%"
    expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

    // Implicit multiplication: "2(3+4)", "(2)(3)", "(2)3", "(10/100)200"
    expr = expr.replace(/\)\(/g, ')*(');
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)(\d)/g, ')*$1');

    return expr;
  }

  // ---------- Speech recognition ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SR) {
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-US';
    recognition.maxAlternatives = 1;

    let finalTranscript = '';

    recognition.onstart = () => {
      $mic.classList.add('listening');
      $micLabel.textContent = 'Listening… tap to stop';
      setHint('Listening… speak a math expression.');
      finalTranscript = '';
      setExpression('');
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += t;
        else interim += t;
      }
      const text = (finalTranscript + interim).trim();
      const expr = spokenToExpression(text);
      setExpression(expr || text);
    };

    recognition.onerror = (event) => {
      $mic.classList.remove('listening');
      $micLabel.textContent = 'Hold to speak';
      const msg = {
        'no-speech': 'No speech detected. Try again.',
        'audio-capture': 'Microphone unavailable.',
        'not-allowed': 'Microphone permission denied.',
        'network': 'Network error during recognition.',
      }[event.error] || `Recognition error: ${event.error}`;
      setHint(msg, true);
    };

    recognition.onend = () => {
      $mic.classList.remove('listening');
      $micLabel.textContent = 'Hold to speak';
      // Auto-evaluate whatever we have
      if (state.expression.trim()) {
        commit(null, state.expression);
      }
    };
  } else {
    $mic.disabled = true;
    $mic.title = 'Speech recognition not supported in this browser. Try Chrome or Edge.';
    setHint('Speech recognition not supported here. The keypad still works.', true);
  }

  // Toggle recognition on mic press
  $mic.addEventListener('click', () => {
    if (!recognition) return;
    if (recognition.state === 'listening') {
      try { recognition.stop(); } catch (_) {}
    } else {
      try { recognition.start(); } catch (_) {
        setHint('Could not start recognition. Check microphone permissions.', true);
      }
    }
  });

  // ---------- Speech synthesis (speak results) ----------
  function speakResult(expr, value) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(`${expr} equals ${value}`);
      utter.rate = 1.0;
      utter.pitch = 1.0;
      utter.lang = navigator.language || 'en-US';
      window.speechSynthesis.speak(utter);
    } catch (_) { /* ignore */ }
  }

  // ---------- Keyboard support ----------
  window.addEventListener('keydown', (e) => {
    if (/^[0-9]$/.test(e.key)) { appendToken(e.key); e.preventDefault(); return; }
    if (e.key === '.') { appendToken('.'); e.preventDefault(); return; }
    if (['+','-','*','/'].includes(e.key)) { appendToken(e.key); e.preventDefault(); return; }
    if (e.key === 'Enter' || e.key === '=') { commit(null, state.expression); e.preventDefault(); return; }
    if (e.key === 'Backspace') {
      setExpression(state.expression.slice(0, -1));
      e.preventDefault();
      return;
    }
    if (e.key === 'Escape') {
      setExpression('');
      setResult('0');
      state.justEvaluated = false;
      e.preventDefault();
      return;
    }
  });

  // ---------- Init ----------
  setExpression('');
  setResult('0');
  renderHistory();
  setMode('calc');
})();