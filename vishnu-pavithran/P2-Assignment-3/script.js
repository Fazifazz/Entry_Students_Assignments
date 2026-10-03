const questions = [
  {
    question: "Which language is used to create web page structure?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: "HTML",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Java"],
    correctAnswer: "CSS",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["variable", "let", "define", "varName"],
    correctAnswer: "let",
  },
  {
    question: "Which method is used to select an element by its ID?",
    options: [
      "querySelector()",
      "getElementById()",
      "getElement()",
      "selectById()",
    ],
    correctAnswer: "getElementById()",
  },
  {
    question: "Which symbol is used for strict equality?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "===",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
  },
  {
    question: "Which function converts JSON text into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correctAnswer: "JSON.parse()",
  },
  {
    question: "Which keyword is used to create a function?",
    options: ["function", "func", "define", "method"],
    correctAnswer: "function",
  },
  {
    question: "Which method removes the last element from an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    correctAnswer: "pop()",
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["let", "var", "const", "constant"],
    correctAnswer: "const",
  },
];

let score = 0;
let answered = false;
let currentQuestionIndex = 0;

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");

function renderCurrentQuestion() {
  quizContainer.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];

  //Question wrapper
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-wrap");
  quizContainer.appendChild(questionDiv);

  //Question header
  const questionHeaderDiv = document.createElement("div");
  questionHeaderDiv.classList.add("question-header");
  questionDiv.appendChild(questionHeaderDiv);

  //Question number
  const questionNumberDiv = document.createElement("div");
  questionNumberDiv.classList.add("question-number");
  questionHeaderDiv.appendChild(questionNumberDiv);
  questionNumberDiv.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  //Score
  const scoreDiv = document.createElement("div");
  scoreDiv.classList.add("cls-score");
  questionHeaderDiv.appendChild(scoreDiv);
  scoreDiv.textContent = `Score: ${score} / ${questions.length}`;

  //Question heading
  const questionTextEl = document.createElement("h2");
  questionTextEl.classList.add("heading");
  questionDiv.appendChild(questionTextEl);
  questionTextEl.innerHTML = currentQuestion.question;

  //Options container
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  //Option buttons
  currentQuestion.options.forEach(function (option) {
    const optionButton = document.createElement("button");

    optionButton.classList.add("option-btn");

    optionButton.textContent = option;

    // Option click event
    optionButton.addEventListener("click", function () {
      checkAnswer(optionButton, option, currentQuestion.correctAnswer);
    });

    optionsDiv.appendChild(optionButton);
  });
  questionDiv.appendChild(optionsDiv);
  restartButton.style.display = "none";
}

function checkAnswer(selectedButton, selectedAnswer, correctAnswer) {
  answered = true;

  // Get all option buttons
  const optionButtons = document.querySelectorAll(".option-btn");

  //Disable all buttons
  optionButtons.forEach(function (button) {
    button.disabled = true;
  });

  // Correct answer
  if (selectedAnswer === correctAnswer) {
    selectedButton.classList.add("correct");
    score = score + 1;
  }

  // Wrong answer
  else {
    selectedButton.classList.add("wrong");

    // Find the correct button
    optionButtons.forEach(function (button) {
      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
      }
    });

    // Show correct answer
    const answerText = document.createElement("p");
    answerText.classList.add("correct-answer");
    answerText.textContent = `Correct Answer: ${correctAnswer}`;
    quizContainer.appendChild(answerText);
  }

  nextButton.disabled = false;
}
// Next Question button
nextButton.addEventListener("click", function () {
  currentQuestionIndex++;
  // Check if quiz is finished
  if (currentQuestionIndex < questions.length) {
    renderCurrentQuestion();
    nextButton.disabled = true;
  } else {
    showFinalScore();
    restartButton.style.display = "block";
  }
});

// Show final score
function showFinalScore() {
  quizContainer.innerHTML = "";

  const finalScoreEl = document.createElement("h2");
  finalScoreEl.classList.add("final-score");
  quizContainer.appendChild(finalScoreEl);
  finalScoreEl.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.style.display = "none";
}

const restartButton = document.getElementById("restart-btn");
restartButton.addEventListener("click", function () {
  quizContainer.innerHTML = "";
  score = 0;
  answered = false;
  currentQuestionIndex = 0;
  renderCurrentQuestion();
  nextButton.style.display = "block";
  restartButton.style.display = "none";
});

renderCurrentQuestion();
