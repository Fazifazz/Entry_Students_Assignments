const TOPIC_CONFIG = [
  {
    id: "html",
    name: "HTML",
    icon: "🌐",
    description: "Learn HTML structure, elements and semantic markup.",
    questionCount: 10,
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    description: "Master styling, layout, colors and responsive design.",
    questionCount: 10,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚙️",
    description: "Strengthen core scripting, logic and browser behavior.",
    questionCount: 10,
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: "🧩",
    description: "Build polished interfaces with utility classes and layout systems.",
    questionCount: 10,
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "Practice Python fundamentals and problem solving.",
    questionCount: 10,
  },
];

const HTML_QUESTIONS = [
  {
    id: 1,
    topic: "HTML",
    question: "Which tag is used to define the largest heading on a page?",
    answer: "h1",
    acceptableAnswers: ["h1", "the h1 tag", "heading 1"],
    explanation: "The h1 tag is the main top-level heading in HTML and usually carries the most importance for document structure.",
    difficulty: "Easy",
  },
  {
    id: 2,
    topic: "HTML",
    question: "Which HTML element is used to create a hyperlink?",
    answer: "a",
    acceptableAnswers: ["a tag", "the a element", "anchor"],
    explanation: "The a element, or anchor tag, creates a link to another page or resource using the href attribute.",
    difficulty: "Easy",
  },
  {
    id: 3,
    topic: "HTML",
    question: "Which tag defines an unordered list?",
    answer: "ul",
    acceptableAnswers: ["ul", "unordered list", "the ul tag"],
    explanation: "The ul element creates an unordered list, while li elements represent individual list items.",
    difficulty: "Easy",
  },
  {
    id: 4,
    topic: "HTML",
    question: "Which attribute is used to provide alternative text for an image?",
    answer: "alt",
    acceptableAnswers: ["alt", "alt attribute", "the alt text"],
    explanation: "The alt attribute helps describe images for accessibility and is shown when the image cannot load.",
    difficulty: "Easy",
  },
  {
    id: 5,
    topic: "HTML",
    question: "What does the semantic tag article represent?",
    answer: "a self contained composition",
    acceptableAnswers: ["a self contained composition", "self contained content", "an independent article section"],
    explanation: "article is a semantic element for standalone content such as a blog post, news item, or article section.",
    difficulty: "Medium",
  },
  {
    id: 6,
    topic: "HTML",
    question: "Which HTML element is used to include external JavaScript?",
    answer: "script",
    acceptableAnswers: ["script tag", "the script element"],
    explanation: "The script element loads JavaScript into the page either inline or from an external file.",
    difficulty: "Easy",
  },
  {
    id: 7,
    topic: "HTML",
    question: "Which attribute specifies the URL of a page a link goes to?",
    answer: "href",
    acceptableAnswers: ["href", "href attribute"],
    explanation: "The href attribute stores the destination path or URL for an anchor element.",
    difficulty: "Easy",
  },
  {
    id: 8,
    topic: "HTML",
    question: "Which tag is used for the main content of a document?",
    answer: "main",
    acceptableAnswers: ["main", "main tag"],
    explanation: "The main element identifies the primary content of the document, helping assistive technologies and structure.",
    difficulty: "Medium",
  },
  {
    id: 9,
    topic: "HTML",
    question: "What does the HTML form element allow users to do?",
    answer: "submit information",
    acceptableAnswers: ["submit information", "collect input", "send data"],
    explanation: "Forms allow users to enter and submit data to a server or application for processing.",
    difficulty: "Medium",
  },
  {
    id: 10,
    topic: "HTML",
    question: "Which tag defines a table row?",
    answer: "tr",
    acceptableAnswers: ["tr", "table row tag"],
    explanation: "The tr element defines a row inside a table, with td or th cells inside it.",
    difficulty: "Easy",
  },
];

const CSS_QUESTIONS = [
  {
    id: 11,
    topic: "CSS",
    question: "Which CSS property changes the text color?",
    answer: "color",
    acceptableAnswers: ["color", "the color property"],
    explanation: "The color property sets the foreground text color for an element.",
    difficulty: "Easy",
  },
  {
    id: 12,
    topic: "CSS",
    question: "What does the property display: flex do?",
    answer: "turns the element into a flex container",
    acceptableAnswers: ["turns the element into a flex container", "creates a flex layout", "makes it flex"],
    explanation: "display: flex makes an element a flex container so its children can be aligned and distributed with flexbox.",
    difficulty: "Easy",
  },
  {
    id: 13,
    topic: "CSS",
    question: "Which CSS property adds space between the border and content?",
    answer: "padding",
    acceptableAnswers: ["padding", "the padding property"],
    explanation: "Padding adds inner spacing between the content and the element border.",
    difficulty: "Easy",
  },
  {
    id: 14,
    topic: "CSS",
    question: "What does margin control?",
    answer: "space outside the element",
    acceptableAnswers: ["space outside the element", "outer spacing", "space around an element"],
    explanation: "Margin creates space outside the border of an element, separating it from nearby elements.",
    difficulty: "Easy",
  },
  {
    id: 15,
    topic: "CSS",
    question: "Which CSS property is used to make text bold?",
    answer: "font weight",
    acceptableAnswers: ["font weight", "font-weight", "font-weight property"],
    explanation: "The font-weight property controls the thickness of text, with 700 often representing bold.",
    difficulty: "Easy",
  },
  {
    id: 16,
    topic: "CSS",
    question: "Which selector targets an element with a specific id?",
    answer: "#idname",
    acceptableAnswers: ["hash selector", "#example", "id selector"],
    explanation: "An ID selector begins with # and targets a single unique element in the document.",
    difficulty: "Medium",
  },
  {
    id: 17,
    topic: "CSS",
    question: "Which CSS property controls the stacking order of elements?",
    answer: "z index",
    acceptableAnswers: ["z-index", "z index property", "the z index"],
    explanation: "The z-index property determines the order in which overlapping elements appear on the screen.",
    difficulty: "Medium",
  },
  {
    id: 18,
    topic: "CSS",
    question: "What does media query allow you to do?",
    answer: "apply styles based on screen size",
    acceptableAnswers: ["apply styles based on screen size", "change styles for different devices", "responsive styling"],
    explanation: "Media queries let developers change layout and styles depending on viewport width or device conditions.",
    difficulty: "Medium",
  },
  {
    id: 19,
    topic: "CSS",
    question: "Which property controls the size of the border around an element?",
    answer: "border width",
    acceptableAnswers: ["border width", "border-width", "border property"],
    explanation: "border-width sets the thickness of the border and is often combined with border-style and border-color.",
    difficulty: "Medium",
  },
  {
    id: 20,
    topic: "CSS",
    question: "Which property makes an element fully transparent?",
    answer: "opacity",
    acceptableAnswers: ["opacity", "opacity property"],
    explanation: "The opacity property changes how transparent an element appears, with 0 being fully invisible and 1 fully visible.",
    difficulty: "Medium",
  },
];

