// QUESTIONS ARRAY

const questions = [
    {
        question: "Which language is used to make a webpage interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },

    {
        question: "Which method is used to print something in the console?",
        options: ["print()", "console.log()", "display()", "write()"],
        answer: "console.log()"
    },

    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },

    {
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: "push()"
    },

    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Document Order Model",
            "Digital Object Model"
        ],
        answer: "Document Object Model"
    },

    {
        question: "Which method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "getElement()",
            "queryId()",
            "selectId()"
        ],
        answer: "getElementById()"
    },

    {
        question: "Which keyword is used to create a function in JavaScript?",
        options: ["function", "func", "method", "define"],
        answer: "function"
    }
];


// VARIABLES

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// GET HTML ELEMENTS

const quizBox = document.getElementById("quiz-box");
const nextButton = document.getElementById("next-btn");



// DISPLAY QUESTION

function showQuestion() {

    answerSelected = false;
    nextButton.disabled = true;
    quizBox.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];

    // CREATE QUESTION

    const questionElement = document.createElement("div");

    questionElement.classList.add("question");

    questionElement.textContent =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    quizBox.appendChild(questionElement);


    // CREATE OPTIONS CONTAINER

    const optionsContainer = document.createElement("div");

    optionsContainer.classList.add("options");



    // CREATE OPTION BUTTONS

    currentQuestion.options.forEach(function (option) {

        const optionButton = document.createElement("button");

        optionButton.classList.add("option-btn");

        optionButton.textContent = option;


        // Click event
        optionButton.addEventListener("click", function () {

            checkAnswer(optionButton, option);

        });


        optionsContainer.appendChild(optionButton);

    });


    quizBox.appendChild(optionsContainer);
}


// CHECK ANSWER

function checkAnswer(selectedButton, selectedAnswer) {

    // Prevent selecting another answer
    if (answerSelected) {
        return;
    }

    answerSelected = true;

    const currentQuestion = questions[currentQuestionIndex];


    const optionButtons =
        document.querySelectorAll(".option-btn");



    optionButtons.forEach(function (button) {
        button.disabled = true;
    });



    // CORRECT ANSWER

    if (selectedAnswer === currentQuestion.answer) {

        selectedButton.classList.add("correct");

        score++;

    }


    // WRONG ANSWER

    else {

        selectedButton.classList.add("wrong");


        // Find the correct answer button
        optionButtons.forEach(function (button) {

            if (button.textContent === currentQuestion.answer) {

                button.classList.add("correct");

            }

        });


        // Show correct answer text
        const correctAnswerText =
            document.createElement("p");

        correctAnswerText.classList.add("correct-answer");

        correctAnswerText.textContent =
            `Correct Answer: ${currentQuestion.answer}`;

        quizBox.appendChild(correctAnswerText);

    }

    nextButton.disabled = false;
}


// NEXT QUESTION

nextButton.addEventListener("click", function () {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showFinalScore();

    }

});


// FINAL SCORE

function showFinalScore() {

    // Clear quiz content
    quizBox.innerHTML = "";

    nextButton.style.display = "none";


    const scoreElement = document.createElement("div");

    scoreElement.classList.add("score");

    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}`;

    quizBox.appendChild(scoreElement);


    // FEEDBACK MESSAGE

    const feedbackElement = document.createElement("p");

    feedbackElement.classList.add("feedback");


    if (score === questions.length) {

        feedbackElement.textContent =
            "Excellent! Perfect score! 🎉";

    }

    else if (score >= 6) {

        feedbackElement.textContent =
            "Great job! You have a good understanding of JavaScript.";

    }

    else if (score >= 4) {

        feedbackElement.textContent =
            "Good effort! Keep practicing.";

    }

    else {

        feedbackElement.textContent =
            "Keep learning and try again!";

    }


    quizBox.appendChild(feedbackElement);


    // RESTART BUTTON

    const restartButton = document.createElement("button");

    restartButton.classList.add("restart-btn");

    restartButton.textContent = "Restart Quiz";


    restartButton.addEventListener("click", restartQuiz);


    quizBox.appendChild(restartButton);
}

// RESTART QUIZ
function restartQuiz() {

    currentQuestionIndex = 0;

    score = 0;

    answerSelected = false;

    nextButton.style.display = "inline-block";

    showQuestion();
}

showQuestion();