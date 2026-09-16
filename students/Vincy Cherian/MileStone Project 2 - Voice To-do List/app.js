// Voice To-do list — uses Web Speech API
(function(){
  const toggleBtn = document.getElementById('toggleBtn');
  const status = document.getElementById('status');
  const last = document.getElementById('last');
  const tasks = document.getElementById('tasks');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){
    status.textContent = 'SpeechRecognition not supported in this browser';
    startBtn.disabled = true;
    return;
  }

  const recognition = new SpeechRecognition();
  // keep listening until the user explicitly stops
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let listening = false;
  let shouldKeepListening = false; // tracks user intent to keep the mic open

  toggleBtn.addEventListener('click', () => {
    if(listening){
      // user clicked to stop
      shouldKeepListening = false;
      recognition.stop();
      toggleBtn.disabled = true; // wait for onend to update UI
    } else {
      // user clicked to start and wants continuous listening
      shouldKeepListening = true;
      tryStart();
    }
  });

  function tryStart(){
    try{
      recognition.start();
    }catch(e){
      // some browsers throw if start called repeatedly
    }
  }

  recognition.onstart = () => {
    listening = true;
    status.textContent = 'Listening…';
    toggleBtn.textContent = 'Stop Listening';
    toggleBtn.disabled = false;
  };

  recognition.onend = () => {
    // If the user still wants to keep listening, restart.
    if(shouldKeepListening){
      // small timeout to avoid race conditions in some browsers
      setTimeout(() => tryStart(), 5000);
      return;
    }
    listening = false;
    status.textContent = 'Idle';
    toggleBtn.textContent = 'Start Listening';
    toggleBtn.disabled = false;
  };

  recognition.onerror = (e) => {
    status.textContent = 'Error: ' + (e.error || 'unknown');
    // stop continuous attempts when an error occurs
    shouldKeepListening = false;
    toggleBtn.textContent = 'Start Listening';
    toggleBtn.disabled = false;
  };

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();
    last.textContent = transcript;
    handleTranscript(transcript);
  };

  function handleTranscript(t){
    // detect "Done Task N" (e.g. "Done Task 1")
    const m = t.match(/done task\s*(\d+)/i);
    if(m){
      const n = parseInt(m[1], 10);
      markDone(n);
    } else {
      addTask(t);
    }
  }

  function addTask(text){
    const li = document.createElement('li');
    li.textContent = text;
    tasks.appendChild(li);
  }

  function markDone(n){
    if(!n || n < 1) return;
    const item = tasks.children[n-1];
    if(item) item.classList.add('completed');
    else status.textContent = `No task ${n}`;
  }

})();
