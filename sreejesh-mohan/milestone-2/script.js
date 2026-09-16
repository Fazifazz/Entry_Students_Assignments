const flashcards = [
    {
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter"
    },
    {
        question: "What year was JavaScript created?",
        answer: "1995"
    },
    {
        question: "What is the chemical symbol for gold?",
        answer: "Au"
    }
];

let currentIndex = 0;
const synth = window.speechSynthesis;

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
}

const flashcardEl = document.getElementById('flashcard');
const questionEl = document.getElementById('question-text');
const answerEl = document.getElementById('answer-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const speakBtn = document.getElementById('speak-btn');
const micBtn = document.getElementById('mic-btn');
const restartBtn = document.getElementById('restart-btn');
const currentIndexEl = document.getElementById('current-index');
const totalCardsEl = document.getElementById('total-cards');
const recognitionResultEl = document.getElementById('recognition-result');

function init() {
    totalCardsEl.textContent = flashcards.length;
    updateCard();
}

function updateCard() {
    // Reset flip if flipped
    if (flashcardEl.classList.contains('flipped')) {
        flashcardEl.classList.remove('flipped');
        // Wait for flip animation to finish before changing text
        setTimeout(() => {
            setCardContent();
        }, 300); // half of transition time to be safe
    } else {
        setCardContent();
    }
}

function setCardContent() {
    const card = flashcards[currentIndex];
    questionEl.textContent = card.question;
    answerEl.textContent = card.answer;
    currentIndexEl.textContent = currentIndex + 1;
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    
    nextBtn.disabled = currentIndex === flashcards.length - 1;
    nextBtn.style.opacity = currentIndex === flashcards.length - 1 ? '0.5' : '1';
    nextBtn.style.cursor = currentIndex === flashcards.length - 1 ? 'not-allowed' : 'pointer';
}

function speakAnswer() {
    if (synth.speaking) {
        synth.cancel();
    }

    const card = flashcards[currentIndex];
    const utterance = new SpeechSynthesisUtterance(card.answer);
    
    // Customize voice (optional)
    utterance.rate = 0.7; // Slower speed
    utterance.pitch = 1;

    utterance.onstart = () => {
        speakBtn.classList.add('speaking');
        // Ensure card is flipped to see the answer while it's being spoken
        if (!flashcardEl.classList.contains('flipped')) {
            flashcardEl.classList.add('flipped');
        }
    };

    utterance.onend = () => {
        speakBtn.classList.remove('speaking');
    };

    utterance.onerror = () => {
        speakBtn.classList.remove('speaking');
        console.error('Speech synthesis error');
    };

    synth.speak(utterance);
}

// Event Listeners
flashcardEl.addEventListener('click', () => {
    flashcardEl.classList.toggle('flipped');
    if (synth.speaking) {
        synth.cancel();
        speakBtn.classList.remove('speaking');
    }
});

speakBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent card flip from triggering if button is clicked
    speakAnswer();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        synth.cancel();
        speakBtn.classList.remove('speaking');
        recognitionResultEl.textContent = '';
        updateCard();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        synth.cancel();
        speakBtn.classList.remove('speaking');
        recognitionResultEl.textContent = '';
        updateCard();
    }
});

restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    synth.cancel();
    speakBtn.classList.remove('speaking');
    recognitionResultEl.style.display = 'none';
    updateCard();
});

if (micBtn && recognition) {
    micBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        recognitionResultEl.style.display = 'flex';
        recognitionResultEl.style.borderColor = '#4c51bf';
        recognitionResultEl.style.color = 'var(--text-secondary)';
        recognitionResultEl.innerHTML = '<span style="opacity: 0.6; font-style: italic;">Listening... Speak now</span>';
        try {
            recognition.start();
        } catch(err) {
            console.error(err);
        }
    });

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (interimTranscript) {
            recognitionResultEl.textContent = interimTranscript;
            recognitionResultEl.style.color = 'var(--text-primary)';
        }

        if (finalTranscript) {
            const card = flashcards[currentIndex];
            const cleanedTranscript = finalTranscript.toLowerCase().replace(/[^a-z0-9]/g, '');
            const cleanedAnswer = card.answer.toLowerCase().replace(/[^a-z0-9]/g, '');

            if (cleanedTranscript.includes(cleanedAnswer) || cleanedAnswer.includes(cleanedTranscript)) {
                recognitionResultEl.innerHTML = `Correct! You said: <br><strong>"${finalTranscript}"</strong>`;
                recognitionResultEl.style.color = '#38a169'; // green
                recognitionResultEl.style.borderColor = '#38a169';
                
                // Flip card to show answer
                if (!flashcardEl.classList.contains('flipped')) {
                    flashcardEl.classList.add('flipped');
                }
            } else {
                recognitionResultEl.innerHTML = `Incorrect. You said: <br><strong>"${finalTranscript}"</strong>`;
                recognitionResultEl.style.color = '#e53e3e'; // red
                recognitionResultEl.style.borderColor = '#e53e3e';
            }
        }
    };

    recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
            recognitionResultEl.innerHTML = 'Microphone access denied. <br><small>(Chrome blocks mics on local files. Try a local server like Live Server)</small>';
        } else if (event.error === 'network') {
            recognitionResultEl.textContent = 'Network error (internet required for speech recognition).';
        } else if (event.error === 'no-speech') {
            recognitionResultEl.textContent = 'No speech detected. Please speak loudly.';
        } else {
            recognitionResultEl.textContent = `Could not hear you properly (${event.error}). Try again.`;
        }
        recognitionResultEl.style.color = '#e53e3e';
    };
} else if (micBtn) {
    micBtn.addEventListener('click', () => {
        alert("Speech Recognition API is not supported in this browser.");
    });
}

// Initialize app
init();
