const questions = [
  {
    question: "What is JavaScript?",
    options: [
      "Programming language",
      "Framework",
      "Library",
      "None of the above",
    ],
    answer: "Programming language",
  },

  {
    question: "Which language helps to make a website interactive?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "JavaScript",
  },

  {
    question:
      "Which of the following is used for building JavaScript user interfaces or applications?",
    options: ["React", "Vue", "Angular", "All of the above"],
    answer: "All of the above",
  },

  {
    question:
      "Which keyword can be used to declare a variable that can change?",
    options: ["var", "let", "const", "All of the above"],
    answer: "let",
  },

  {
    question: "Which symbol is used to access an array item by its index?",
    options: ["()", "{}", "[]", "<>"],
    answer: "[]",
  },

  {
    question: "What is a function in JavaScript?",
    options: [
      "A type of CSS",
      "A reusable block of code",
      "An HTML tag",
      "A database",
    ],
    answer: "A reusable block of code",
  },

  {
    question: "Which method is used to select an element by its ID?",
    options: [
      "document.getElementById()",
      "document.createElement()",
      "document.appendChild()",
      "document.querySelectorAll()",
    ],
    answer: "document.getElementById()",
  },

  {
    question: "What does DOM stand for?",
    options: [
      "Data Object Method",
      "Document Object Model",
      "Digital Object Management",
      "Document Oriented Method",
    ],
    answer: "Document Object Model",
  },

  {
    question:
      "Which method is used to create a new HTML element using JavaScript?",
    options: [
      "document.newElement()",
      "document.makeElement()",
      "document.createElement()",
      "document.addElement()",
    ],
    answer: "document.createElement()",
  },

  {
    question: "Which method is used to add an item to the end of an array?",
    options: ["pop()", "push()", "shift()", "slice()"],
    answer: "push()",
  },
];

const quizContainer = document.getElementById("quiz-container");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  quizContainer.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];

  // Create question number
  const questionNumber = document.createElement("p");

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  quizContainer.appendChild(questionNumber);

  // Create question
  const questionElement = document.createElement("h2");

  questionElement.textContent = currentQuestion.question;

  quizContainer.appendChild(questionElement);

  // Create option buttons
  for (let option of currentQuestion.options) {
    const optionButton = document.createElement("button");

    optionButton.classList.add("option-button");

    optionButton.textContent = option;

    // Click event
    optionButton.addEventListener("click", function () {
      const allOptionButtons = document.querySelectorAll(".option-button");

      // Check correct answer
      if (option === currentQuestion.answer) {
        optionButton.style.backgroundColor = "green";

        score++;
      } else {
        optionButton.style.backgroundColor = "red";

        // Reveal correct answer
        allOptionButtons.forEach(function (button) {
          if (button.textContent === currentQuestion.answer) {
            button.style.backgroundColor = "green";
          }
        });
      }

      // Disable all options
      allOptionButtons.forEach(function (button) {
        button.disabled = true;
      });

      // Enable Next button
      nextButton.disabled = false;
    });

    quizContainer.appendChild(optionButton);
  }

  // Creating Next Question button
  const nextButton = document.createElement("button");

  nextButton.classList.add("next-button");

  nextButton.textContent = "Next Question";

  // Disable until an option is selected
  nextButton.disabled = true;

  // Next button click event
  nextButton.addEventListener("click", function () {
    currentQuestionIndex++;

    // Check if quiz is finished
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showFinalScore();
    }
  });

  quizContainer.appendChild(nextButton);
}

function showFinalScore() {
  quizContainer.innerHTML = "";

  const title = document.createElement("h1");

  title.textContent = "Quiz Completed! 🎉";

  quizContainer.appendChild(title);

  const scoreElement = document.createElement("h2");

  scoreElement.textContent = `You scored ${score} out of ${questions.length}`;

  quizContainer.appendChild(scoreElement);

  // Feedback message
  const feedback = document.createElement("p");

  if (score === questions.length) {
    feedback.textContent = "Perfect! Excellent work! ";
  } else if (score >= 8) {
    feedback.textContent = "Great job! You know JavaScript well!  :D ";
  } else if (score >= 5) {
    feedback.textContent = "Good effort! Keep practicing!  ";
  } else {
    feedback.textContent = "Keep learning and try again! :) ";
  }

  quizContainer.appendChild(feedback);

  // Restart button
  const restartButton = document.createElement("button");

  restartButton.classList.add("restart-button");

  restartButton.textContent = "Restart Quiz";

  restartButton.addEventListener("click", function () {
    currentQuestionIndex = 0;

    score = 0;

    showQuestion();
  });

  quizContainer.appendChild(restartButton);
}

// Start quiz
showQuestion();