const JAVASCRIPT_QUESTIONS = [
  {
    id: 21,
    topic: "JavaScript",
    question: "Which keyword is used to declare a constant?",
    answer: "const",
    acceptableAnswers: ["const", "const keyword", "the const keyword"],
    explanation: "The const keyword creates a variable binding that cannot be reassigned.",
    difficulty: "Easy",
  },
  {
    id: 22,
    topic: "JavaScript",
    question: "What does the push() method do to an array?",
    answer: "adds an item to the end",
    acceptableAnswers: ["adds an item to the end", "appends an element", "adds to the end of the array"],
    explanation: "The push() method appends a new value at the end of an array and returns the new length.",
    difficulty: "Easy",
  },
  {
    id: 23,
    topic: "JavaScript",
    question: "Which function is used to print output to the console?",
    answer: "console log",
    acceptableAnswers: ["console.log", "console log", "log to the console"],
    explanation: "console.log() sends a value to the browser or Node.js console for debugging or display.",
    difficulty: "Easy",
  },
  {
    id: 24,
    topic: "JavaScript",
    question: "Which operator compares both value and type?",
    answer: "strict equality operator",
    acceptableAnswers: ["strict equality", "===", "triple equals"],
    explanation: "The === operator compares both the value and type, unlike == which performs type coercion.",
    difficulty: "Easy",
  },
  {
    id: 25,
    topic: "JavaScript",
    question: "What is a function declaration?",
    answer: "a reusable block of code",
    acceptableAnswers: ["a reusable block of code", "code that can be called later", "a named function"],
    explanation: "A function declaration defines a callable block of code that can be reused multiple times.",
    difficulty: "Easy",
  },
  {
    id: 26,
    topic: "JavaScript",
    question: "Which method converts a string to lowercase?",
    answer: "to lowercase",
    acceptableAnswers: ["toLowerCase", "to lowercase", "lowercase method"],
    explanation: "The toLowerCase() method returns a new string with all letters converted to lowercase.",
    difficulty: "Medium",
  },
  {
    id: 27,
    topic: "JavaScript",
    question: "What does the keyword return do inside a function?",
    answer: "returns a value from the function",
    acceptableAnswers: ["returns a value from the function", "sends back a value", "exits and gives the value"],
    explanation: "return causes a function to stop executing and send a value back to the caller.",
    difficulty: "Easy",
  },
  {
    id: 28,
    topic: "JavaScript",
    question: "Which built in object is used to work with dates?",
    answer: "date",
    acceptableAnswers: ["date", "date object"],
    explanation: "The Date object provides tools for creating, reading, and manipulating dates and times.",
    difficulty: "Medium",
  },
  {
    id: 29,
    topic: "JavaScript",
    question: "Which array method creates a new array with all elements that pass a test?",
    answer: "filter",
    acceptableAnswers: ["filter", "array filter"],
    explanation: "The filter() method creates a new array containing only the items that satisfy the provided condition.",
    difficulty: "Medium",
  },
  {
    id: 30,
    topic: "JavaScript",
    question: "Which event is triggered when a user clicks a button?",
    answer: "click",
    acceptableAnswers: ["click", "click event"],
    explanation: "The click event fires when an element is activated by a mouse click or keyboard interaction.",
    difficulty: "Medium",
  },
];

