
        // Questions Array
        const questions = [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyperlink Text Markup Language",
                    "Home Tool Markup Language"
                ],
                answer: "Hyper Text Markup Language"
            },

            {
                question: "Which HTML tag is used to create a paragraph?",
                options: [
                    "<p>",
                    "<para>",
                    "<paragraph>",
                    "<text>"
                ],
                answer: "<p>"
            },

            {
                question: "Which HTML tag is used to create the largest heading?",
                options: [
                    "<h6>",
                    "<heading>",
                    "<h1>",
                    "<head>"
                ],
                answer: "<h1>"
            },

            {
                question: "Which HTML tag is used to create a hyperlink?",
                options: [
                    "<link>",
                    "<a>",
                    "<href>",
                    "<url>"
                ],
                answer: "<a>"
            },

            {
                question: "Which HTML attribute is used to specify the URL of a link?",
                options: [
                    "src",
                    "link",
                    "href",
                    "url"
                ],
                answer: "href"
            },

            {
                question: "Which HTML tag is used to display an image?",
                options: [
                    "<image>",
                    "<img>",
                    "<pic>",
                    "<src>"
                ],
                answer: "<img>"
            },

            {
                question: "Which HTML tag is used to create an unordered list?",
                options: [
                    "<ol>",
                    "<list>",
                    "<ul>",
                    "<li>"
                ],
                answer: "<ul>"
            },

            {
                question: "Which HTML tag is used to create a line break?",
                options: [
                    "<break>",
                    "<lb>",
                    "<br>",
                    "<line>"
                ],
                answer: "<br>"
            }
        ];


        // Variables
        let currentQuestionIndex = 0;
        let score = 0;
        let answered = false;


        // DOM Elements
        const questionNumber = document.getElementById("question-number");
        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");
        const correctAnswerElement = document.getElementById("correct-answer");

        const nextButton = document.getElementById("next-btn");
        const restartButton = document.getElementById("restart-btn");

        const quizScreen = document.getElementById("quiz-screen");
        const resultScreen = document.getElementById("result-screen");

        const finalScore = document.getElementById("final-score");
        const feedback = document.getElementById("feedback");


        // Render Question
        function renderQuestion() {

            answered = false;

            // Clear old content
            optionsElement.innerHTML = "";
            correctAnswerElement.innerHTML = "";
            correctAnswerElement.style.display = "none";

            // Disable Next button
            nextButton.disabled = true;

            // Get current question
            const currentQuestion = questions[currentQuestionIndex];

            // Display question number
            questionNumber.textContent =
                `Question ${currentQuestionIndex + 1} of ${questions.length}`;

            // Display question
            questionElement.textContent = currentQuestion.question;


            // Create option buttons dynamically
            currentQuestion.options.forEach(function (option) {

                const button = document.createElement("button");

                button.textContent = option;

                button.classList.add("option-btn");

                // Add click event
                button.addEventListener("click", function () {
                    checkAnswer(button, option);
                });

                // Add button to DOM
                optionsElement.appendChild(button);
            });
        }


        // Check Answer
        function checkAnswer(selectedButton, selectedAnswer) {

            // Prevent selecting another answer
            if (answered) {
                return;
            }

            answered = true;

            const currentQuestion = questions[currentQuestionIndex];

            const allButtons =
                document.querySelectorAll(".option-btn");


            // Check if answer is correct
            if (selectedAnswer === currentQuestion.answer) {

                selectedButton.classList.add("correct");

                score++;

            } else {

                // Selected answer is wrong
                selectedButton.classList.add("wrong");

                // Find and highlight correct answer
                allButtons.forEach(function (button) {

                    if (button.textContent === currentQuestion.answer) {
                        button.classList.add("correct");
                    }

                });

                // Reveal correct answer
                correctAnswerElement.textContent =
                    `Correct Answer: ${currentQuestion.answer}`;

                correctAnswerElement.style.display = "block";
            }


            // Enable Next button
            nextButton.disabled = false;
        }


        // Next Question
        nextButton.addEventListener("click", function () {

            currentQuestionIndex++;

            // Check if quiz is finished
            if (currentQuestionIndex < questions.length) {

                renderQuestion();

            } else {

                showResult();
            }
        });


        // Show Final Result
        function showResult() {

            quizScreen.style.display = "none";
            resultScreen.style.display = "block";

            finalScore.textContent =
                `You scored ${score} out of ${questions.length}`;

            // Feedback based on score
            if (score === 8) {

                feedback.textContent =
                    "Excellent! 🎉 You got all the answers correct!";

            } else if (score >= 6) {

                feedback.textContent =
                    "Great job! 👍 You have a good knowledge of HTML.";

            } else if (score >= 4) {

                feedback.textContent =
                    "Good effort! 😊 Keep practicing HTML.";

            } else {

                feedback.textContent =
                    "Keep learning! 💪 Practice more HTML concepts.";
            }
        }


        // Restart Quiz
        restartButton.addEventListener("click", function () {

            // Reset variables
            currentQuestionIndex = 0;
            score = 0;
            answered = false;

            // Show quiz screen
            quizScreen.style.display = "block";
            resultScreen.style.display = "none";

            // Render first question
            renderQuestion();
        });


        // Start Quiz
        renderQuestion();
