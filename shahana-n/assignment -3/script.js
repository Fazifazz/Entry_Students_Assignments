// Questions array

const questions = [

    {
        question: "What is JavaScript?",
        options: [
            "A programming language",
            "A database",
            "An operating system",
            "A web browser"
        ],
        answer: "A programming language"
    },

    {
        question: "Which keyword is used to declare a variable?",
        options: [
            "var",
            "variable",
            "int",
            "string"
        ],
        answer: "var"
    },

    {
        question: "Which method is used to add an element to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "slice()"
        ],
        answer: "push()"
    },

    {
        question: "Which method removes the last element from an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        answer: "pop()"
    },

    {
        question: "Which symbol is used for strict equality?",
        options: [
            "==",
            "=",
            "===",
            "!="
        ],
        answer: "==="
    },

    {
        question: "Which method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "getElementByClass()",
            "queryElement()",
            "selectId()"
        ],
        answer: "getElementById()"
    },

    {
        question: "Which method is used to create a new HTML element?",
        options: [
            "createElement()",
            "newElement()",
            "makeElement()",
            "addElement()"
        ],
        answer: "createElement()"
    },

    {
        question: "Which keyword is used to define a constant?",
        options: [
            "let",
            "var",
            "const",
            "constant"
        ],
        answer: "const"
    }

];


// Variables

let currentQuestion = 0;
let score = 0;


// Get HTML elements

const startBox = document.getElementById("start-box");
const startButton = document.getElementById("start-btn");

const quizBox = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

const resultBox = document.getElementById("result-box");
const resultElement = document.getElementById("result");
const feedbackElement = document.getElementById("feedback");

const restartButton = document.getElementById("restart-btn");


// Display question

const showQuestion = () => {

    optionsElement.textContent = "";

    nextButton.disabled = true;

    const question = questions[currentQuestion];

    questionElement.textContent =
        "Question " + (currentQuestion + 1) + ": " + question.question;


    // Create option buttons

    question.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");


        // Click event

        button.addEventListener("click", () => {

            checkAnswer(button, option);

        });


        optionsElement.appendChild(button);

    });

};


// Check answer

const checkAnswer = (selectedButton, selectedAnswer) => {

    const correctAnswer = questions[currentQuestion].answer;

    const buttons = document.querySelectorAll(".option-btn");


    // Disable all buttons

    buttons.forEach(button => {

        button.disabled = true;

    });


    // Check answer

    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        score++;

    } else {

        selectedButton.classList.add("wrong");


        // Show correct answer

        buttons.forEach(button => {

            if (button.textContent === correctAnswer) {

                button.classList.add("correct");

            }

        });

    }


    nextButton.disabled = false;

};


// Start Quiz

startButton.addEventListener("click", () => {

    startBox.classList.add("hidden");

    quizBox.classList.remove("hidden");

    currentQuestion = 0;

    score = 0;

    showQuestion();

});


// Next Question

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// Show Result

const showResult = () => {

    quizBox.classList.add("hidden");

    resultBox.classList.remove("hidden");


    resultElement.textContent =
        "You scored " + score + " out of " + questions.length;


    if (score === questions.length) {

        feedbackElement.textContent =
            "Excellent! Perfect score! 🎉";

    } else if (score >= 6) {

        feedbackElement.textContent =
            "Great job! Keep it up! 👏";

    } else if (score >= 4) {

        feedbackElement.textContent =
            "Good effort! Keep practicing! 👍";

    } else {

        feedbackElement.textContent =
            "Keep practicing. You can do better! 💪";

    }

};


// Restart Quiz

restartButton.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    resultBox.classList.add("hidden");

    quizBox.classList.add("hidden");

    startBox.classList.remove("hidden");

});