const BOOTSTRAP_QUESTIONS = [
  {
    id: 31,
    topic: "Bootstrap",
    question: "Which class creates a full width container in Bootstrap?",
    answer: "container fluid",
    acceptableAnswers: ["container fluid", ".container-fluid", "fluid container"],
    explanation: "The .container-fluid class makes the container span the full width of the viewport.",
    difficulty: "Easy",
  },
  {
    id: 32,
    topic: "Bootstrap",
    question: "Which Bootstrap class creates a primary styled button?",
    answer: "btn btn primary",
    acceptableAnswers: ["btn btn-primary", "btn-primary", "primary button class"],
    explanation: "Bootstrap uses the btn and btn-primary classes together to create the primary button style.",
    difficulty: "Easy",
  },
  {
    id: 33,
    topic: "Bootstrap",
    question: "What layout system does Bootstrap use?",
    answer: "grid system",
    acceptableAnswers: ["grid system", "bootstrap grid", "rows and columns"],
    explanation: "Bootstrap uses a grid system with rows and columns to build responsive layouts.",
    difficulty: "Easy",
  },
  {
    id: 34,
    topic: "Bootstrap",
    question: "Which class adds a rounded border to an element?",
    answer: "rounded",
    acceptableAnswers: ["rounded", "rounded class"],
    explanation: "The rounded class adds border radius to an element for a softer, more rounded look.",
    difficulty: "Easy",
  },
  {
    id: 35,
    topic: "Bootstrap",
    question: "Which class creates a Bootstrap alert?",
    answer: "alert",
    acceptableAnswers: ["alert", "alert class"],
    explanation: "The alert class styles an element as a Bootstrap alert, often paired with alert-success or alert-danger.",
    difficulty: "Medium",
  },
  {
    id: 36,
    topic: "Bootstrap",
    question: "Which component is commonly used for navigation across a website?",
    answer: "navbar",
    acceptableAnswers: ["navbar", "bootstrap navbar"],
    explanation: "The navbar component provides a responsive top navigation bar for app and site navigation.",
    difficulty: "Easy",
  },
  {
    id: 37,
    topic: "Bootstrap",
    question: "Which utility class adds margin to the bottom?",
    answer: "mb 3",
    acceptableAnswers: ["mb-3", "margin bottom 3", "mb 3 class"],
    explanation: "The mb-3 class applies a bottom margin based on the Bootstrap spacing scale.",
    difficulty: "Medium",
  },
  {
    id: 38,
    topic: "Bootstrap",
    question: "Which class makes text center aligned?",
    answer: "text center",
    acceptableAnswers: ["text-center", "text center"],
    explanation: "The text-center utility class centers text horizontally within its container.",
    difficulty: "Easy",
  },
  {
    id: 39,
    topic: "Bootstrap",
    question: "Which class creates a large button?",
    answer: "btn lg",
    acceptableAnswers: ["btn-lg", "large button", "large btn"],
    explanation: "The btn-lg class increases the size of a Bootstrap button.",
    difficulty: "Easy",
  },
  {
    id: 40,
    topic: "Bootstrap",
    question: "Which utility class makes an element take up the full width of its container?",
    answer: "w 100",
    acceptableAnswers: ["w-100", "width 100", "full width"],
    explanation: "The w-100 utility sets width to 100%, filling the parent element width.",
    difficulty: "Medium",
  },
];

const PYTHON_QUESTIONS = [
  {
    id: 41,
    topic: "Python",
    question: "Which keyword defines a function in Python?",
    answer: "def",
    acceptableAnswers: ["def", "the def keyword"],
    explanation: "The def keyword starts a function definition in Python.",
    difficulty: "Easy",
  },
  {
    id: 42,
    topic: "Python",
    question: "What is the output of print(2 + 2)?",
    answer: "4",
    acceptableAnswers: ["4", "four"],
    explanation: "Python evaluates 2 + 2 as 4 and prints it to the console.",
    difficulty: "Easy",
  },
  {
    id: 43,
    topic: "Python",
    question: "Which data type is used to store text in Python?",
    answer: "string",
    acceptableAnswers: ["string", "str"],
    explanation: "A string is a sequence of characters, usually written in quotes in Python.",
    difficulty: "Easy",
  },
  {
    id: 44,
    topic: "Python",
    question: "Which symbol is used for comments in Python?",
    answer: "#",
    acceptableAnswers: ["#", "hash symbol"],
    explanation: "The # character begins a comment in Python, which is ignored by the interpreter.",
    difficulty: "Easy",
  },
  {
    id: 45,
    topic: "Python",
    question: "Which built in function converts input to an integer?",
    answer: "int",
    acceptableAnswers: ["int", "int function"],
    explanation: "The int() function converts a value to an integer, such as converting a string like '10' to 10.",
    difficulty: "Medium",
  },
  {
    id: 46,
    topic: "Python",
    question: "Which Python container stores items in key value pairs?",
    answer: "dictionary",
    acceptableAnswers: ["dictionary", "dict"],
    explanation: "A dictionary stores data as key-value pairs where each key uniquely maps to a value.",
    difficulty: "Medium",
  },
  {
    id: 47,
    topic: "Python",
    question: "What does the len() function return?",
    answer: "length of an object",
    acceptableAnswers: ["length of an object", "number of items", "the length"],
    explanation: "len() returns the length of a sequence or collection, such as a string, list, or dictionary.",
    difficulty: "Easy",
  },
  {
    id: 48,
    topic: "Python",
    question: "Which loop is used when you want to repeat code a fixed number of times?",
    answer: "for loop",
    acceptableAnswers: ["for loop", "for"],
    explanation: "A for loop is commonly used to iterate over a sequence or run a set number of repetitions.",
    difficulty: "Medium",
  },
  {
    id: 49,
    topic: "Python",
    question: "What is the result of [1, 2, 3] + [4, 5]?",
    answer: "1 2 3 4 5",
    acceptableAnswers: ["1,2,3,4,5", "1 2 3 4 5", "[1, 2, 3, 4, 5]"],
    explanation: "In Python, list concatenation with + combines the two lists into one larger list: [1, 2, 3, 4, 5].",
    difficulty: "Medium",
  },
  {
    id: 50,
    topic: "Python",
    question: "What is a list in Python?",
    answer: "an ordered collection of items",
    acceptableAnswers: ["an ordered collection of items", "a list of values", "ordered sequence"],
    explanation: "A list is an ordered, mutable collection that can hold multiple values in a single variable.",
    difficulty: "Easy",
  },
];

const QUESTION_DATABASE = [
  ...HTML_QUESTIONS,
  ...CSS_QUESTIONS,
  ...JAVASCRIPT_QUESTIONS,
  ...BOOTSTRAP_QUESTIONS,
  ...PYTHON_QUESTIONS,
];

const STORAGE_KEYS = {
  progress: "voiceStudyAssistantProgress",
  history: "voiceStudyAssistantHistory",
  theme: "voiceStudyAssistantTheme",
};

