
//QUESTIONS ARRAY
// Array containing 8 question objects

const questions = [

    {
        question:
            "Which keyword is used to declare a constant in JavaScript?",

        options: [
            "var",
            "let",
            "const",
            "static"
        ],

        answer: "const"
    },


    {
        question:
            "Which method adds an item to the end of an array?",

        options: [
            "pop()",
            "push()",
            "shift()",
            "unshift()"
        ],

        answer: "push()"
    },


    {
        question:
            "Which DOM method selects an element by its ID?",

        options: [
            "querySelectorAll()",
            "getElementById()",
            "getElementsByClassName()",
            "createElement()"
        ],

        answer: "getElementById()"
    },


    {
        question:
            "Which method creates a new array by transforming every item?",

        options: [
            "filter()",
            "reduce()",
            "map()",
            "splice()"
        ],

        answer: "map()"
    },


    {
        question:
            "What does addEventListener() do?",

        options: [
            "Creates an HTML element",
            "Listens for an event and runs a handler",
            "Deletes an element",
            "Changes an array"
        ],

        answer:
            "Listens for an event and runs a handler"
    },


    {
        question:
            "Which operator is used to spread the values of an array?",

        options: [
            "??",
            "...",
            "=>",
            "&&"
        ],

        answer: "..."
    },


    {
        question:
            "Which loop is commonly used when you know the number of iterations?",

        options: [
            "for",
            "while",
            "do...while",
            "switch"
        ],

        answer: "for"
    },


    {
        question:
            "Which keyword is used to declare a variable that can be reassigned?",

        options: [
            "const",
            "let",
            "fixed",
            "define"
        ],

        answer: "let"
    }

];


//VARIABLES

// Stores the current question number

let currentQuestionIndex = 0;


// Stores the user's score

let score = 0;


// Prevents the user from selecting
// multiple answers for the same question

let answerSelected = false;


//SELECT HTML ELEMENTS

const questionElement =
    document.getElementById("question");


const optionsElement =
    document.getElementById("options");


const feedbackElement =
    document.getElementById("feedback");


const nextButton =
    document.getElementById("next-btn");


const progressElement =
    document.getElementById("progress");


const quizScreen =
    document.getElementById("quiz-screen");


const resultScreen =
    document.getElementById("result-screen");


const scoreText =
    document.getElementById("score-text");


const resultFeedback =
    document.getElementById("result-feedback");


const restartButton =
    document.getElementById("restart-btn");



//RENDER QUESTION


const renderQuestion = () => {

    // Get the current question object

    const currentQuestion =
        questions[currentQuestionIndex];


    // Display question text

    questionElement.textContent =
        currentQuestion.question;


    // Display question number

    progressElement.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;


    // Remove old options

    optionsElement.innerHTML = "";


    // Clear previous feedback

    feedbackElement.textContent = "";

    feedbackElement.className = "feedback";


    // No answer selected yet

    answerSelected = false;


    // Disable Next button

    nextButton.disabled = true;


    // CREATE OPTION BUTTONS DYNAMICALLY

    currentQuestion.options.forEach((option) => {

        // Create button

        const button =
            document.createElement("button");


        // Button type

        button.type = "button";


        // Add option text

        button.textContent = option;


        // Add CSS class

        button.className = "option-btn";


        // CLICK EVENT

        button.addEventListener("click", () => {

            checkAnswer(
                button,
                option
            );

        });


        // Add button to options container

        optionsElement.appendChild(button);

    });

};


//CHECK ANSWER

const checkAnswer = (
    selectedButton,
    selectedAnswer
) => {

    // Prevent selecting another answer

    if (answerSelected) {

        return;

    }


    // Mark answer as selected

    answerSelected = true;


    // Get current question

    const currentQuestion =
        questions[currentQuestionIndex];


    // Select all option buttons

    const optionButtons =
        document.querySelectorAll(".option-btn");


    // Disable all option buttons

    optionButtons.forEach((button) => {

        button.disabled = true;

    });


    // CORRECT ANSWER

    if (
        selectedAnswer ===
        currentQuestion.answer
    ) {

        // Make selected button green

        selectedButton.classList.add("correct");


        // Display feedback

        feedbackElement.textContent =
            "Correct! 🎉";


        feedbackElement.classList.add(
            "correct-text"
        );


        // Increase score

        score++;

    }


    // WRONG ANSWER

    else {

        // Make selected button red

        selectedButton.classList.add("wrong");


        // Find the correct button

        optionButtons.forEach((button) => {

            if (
                button.textContent ===
                currentQuestion.answer
            ) {

                // Make correct answer green

                button.classList.add("correct");

            }

        });


        // Display correct answer

        feedbackElement.textContent =
            `Wrong! The correct answer is "${currentQuestion.answer}".`;


        feedbackElement.classList.add(
            "wrong-text"
        );

    }


    // Enable Next Question button

    nextButton.disabled = false;

};


//NEXT QUESTION BUTTON

nextButton.addEventListener(
    "click",
    () => {

        // Move to next question

        currentQuestionIndex++;


        // Check whether questions remain

        if (
            currentQuestionIndex <
            questions.length
        ) {

            // Display next question

            renderQuestion();

        }

        else {

            // Quiz finished

            showResult();

        }

    }
);


//SHOW FINAL RESULT

const showResult = () => {

    // Hide quiz screen

    quizScreen.classList.add("hidden");


    // Show result screen

    resultScreen.classList.remove("hidden");


    // Display final score

    scoreText.textContent =
        `You scored ${score} out of ${questions.length}`;



    // FEEDBACK BASED ON SCORE

    if (
        score === questions.length
    ) {

        resultFeedback.textContent =
            "Excellent! You got every question correct.";

    }

    else if (score >= 6) {

        resultFeedback.textContent =
            "Great job! You have a strong understanding of JavaScript.";

    }

    else if (score >= 4) {

        resultFeedback.textContent =
            "Good effort! Review a few concepts and try again.";

    }

    else {

        resultFeedback.textContent =
            "Keep practising! Review the JavaScript basics and try again.";

    }

};


//RESTART QUIZ

restartButton.addEventListener(
    "click",
    () => {

        // Reset question index

        currentQuestionIndex = 0;


        // Reset score

        score = 0;


        // Reset answer status

        answerSelected = false;


        // Hide result screen

        resultScreen.classList.add("hidden");


        // Show quiz screen

        quizScreen.classList.remove("hidden");


        // Render first question

        renderQuestion();

    }
);


//START QUIZ

renderQuestion();