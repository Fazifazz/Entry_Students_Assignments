const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Who is making the Web standards?",
        options: ["Google", "The World Wide Web Consortium", "Microsoft", "Mozilla"],
        answer: "The World Wide Web Consortium"
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        options: ["<heading>", "<h6>", "<head>", "<h1>"],
        answer: "<h1>"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<brk>"],
        answer: "<br>"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: ["In the <head> section", "In the <body> section", "At the end of the document", "You can't refer to an external style sheet"],
        answer: "In the <head> section"
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["font", "styles", "class", "style"],
        answer: "style"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');

const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const questionCounter = document.getElementById('question-counter');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const feedbackMessage = document.getElementById('feedback-message');
const restartBtn = document.getElementById('restart-btn');
const midRestartBtn = document.getElementById('mid-restart-btn');

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionCounter.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(button, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedButton, correctAnswer) {
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true); // Disable all buttons

    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        // Highlight the correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    finalScore.textContent = `You scored ${score} out of ${questions.length}`;
    
    let feedback = '';
    if (score === questions.length) {
        feedback = 'Perfect score! Outstanding work!';
    } else if (score >= questions.length * 0.7) {
        feedback = 'Great job! You know your stuff.';
    } else if (score >= questions.length * 0.5) {
        feedback = 'Good effort! A little more practice will make you a pro.';
    } else {
        feedback = 'Keep learning! You can do better next time.';
    }
    
    feedbackMessage.textContent = feedback;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    renderQuestion();
}

restartBtn.addEventListener('click', restartQuiz);
midRestartBtn.addEventListener('click', restartQuiz);

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    renderQuestion();
});
