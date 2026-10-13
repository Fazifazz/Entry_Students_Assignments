// ---------------------------------------------------------------
// DATA: the question bank. Each entry has a question, 4 options,
// and the exact string of the correct answer.
// ---------------------------------------------------------------
const questions = [
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au"
  },
  {
    question: "Which ocean is the largest by surface area?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "In what year did the Titanic sink?",
    options: ["1905", "1912", "1918", "1923"],
    answer: "1912"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    question: "Which language has the most native speakers worldwide?",
    options: ["English", "Hindi", "Mandarin Chinese", "Spanish"],
    answer: "Mandarin Chinese"
  }
];

// ---------------------------------------------------------------
// STATE
// ---------------------------------------------------------------
let currentIndex = 0;   // which question we're on
let score = 0;          // number of correct answers so far

// Cache DOM references we use repeatedly
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultsEl = document.getElementById("results");
const progressEl = document.getElementById("progress");

/**
 * renderQuestion()
 * Builds the current question and its 4 option buttons purely
 * with DOM methods (no innerHTML), then appends them to the page.
 */
function renderQuestion() {
  // Reset any leftover state from the previous question
  questionEl.textContent = "";
  optionsEl.textContent = "";
  nextBtn.style.display = "none";
  resultsEl.style.display = "none";
  questionEl.style.display = "block";
  optionsEl.style.display = "flex";

  const current = questions[currentIndex];

  // Progress indicator, e.g. "Question 3 / 8"
  progressEl.textContent = `Question ${currentIndex + 1} / ${questions.length}`;

  // Set the question text
  questionEl.textContent = current.question;

  // Build one button per option
  current.options.forEach((optionText) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = optionText;
    btn.addEventListener("click", () => selectAnswer(btn, optionText, current.answer));
    optionsEl.appendChild(btn);
  });
}

/**
 * selectAnswer(clickedBtn, chosenText, correctText)
 * Runs when the user clicks an option. Colors the buttons,
 * updates the score, disables further clicks, and reveals
 * the Next Question button.
 */
function selectAnswer(clickedBtn, chosenText, correctText) {
  const allButtons = optionsEl.querySelectorAll(".option-btn");

  // Lock in the choice: disable every option button
  allButtons.forEach((btn) => (btn.disabled = true));

  if (chosenText === correctText) {
    // Correct pick: highlight green and add a point
    clickedBtn.classList.add("correct");
    score++;
  } else {
    // Wrong pick: highlight the clicked one red...
    clickedBtn.classList.add("wrong");
    // ...and also reveal which one was actually correct
    allButtons.forEach((btn) => {
      if (btn.textContent === correctText) {
        btn.classList.add("correct");
      }
    });
  }

  // Reveal the button to move forward
  nextBtn.style.display = "inline-block";
}

/**
 * showResults()
 * Replaces the question/options area with a final score screen
 * and a message that depends on how well the user scored.
 */
function showResults() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  progressEl.textContent = "";

  let message;
  if (score <= 3) {
    message = "Worth another go — the answers will stick next time.";
  } else if (score <= 6) {
    message = "Solid effort! You know your stuff.";
  } else {
    message = "Outstanding! Nearly a perfect round.";
  }

  resultsEl.textContent = "";

  const heading = document.createElement("h2");
  heading.textContent = `You scored ${score} out of ${questions.length}`;

  const feedback = document.createElement("p");
  feedback.textContent = message;

  const restartBtn = document.createElement("button");
  restartBtn.id = "restart-btn";
  restartBtn.textContent = "Restart Quiz";
  restartBtn.style.display = "inline-block";
  restartBtn.addEventListener("click", restartQuiz);

  resultsEl.appendChild(heading);
  resultsEl.appendChild(feedback);
  resultsEl.appendChild(restartBtn);
  resultsEl.style.display = "block";
}

/**
 * restartQuiz()
 * Resets all state back to the beginning and re-renders question 1.
 */
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultsEl.textContent = "";
  resultsEl.style.display = "none";
  renderQuestion();
}

// "Next Question" advances the index, or shows results after the last question
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

// Kick off the quiz on page load
renderQuestion();