const appState = {
  activeSection: "home",
  currentTopic: null,
  studySession: [],
  studyIndex: 0,
  quizSession: [],
  quizTopic: "all",
  quizCount: 5,
  quizDifficulty: "mixed",
  quizIndex: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  quizCorrect: 0,
  quizIncorrect: 0,
  recognitionMode: null,
  recognition: null,
  isListening: false,
  currentStudyResult: null,
  lastRecognizedText: "",
  progress: loadProgress(),
  history: loadHistory(),
  theme: loadTheme(),
};

const DOM = {
  navLinks: document.querySelectorAll(".nav-link"),
  sections: document.querySelectorAll(".app-section"),
  homeMicButton: document.getElementById("homeMicButton"),
  startStudyHomeButton: document.getElementById("startStudyHomeButton"),
  homeStatus: document.getElementById("homeStatus"),
  themeToggle: document.getElementById("themeToggle"),
  themeIcon: document.getElementById("themeIcon"),
  studyTopicSelector: document.getElementById("studyTopicSelector"),
  studySessionPanel: document.getElementById("studySessionPanel"),
  studyTopicHeading: document.getElementById("studyTopicHeading"),
  studyQuestionCounter: document.getElementById("studyQuestionCounter"),
  studyQuestionText: document.getElementById("studyQuestionText"),
  studyDifficultyBadge: document.getElementById("studyDifficultyBadge"),
  studyDifficultyPill: document.getElementById("studyDifficultyPill"),
  listenQuestionButton: document.getElementById("listenQuestionButton"),
  answerQuestionButton: document.getElementById("answerQuestionButton"),
  showAnswerButton: document.getElementById("showAnswerButton"),
  studyAnswerInput: document.getElementById("studyAnswerInput"),
  submitStudyAnswerButton: document.getElementById("submitStudyAnswerButton"),
  previousQuestionButton: document.getElementById("previousQuestionButton"),
  nextQuestionButton: document.getElementById("nextQuestionButton"),
  studyFeedback: document.getElementById("studyFeedback"),
  studyExplanation: document.getElementById("studyExplanation"),
  summaryTopic: document.getElementById("summaryTopic"),
  summaryProgress: document.getElementById("summaryProgress"),
  summaryCorrect: document.getElementById("summaryCorrect"),
  summaryIncorrect: document.getElementById("summaryIncorrect"),
  listenExplanationButton: document.getElementById("listenExplanationButton"),
  studyHomeButton: document.getElementById("studyHomeButton"),
  quizTopicSelect: document.getElementById("quizTopicSelect"),
  quizCountSelect: document.getElementById("quizCountSelect"),
  quizDifficultySelect: document.getElementById("quizDifficultySelect"),
  startQuizButton: document.getElementById("startQuizButton"),
  quizSetupCard: document.getElementById("quizSetupCard"),
  quizSessionPanel: document.getElementById("quizSessionPanel"),
  quizTitle: document.getElementById("quizTitle"),
  quizCountBadge: document.getElementById("quizCountBadge"),
  quizProgressBar: document.getElementById("quizProgressBar"),
  quizQuestionText: document.getElementById("quizQuestionText"),
  quizListenButton: document.getElementById("quizListenButton"),
  quizSpeakButton: document.getElementById("quizSpeakButton"),
  quizAnswerInput: document.getElementById("quizAnswerInput"),
  submitQuizAnswerButton: document.getElementById("submitQuizAnswerButton"),
  quizNextButton: document.getElementById("quizNextButton"),
  quizFeedback: document.getElementById("quizFeedback"),
  quizExplanation: document.getElementById("quizExplanation"),
  quizResultPanel: document.getElementById("quizResultPanel"),
  quizFinalScore: document.getElementById("quizFinalScore"),
  quizAccuracy: document.getElementById("quizAccuracy"),
  quizCorrectCount: document.getElementById("quizCorrectCount"),
  quizIncorrectCount: document.getElementById("quizIncorrectCount"),
  tryAgainButton: document.getElementById("tryAgainButton"),
  studyAnotherTopicButton: document.getElementById("studyAnotherTopicButton"),
  backHomeFromQuizButton: document.getElementById("backHomeFromQuizButton"),
  totalQuestionsStat: document.getElementById("totalQuestionsStat"),
  correctAnswersStat: document.getElementById("correctAnswersStat"),
  incorrectAnswersStat: document.getElementById("incorrectAnswersStat"),
  quizzesCompletedStat: document.getElementById("quizzesCompletedStat"),
  topicProgressContainer: document.getElementById("topicProgressContainer"),
  historyList: document.getElementById("historyList"),
  alertContainer: document.getElementById("alertContainer"),
};

function initializeSpeechRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!Recognition) {
    showAlert("Speech recognition is not supported in this browser. Please use a supported browser or type your answer manually.", "warning");
    return null;
  }

  const recognition = new Recognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    appState.isListening = true;
    DOM.homeMicButton.classList.add("listening");
    DOM.homeStatus.textContent = "🎤 Listening...";
    DOM.homeStatus.classList.add("listening");
    DOM.homeStatus.classList.remove("success");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    if (!transcript) {
      showAlert("No speech was detected. Please try again.", "warning");
      return;
    }

    appState.lastRecognizedText = transcript;
    handleSpeechResult(transcript);
  };

  recognition.onerror = (event) => {
    appState.isListening = false;
    resetMicUi();

    let message = "Speech recognition encountered an issue. Please try again.";

    if (event.error === "not-allowed") {
      message = "Microphone permission was denied. Please allow microphone access and try again.";
    } else if (event.error === "no-speech") {
      message = "No speech was detected. Please speak clearly and try again.";
    } else if (event.error === "audio-capture") {
      message = "Microphone was not detected. Please check your device settings.";
    }

    showAlert(message, "danger");
  };

  recognition.onend = () => {
    appState.isListening = false;
    resetMicUi();
  };

  appState.recognition = recognition;
  return recognition;
}

