const questions = [
  {
    question: "Which language is used to make web pages interactive?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    correctAnswer: "JavaScript",
  },

  {
    question: "Which keyword is used to declare a constant?",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const",
  },

  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "push()", "shift()", "slice()"],
    correctAnswer: "push()",
  },

  {
    question: "Which method removes the last element from an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "pop()",
  },

  {
    question: "What does === check in JavaScript?",
    options: ["Only value", "Only type", "Value and type", "Variable name"],
    correctAnswer: "Value and type",
  },

  {
    question: "Which keyword is used to create a function?",
    options: ["function", "func", "define", "create"],
    correctAnswer: "function",
  },

  {
    question:
      "Which method creates a new array by applying a function to each element?",
    options: ["map()", "push()", "pop()", "shift()"],
    correctAnswer: "map()",
  },

  {
    question: "Which method converts JSON into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correctAnswer: "JSON.parse()",
  },
];

// DOM elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");

const quizBox = document.getElementById("quiz-box");
const scoreScreen = document.getElementById("score-screen");
const finalScore = document.getElementById("final-score");
const feedback = document.getElementById("feedback");
const restartButton = document.getElementById("restart-btn");

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;

// Function to display question
function renderQuestion() {
  optionsElement.innerHTML = "";

  resultElement.textContent = "";

  nextButton.disabled = true;

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;

  // Create option buttons
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.classList.add("option-btn");

    // Add click event
    button.addEventListener("click", handleOptionClick);

    // Add button to DOM
    optionsElement.appendChild(button);
  });
}

// Handle option click
function handleOptionClick(event) {
  // Get the clicked button
  const selectedButton = event.target;

  // Get the answer selected by user
  const selectedAnswer = selectedButton.textContent;

  // Get correct answer
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Send values to selectAnswer()
  selectAnswer(selectedButton, selectedAnswer, correctAnswer);
}

// Check selected answer
function selectAnswer(selectedButton, selectedAnswer, correctAnswer) {
  const optionButtons = document.querySelectorAll(".option-btn");

  // Disable all buttons
  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  // Check answer
  if (selectedAnswer === correctAnswer) {
    // Make selected button green
    selectedButton.classList.add("correct");

    // Show message
    resultElement.textContent = "Correct!";

    // Increase score
    score++;
  } else {
    // Make selected button red
    selectedButton.classList.add("wrong");

    // Show correct answer
    resultElement.textContent = `Wrong! Correct answer: ${correctAnswer}`;

    // Find the correct button
    optionButtons.forEach((button) => {
      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
      }
    });
  }

  // Enable Next Question button
  nextButton.disabled = false;
}

// Next Question button
nextButton.addEventListener("click", () => {
  // Move to next question
  currentQuestionIndex++;

  // Check whether questions are remaining
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showFinalScore();
  }
});

// Show final score
function showFinalScore() {
  // Hide quiz
  quizBox.style.display = "none";

  // Show score screen
  scoreScreen.style.display = "block";

  // Display score
  finalScore.textContent = `You scored ${score} out of ${questions.length}`;

  // Feedback based on score
  if (score === questions.length) {
    feedback.textContent = "Excellent! Perfect score! 🎉";
  } else if (score >= 6) {
    feedback.textContent = "Great job! 👏";
  } else if (score >= 4) {
    feedback.textContent = "Good effort! Keep practicing. 👍";
  } else {
    feedback.textContent = "Keep learning and try again! 💪";
  }
}

// Restart quiz
restartButton.addEventListener("click", () => {
  // Reset question index
  currentQuestionIndex = 0;

  // Reset score
  score = 0;

  // Hide score screen
  scoreScreen.style.display = "none";

  // Show quiz
  quizBox.style.display = "block";

  // Render first question
  renderQuestion();
});

// Start quiz
renderQuestion();
