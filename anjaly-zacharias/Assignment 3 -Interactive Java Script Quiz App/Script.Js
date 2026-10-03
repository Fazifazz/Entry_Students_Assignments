document.addEventListener("DOMContentLoaded", function () {
    
    // Questions Array

const questions = [
    {
        question: "Which language is used to add interactivity to a webpage?",
        options: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        correctAnswer: "JavaScript"
    },

    {
        question: "Which method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "queryElement()",
            "getId()",
            "selectElement()"
        ],
        correctAnswer: "getElementById()"
    },

    {
        question: "Which keyword is used to declare a constant variable?",
        options: ["let", "var", "const", "value"],
        correctAnswer: "const"
    },

    {
        question: "Which event occurs when a user clicks an element?",
        options: ["mouseover", "click", "load", "change"],
        correctAnswer: "click"
    },

    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        correctAnswer: "==="
    },

    {
        question: "Which method prints output to the browser console?",
        options: [
            "print()",
            "console.log()",
            "document.write()",
            "output()"
        ],
        correctAnswer: "console.log()"
    },

    {
        question: "Which property is used to change the text inside an HTML element?",
        options: [
            "textContent",
            "valueText",
            "changeText",
            "innerStyle"
        ],
        correctAnswer: "textContent"
    },

    {
        question: "Which type of variable is used to store multiple values?",
        options: ["String", "Boolean", "Array", "Number"],
        correctAnswer: "Array"
    }
];


// Variables

let currentQuestionIndex = 0;
let score = 0;


// Get HTML Elements

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const answerMessage = document.getElementById("answer-message");
const restartButton = document.getElementById("restart-btn");


// Start Quiz

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerText = "Next Question";

    showQuestion();
}


// Show Current Question

function showQuestion() {

    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText =
        (currentQuestionIndex + 1) + ". " + currentQuestion.question;


    currentQuestion.options.forEach(function(option) {

        const button = document.createElement("button");

        button.innerText = option;

        button.classList.add("option-btn");

        answerButtons.appendChild(button);

        button.addEventListener("click", selectAnswer);
    });
}


// Select Answer

function selectAnswer(event) {

    const selectedButton = event.target;

    const selectedAnswer = selectedButton.innerText;

    const correctAnswer =
        questions[currentQuestionIndex].correctAnswer;


    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        answerMessage.innerText = "Correct Answer!";

        score++;

    } else {

        selectedButton.classList.add("wrong");

        answerMessage.innerText =
            "Correct Answer: " + correctAnswer;


        // Highlight the correct option
        const allButtons = answerButtons.children;

        for (let button of allButtons) {

            if (button.innerText === correctAnswer) {

                button.classList.add("correct");
            }
        }
    }


    // Disable buttons after selecting one answer

    const allButtons = answerButtons.children;

    for (let button of allButtons) {

        button.disabled = true;
    }


    // Show Next Question button

    nextButton.style.display = "block";
}


// Next Question

nextButton.addEventListener("click", function() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();
    }
});


// Reset Question Area

function resetState() {

    nextButton.style.display = "none";

    answerMessage.innerText = "";

    while (answerButtons.firstChild) {

        answerButtons.removeChild(answerButtons.firstChild);
    }
}


// Show Final Score

function showScore() {

    resetState();

    let feedbackMessage;

    if (score === 8) {
        feedbackMessage = "Excellent!";
    } else if (score >= 6) {
        feedbackMessage = "Very Good!";
    } else if (score >= 4) {
        feedbackMessage = "Good effort!";
    } else {
        feedbackMessage = "Keep practicing!";
    }

    questionElement.innerText =
        "You scored " + score + " out of 8 — " + feedbackMessage;

    //  Hide next button
    nextButton.style.display = "none";

    //  Show restart button
    restartButton.style.display = "block";
}


// Restart Quiz

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    // Hide restart button
    restartButton.style.display = "none";

    // Show next button again
    nextButton.style.display = "none";

    showQuestion();
}

restartButton.addEventListener("click", restartQuiz);


// Start the quiz when page loads

startQuiz();
});