function resetMicUi() {
  DOM.homeMicButton.classList.remove("listening");
  DOM.homeStatus.classList.remove("listening");
}

function startListening(mode = "topic") {
  if (!appState.recognition) {
    initializeSpeechRecognition();
  }

  if (!appState.recognition) {
    return;
  }

  appState.recognitionMode = mode;
  appState.recognition.start();
}

function stopListening() {
  if (appState.recognition && appState.isListening) {
    appState.recognition.stop();
  }
}

function handleSpeechResult(transcript) {
  const normalizedTranscript = transcript.trim();
  if (!normalizedTranscript) {
    showAlert("No speech was detected. Please try again.", "warning");
    return;
  }

  if (appState.recognitionMode === "topic") {
    updateHomeStatus(`✓ Recognized: ${normalizedTranscript}`);
    detectTopicFromSpeech(normalizedTranscript);
    return;
  }

  if (appState.recognitionMode === "studyAnswer") {
    DOM.studyAnswerInput.value = normalizedTranscript;
    updateHomeStatus(`✓ Recognized: ${normalizedTranscript}`);
    showAlert(`Your answer is ready: ${normalizedTranscript}`, "success");
    stopListening();
    return;
  }

  if (appState.recognitionMode === "quizAnswer") {
    DOM.quizAnswerInput.value = normalizedTranscript;
    showAlert(`Your answer is ready: ${normalizedTranscript}`, "success");
    stopListening();
    return;
  }

  if (appState.recognitionMode === "studyControl") {
    parseVoiceCommand(normalizedTranscript);
    stopListening();
    return;
  }

  if (appState.recognitionMode === "quizControl") {
    parseVoiceCommand(normalizedTranscript);
    stopListening();
    return;
  }
}

function updateHomeStatus(message) {
  DOM.homeStatus.textContent = message;
  DOM.homeStatus.classList.remove("listening");
  DOM.homeStatus.classList.remove("success");

  if (message.includes("Listening")) {
    DOM.homeStatus.classList.add("listening");
  }

  if (message.startsWith("✓ Recognized:")) {
    DOM.homeStatus.classList.add("success");
  }
}

function detectTopicFromSpeech(transcript) {
  const normalized = transcript.toLowerCase();
  const topicMatchMap = {
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    bootstrap: "Bootstrap",
    python: "Python",
  };

  const detectedTopic = Object.keys(topicMatchMap).find((topicName) => normalized.includes(topicName));

  if (detectedTopic) {
    const selectedTopic = topicMatchMap[detectedTopic];
    selectStudyTopic(selectedTopic);
    showAlert(`${selectedTopic} selected.`, "success");
    DOM.homeStatus.textContent = `✓ Recognized: ${selectedTopic}`;
    DOM.homeStatus.classList.add("success");
    setActiveSection("study");
  } else {
    showAlert("Sorry, I didn't recognize that topic. Try HTML, CSS, JavaScript, Bootstrap or Python.", "warning");
  }
}

function parseVoiceCommand(transcript) {
  const normalized = transcript.toLowerCase();

  if (normalized.includes("next question")) {
    if (appState.activeSection === "study") {
      goToNextQuestion();
    } else if (appState.activeSection === "quiz") {
      handleQuizNext();
    }
    return;
  }

  if (normalized.includes("previous question")) {
    if (appState.activeSection === "study") {
      goToPreviousQuestion();
    }
    return;
  }

  if (normalized.includes("repeat question") || normalized.includes("read question")) {
    speakCurrentQuestion();
    return;
  }

  if (normalized.includes("show answer")) {
    if (appState.activeSection === "study") {
      showCurrentAnswer();
    } else if (appState.activeSection === "quiz") {
      revealQuizAnswer();
    }
    return;
  }

  if (normalized.includes("go home")) {
    setActiveSection("home");
    return;
  }
}

function speakText(text) {
  if (!window.speechSynthesis) {
    showAlert("Speech synthesis is not supported in this browser.", "warning");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const availableVoices = window.speechSynthesis.getVoices();
  const preferredVoice = availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("en"));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.onerror = () => {
    showAlert("Speech synthesis failed. Please try again.", "danger");
  };

  window.speechSynthesis.speak(utterance);
}

function speakCurrentQuestion() {
  const question = getCurrentStudyQuestion();
  if (!question) {
    return;
  }

  const text = `Question ${appState.studyIndex + 1}. ${question.question}`;
  speakText(text);
}

function speakStudyExplanation() {
  const question = getCurrentStudyQuestion();
  if (!question) {
    return;
  }

  speakText(`Explanation: ${question.explanation}`);
}

function speakQuizQuestion() {
  const question = getCurrentQuizQuestion();
  if (!question) {
    return;
  }

  speakText(`Question ${appState.quizIndex + 1}. ${question.question}`);
}

function setActiveSection(sectionName) {
  appState.activeSection = sectionName;

  DOM.sections.forEach((section) => {
    section.classList.toggle("active-section", section.id === `${sectionName}Section`);
  });

  DOM.navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === sectionName);
  });
}

function renderTopicCards() {
  DOM.studyTopicSelector.innerHTML = TOPIC_CONFIG.map(
    (topic) => `
      <div class="col-md-6 col-xl-4">
        <div class="topic-card p-4">
          <div class="topic-meta">
            <span class="topic-icon" aria-hidden="true">${topic.icon}</span>
            <span class="badge rounded-pill bg-primary-subtle text-primary-emphasis">${topic.questionCount} Questions</span>
          </div>
          <h3 class="mb-2">${topic.name}</h3>
          <p class="text-muted mb-3">${topic.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="question-count">${topic.questionCount} Questions</span>
            <button class="btn btn-primary rounded-pill px-3" type="button" data-topic="${topic.name}">Start Studying</button>
          </div>
        </div>
      </div>
    `
  ).join("");

  DOM.studyTopicSelector.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => selectStudyTopic(button.dataset.topic));
  });
}

function selectStudyTopic(topicName) {
  const topic = TOPIC_CONFIG.find((item) => item.name === topicName);

  if (!topic) {
    return;
  }

  appState.currentTopic = topicName;
  appState.studySession = QUESTION_DATABASE.filter((question) => question.topic === topicName);
  appState.studyIndex = 0;

  DOM.studyTopicHeading.textContent = topicName;
  DOM.studyDifficultyBadge.textContent = appState.studySession[0]?.difficulty || "Easy";
  DOM.studyDifficultyPill.textContent = appState.studySession[0]?.difficulty || "Easy";
  DOM.summaryTopic.textContent = topicName;
  DOM.summaryProgress.textContent = `0 / ${appState.studySession.length}`;
  DOM.summaryCorrect.textContent = "0";
  DOM.summaryIncorrect.textContent = "0";

  setActiveSection("study");
  DOM.studySessionPanel.classList.remove("hidden");
  showStudyQuestion();
}

function getCurrentStudyQuestion() {
  if (!appState.studySession.length) {
    return null;
  }

  return appState.studySession[appState.studyIndex] || null;
}

function showStudyQuestion() {
  const question = getCurrentStudyQuestion();
  if (!question) {
    return;
  }

  const totalQuestions = appState.studySession.length;
  const questionNumber = appState.studyIndex + 1;

  DOM.studyQuestionCounter.textContent = `Question ${questionNumber} of ${totalQuestions}`;
  DOM.studyQuestionText.textContent = question.question;
  DOM.studyDifficultyBadge.textContent = question.difficulty;
  DOM.studyDifficultyPill.textContent = question.difficulty;
  DOM.studyAnswerInput.value = "";
  DOM.studyFeedback.innerHTML = "";
  DOM.studyExplanation.classList.add("hidden");
  DOM.studyExplanation.innerHTML = "";
  DOM.summaryProgress.textContent = `${questionNumber} / ${totalQuestions}`;
  DOM.summaryCorrect.textContent = appState.correctAnswers.toString();
  DOM.summaryIncorrect.textContent = appState.incorrectAnswers.toString();
}

function goToNextQuestion() {
  if (!appState.studySession.length) {
    return;
  }

  if (appState.studyIndex < appState.studySession.length - 1) {
    appState.studyIndex += 1;
    showStudyQuestion();
  }
}

function goToPreviousQuestion() {
  if (!appState.studySession.length) {
    return;
  }

  if (appState.studyIndex > 0) {
    appState.studyIndex -= 1;
    showStudyQuestion();
  }
}

function showCurrentAnswer() {
  const question = getCurrentStudyQuestion();
  if (!question) {
    return;
  }

  DOM.studyExplanation.classList.remove("hidden");
  DOM.studyExplanation.innerHTML = `<strong>Correct Answer:</strong> ${question.answer}<br><strong>Explanation:</strong> ${question.explanation}`;
  DOM.studyFeedback.innerHTML = "";
}

function handleStudyAnswerSubmission() {
  const question = getCurrentStudyQuestion();
  const userAnswer = DOM.studyAnswerInput.value.trim();

  if (!userAnswer) {
    showAlert("Please enter an answer before checking.", "warning");
    return;
  }

  const result = checkAnswer(userAnswer, question);

  if (result.isCorrect) {
    appState.correctAnswers += 1;
    DOM.studyFeedback.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>✓ Correct!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  } else {
    appState.incorrectAnswers += 1;
    DOM.studyFeedback.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>✗ Not quite.</strong>
        <div class="mt-2">Correct Answer: ${question.answer}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  DOM.studyExplanation.classList.remove("hidden");
  DOM.studyExplanation.innerHTML = `<strong>Correct Answer:</strong> ${question.answer}<br><strong>Explanation:</strong> ${question.explanation}`;
  DOM.summaryCorrect.textContent = appState.correctAnswers.toString();
  DOM.summaryIncorrect.textContent = appState.incorrectAnswers.toString();

  updateProgressStats();
}

function startQuiz() {
  const topic = DOM.quizTopicSelect.value;
  const count = Number(DOM.quizCountSelect.value);
  const difficulty = DOM.quizDifficultySelect.value;

  let filteredQuestions = [...QUESTION_DATABASE];

  if (topic !== "all") {
    filteredQuestions = filteredQuestions.filter((question) => question.topic === topic);
  }

  if (difficulty !== "mixed") {
    filteredQuestions = filteredQuestions.filter((question) => question.difficulty.toLowerCase() === difficulty);
  }

  if (!filteredQuestions.length) {
    showAlert("No quiz questions are available for the selected filters.", "warning");
    return;
  }

  const selectedQuestions = filteredQuestions.slice(0, count);

  appState.quizSession = selectedQuestions;
  appState.quizIndex = 0;
  appState.quizCorrect = 0;
  appState.quizIncorrect = 0;

  DOM.quizSetupCard.classList.add("hidden");
  DOM.quizSessionPanel.classList.remove("hidden");
  DOM.quizResultPanel.classList.add("hidden");

  const displayTopic = topic === "all" ? "All Topics" : topic;
  DOM.quizTitle.textContent = `Quiz: ${displayTopic}`;
  renderQuizQuestion();
}

function getCurrentQuizQuestion() {
  if (!appState.quizSession.length) {
    return null;
  }

  return appState.quizSession[appState.quizIndex] || null;
}

function renderQuizQuestion() {
  const question = getCurrentQuizQuestion();
  if (!question) {
    return;
  }

  const questionNumber = appState.quizIndex + 1;
  const totalQuestions = appState.quizSession.length;

  DOM.quizCountBadge.textContent = `Question ${questionNumber} / ${totalQuestions}`;
  DOM.quizProgressBar.style.width = `${(questionNumber / totalQuestions) * 100}%`;
  DOM.quizProgressBar.setAttribute("aria-valuenow", String((questionNumber / totalQuestions) * 100));
  DOM.quizQuestionText.textContent = question.question;
  DOM.quizAnswerInput.value = "";
  DOM.quizFeedback.innerHTML = "";
  DOM.quizExplanation.classList.add("hidden");
  DOM.quizExplanation.innerHTML = "";
  DOM.quizNextButton.classList.add("hidden");
  DOM.submitQuizAnswerButton.disabled = false;
}

function handleQuizAnswerSubmission() {
  const question = getCurrentQuizQuestion();
  if (!question) {
    return;
  }

  const userAnswer = DOM.quizAnswerInput.value.trim();
  if (!userAnswer) {
    showAlert("Please enter an answer before submitting.", "warning");
    return;
  }

  const result = checkAnswer(userAnswer, question);
  DOM.submitQuizAnswerButton.disabled = true;

  if (result.isCorrect) {
    appState.quizCorrect += 1;
    DOM.quizFeedback.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>✓ Correct!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  } else {
    appState.quizIncorrect += 1;
    DOM.quizFeedback.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>✗ Not quite.</strong>
        <div class="mt-2">Correct Answer: ${question.answer}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  DOM.quizExplanation.classList.remove("hidden");
  DOM.quizExplanation.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;

  if (appState.quizIndex < appState.quizSession.length - 1) {
    DOM.quizNextButton.classList.remove("hidden");
  } else {
    DOM.quizNextButton.textContent = "See Results";
    DOM.quizNextButton.classList.remove("hidden");
  }

  updateProgressStats();
}

function handleQuizNext() {
  if (appState.quizIndex < appState.quizSession.length - 1) {
    appState.quizIndex += 1;
    renderQuizQuestion();
    return;
  }

  finishQuiz();
}

function finishQuiz() {
  const total = appState.quizSession.length;
  const score = appState.quizCorrect;
  const accuracy = total ? Math.round((score / total) * 100) : 0;

  DOM.quizFinalScore.textContent = `${score} / ${total}`;
  DOM.quizAccuracy.textContent = `${accuracy}%`;
  DOM.quizCorrectCount.textContent = String(appState.quizCorrect);
  DOM.quizIncorrectCount.textContent = String(appState.quizIncorrect);

  DOM.quizResultPanel.classList.remove("hidden");
  DOM.quizSessionPanel.classList.add("hidden");

  const historyEntry = {
    title: `${DOM.quizTopicSelect.value === "all" ? "All Topics" : DOM.quizTopicSelect.value} Quiz`,
    detail: `${score}/${total}`,
    timestamp: new Date().toISOString(),
  };

  addHistoryEntry(historyEntry);
  appState.progress.quizzesCompleted += 1;
  saveProgress(appState.progress);
  renderProgressDashboard();
}

function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function checkAnswer(userAnswer, question) {
  const normalizedAnswer = normalizeAnswer(userAnswer);
  const normalizedQuestionAnswer = normalizeAnswer(question.answer);
  const acceptable = question.acceptableAnswers.map((answer) => normalizeAnswer(answer));

  const isCorrect =
    normalizedAnswer === normalizedQuestionAnswer ||
    acceptable.includes(normalizedAnswer);

  const answerResult = {
    isCorrect,
    normalizedAnswer,
    correctAnswer: question.answer,
    explanation: question.explanation,
  };

  return answerResult;
}

function updateProgressStats() {
  const progress = appState.progress;
  progress.totalQuestions += 1;

  if (appState.activeSection === "study") {
    const currentQuestion = getCurrentStudyQuestion();
    if (!currentQuestion) {
      return;
    }

    const topicKey = currentQuestion.topic;
    if (!progress.topicStats[topicKey]) {
      progress.topicStats[topicKey] = { total: 0, correct: 0 };
    }

    const wasCorrect = checkAnswer(DOM.studyAnswerInput.value, currentQuestion).isCorrect;
    progress.topicStats[topicKey].total += 1;
    if (wasCorrect) {
      progress.topicStats[topicKey].correct += 1;
    }

    progress.correctAnswers += wasCorrect ? 1 : 0;
    progress.incorrectAnswers += wasCorrect ? 0 : 1;
    saveProgress(progress);
    renderProgressDashboard();
    return;
  }

  if (appState.activeSection === "quiz") {
    const currentQuestion = getCurrentQuizQuestion();
    if (!currentQuestion) {
      return;
    }

    const topicKey = currentQuestion.topic;
    if (!progress.topicStats[topicKey]) {
      progress.topicStats[topicKey] = { total: 0, correct: 0 };
    }

    progress.topicStats[topicKey].total += 1;
    if (appState.quizCorrect > 0 || appState.quizIncorrect > 0) {
      progress.correctAnswers = appState.quizCorrect;
      progress.incorrectAnswers = appState.quizIncorrect;
    }

    saveProgress(progress);
    renderProgressDashboard();
  }
}

function renderProgressDashboard() {
  const progress = appState.progress;

  DOM.totalQuestionsStat.textContent = progress.totalQuestions;
  DOM.correctAnswersStat.textContent = progress.correctAnswers;
  DOM.incorrectAnswersStat.textContent = progress.incorrectAnswers;
  DOM.quizzesCompletedStat.textContent = progress.quizzesCompleted;

  const topicEntries = TOPIC_CONFIG.map((topic) => {
    const topicProgress = progress.topicStats[topic.name] || { total: 0, correct: 0 };
    const ratio = topicProgress.total ? (topicProgress.correct / topicProgress.total) * 100 : 0;

    return `
      <div class="topic-progress-item">
        <div class="topic-progress-label">
          <span>${topic.name}</span>
          <span>${topicProgress.correct} / ${topicProgress.total} correct</span>
        </div>
        <div class="progress">
          <div class="progress-bar" style="width: ${ratio}%"></div>
        </div>
      </div>
    `;
  });

  DOM.topicProgressContainer.innerHTML = topicEntries.join("");
  renderHistoryList();
}

function renderHistoryList() {
  if (!appState.history.length) {
    DOM.historyList.innerHTML = `<li class="text-muted">No activity yet.</li>`;
    return;
  }

  DOM.historyList.innerHTML = appState.history
    .slice(0, 6)
    .map((entry) => {
      const dateText = relativeTime(entry.timestamp);
      return `
        <li>
          <span class="activity-title">${entry.title}</span>
          <span class="activity-detail">${entry.detail} · ${dateText}</span>
        </li>
      `;
    })
    .join("");
}

function relativeTime(timestamp) {
  const current = new Date();
  const past = new Date(timestamp);
  const elapsed = Math.floor((current - past) / 86400000);

  if (elapsed === 0) return "Today";
  if (elapsed === 1) return "Yesterday";
  if (elapsed < 30) return `${elapsed} days ago`;
  return past.toLocaleDateString();
}

function addHistoryEntry(entry) {
  appState.history.unshift({
    ...entry,
    id: Date.now(),
  });

  appState.history = appState.history.slice(0, 10);
  saveHistory(appState.history);
  renderHistoryList();
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

function loadProgress() {
  const storedProgress = localStorage.getItem(STORAGE_KEYS.progress);

  if (!storedProgress) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      quizzesCompleted: 0,
      topicStats: {},
    };
  }

  try {
    return JSON.parse(storedProgress);
  } catch (error) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      quizzesCompleted: 0,
      topicStats: {},
    };
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
}

function loadHistory() {
  const storedHistory = localStorage.getItem(STORAGE_KEYS.history);

  if (!storedHistory) {
    return [];
  }

  try {
    return JSON.parse(storedHistory);
  } catch (error) {
    return [];
  }
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function loadTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  DOM.themeIcon.textContent = isDark ? "☀️" : "🌙";
  DOM.themeToggle.classList.toggle("btn-outline-light", isDark);
  DOM.themeToggle.classList.toggle("btn-outline-dark", !isDark);
  saveTheme(theme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
  applyTheme(nextTheme);
}

function bindEventListeners() {
  DOM.navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveSection(link.dataset.nav);
    });
  });

  DOM.startStudyHomeButton.addEventListener("click", () => {
    if (!appState.currentTopic) {
      const firstTopic = TOPIC_CONFIG[0].name;
      selectStudyTopic(firstTopic);
    } else {
      setActiveSection("study");
    }
  });

  DOM.homeMicButton.addEventListener("click", () => {
    if (appState.isListening) {
      stopListening();
      return;
    }

    updateHomeStatus("🎤 Listening...");
    appState.recognitionMode = "topic";
    startListening("topic");
  });

  DOM.listenQuestionButton.addEventListener("click", () => {
    speakCurrentQuestion();
  });

  DOM.answerQuestionButton.addEventListener("click", () => {
    if (appState.isListening) {
      stopListening();
      return;
    }

    updateHomeStatus("🎤 Listening...");
    appState.recognitionMode = "studyAnswer";
    startListening("studyAnswer");
  });

  DOM.showAnswerButton.addEventListener("click", () => {
    showCurrentAnswer();
  });

  DOM.submitStudyAnswerButton.addEventListener("click", () => {
    handleStudyAnswerSubmission();
  });

  DOM.previousQuestionButton.addEventListener("click", () => {
    goToPreviousQuestion();
  });

  DOM.nextQuestionButton.addEventListener("click", () => {
    goToNextQuestion();
  });

  DOM.listenExplanationButton.addEventListener("click", () => {
    speakStudyExplanation();
  });

  DOM.studyHomeButton.addEventListener("click", () => {
    setActiveSection("home");
  });

  DOM.startQuizButton.addEventListener("click", () => {
    startQuiz();
  });

  DOM.quizListenButton.addEventListener("click", () => {
    speakQuizQuestion();
  });

  DOM.quizSpeakButton.addEventListener("click", () => {
    if (appState.isListening) {
      stopListening();
      return;
    }

    appState.recognitionMode = "quizAnswer";
    startListening("quizAnswer");
  });

  DOM.submitQuizAnswerButton.addEventListener("click", () => {
    handleQuizAnswerSubmission();
  });

  DOM.quizNextButton.addEventListener("click", () => {
    handleQuizNext();
  });

  DOM.tryAgainButton.addEventListener("click", () => {
    DOM.quizResultPanel.classList.add("hidden");
    DOM.quizSetupCard.classList.remove("hidden");
    DOM.quizSessionPanel.classList.add("hidden");
    setActiveSection("quiz");
  });

  DOM.studyAnotherTopicButton.addEventListener("click", () => {
    DOM.quizResultPanel.classList.add("hidden");
    DOM.quizSetupCard.classList.remove("hidden");
    DOM.quizSessionPanel.classList.add("hidden");
    setActiveSection("study");
  });

  DOM.backHomeFromQuizButton.addEventListener("click", () => {
    DOM.quizResultPanel.classList.add("hidden");
    DOM.quizSetupCard.classList.remove("hidden");
    DOM.quizSessionPanel.classList.add("hidden");
    setActiveSection("home");
  });

  DOM.themeToggle.addEventListener("click", toggleTheme);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && appState.isListening) {
      stopListening();
    }
  });
}

function initializeApp() {
  renderTopicCards();
  applyTheme(appState.theme);
  setActiveSection("home");
  renderProgressDashboard();
  initializeSpeechRecognition();
  bindEventListeners();
}

initializeApp();
