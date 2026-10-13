// Calculator elements
const displayScreen = document.getElementById("display-screen");
const voiceButton = document.getElementById("voice-button");
const readAloudButton = document.getElementById("read-aloud-button");
const voiceCommand = document.getElementById("voice-command");
const statusMessage = document.getElementById("status-message");
const calculatorButtons = document.getElementById("calculator-buttons");

let currentExpression = "";
let justCalculated = false;
let recognition;
let recognitionError = false;


// Update calculator display
function updateDisplay(value = currentExpression || "0") {
    displayScreen.textContent = value;
}


// Update status message
function updateStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("is-error", isError);
}


// Check whether a value is an operator
function isOperator(value) {
    return ["+", "-", "*", "/", "%"].includes(value);
}


// Add number, decimal or operator
function addValue(value) {

    if (justCalculated && !isOperator(value)) {
        currentExpression = "";
    }

    justCalculated = false;

    // Handle decimal point
    if (value === ".") {

        const currentNumber = currentExpression.split(/[+*/%-]/).pop();

        if (currentNumber.includes(".")) {
            return;
        }

        if (!currentNumber) {
            currentExpression += "0";
        }
    }

    // Replace previous operator
    if (
        isOperator(value) &&
        isOperator(currentExpression.slice(-1))
    ) {
        currentExpression = currentExpression.slice(0, -1);
    }

    currentExpression += value;

    updateDisplay();
}


// Clear calculator
function clearCalculator() {
    currentExpression = "";
    justCalculated = false;

    voiceCommand.textContent = "";

    updateDisplay();
    updateStatus("Ready for input");
}


// Delete last character
function deleteLastCharacter() {
    currentExpression = currentExpression.slice(0, -1);

    justCalculated = false;

    updateDisplay();
}


// Calculate expression
function calculateExpression(expression) {

    // Convert × or x into *
    const normalizedExpression = expression.replace(/[×x]/gi, "*");

    // Allow only calculator characters
    if (
        !normalizedExpression ||
        !/^[0-9.+*/%()\- \s]+$/.test(normalizedExpression)
    ) {
        return {
            error: "Invalid calculator expression"
        };
    }

    // Check division by zero
    if (/\/\s*0+(?:\.0*)?(?:\D|$)/.test(normalizedExpression)) {
        return {
            error: "Division by zero"
        };
    }

    // Convert percentage
    const percentageExpression = normalizedExpression.replace(
        /(\d+(?:\.\d+)?)%/g,
        "($1 / 100)"
    );

    try {

        const result = Function(
            `"use strict"; return (${percentageExpression})`
        )();

        if (!Number.isFinite(result)) {
            return {
                error: "Invalid calculation"
            };
        }

        return {
            value: String(Number(result.toFixed(10)))
        };

    } catch (error) {

        return {
            error: "Invalid calculator expression"
        };
    }
}


// Read result aloud
function speakResult(result) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const spokenResult = new SpeechSynthesisUtterance(
        `The answer is ${result}.`
    );

    window.speechSynthesis.speak(spokenResult);
}


// Calculate and show result
function calculateAndShow() {

    const calculation = calculateExpression(currentExpression);

    if (calculation.error) {
        updateStatus(calculation.error, true);
        return;
    }

    currentExpression = calculation.value;
    justCalculated = true;

    updateDisplay();

    updateStatus("Calculation complete");

    // Read result aloud
    speakResult(calculation.value);
}


// Calculator button clicks
calculatorButtons.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.value) {
        addValue(button.dataset.value);
        return;
    }

    if (button.dataset.action === "clear") {
        clearCalculator();

    } else if (button.dataset.action === "delete") {
        deleteLastCharacter();

    } else if (button.dataset.action === "calculate") {
        calculateAndShow();
    }
});


// Convert voice command into calculator expression
function convertVoiceCommand(command) {

    let expression = command.toLowerCase().trim();

    const numberWords = {
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9"
    };


    // Convert calculator words into operators
    expression = expression
        .replace(/what is|calculate|equals?/g, " ")

        // MULTIPLICATION
        .replace(/multiplied by|multiply by|multiply|times|\binto\b/g, " * ")
		.replace(/\bx\b|×/gi, " * ")

        // DIVISION
        .replace(/divided by|over/g, " / ")

        // ADDITION
        .replace(/plus/g, " + ")

        // SUBTRACTION
        .replace(/minus/g, " - ")

        // PERCENTAGE
        .replace(/percent(?!age)/g, " % ")

        // DECIMAL
        .replace(/point|decimal/g, ".");


    // Convert number words into numbers
    Object.entries(numberWords).forEach(([word, number]) => {

        expression = expression.replace(
            new RegExp(`\\b${word}\\b`, "g"),
            number
        );

    });


    // Remove anything that is not a calculator character
    return expression
        .replace(/[^0-9.+*/%()\- \s]/g, "")
        .replace(/\s+/g, "");
}


// Set microphone listening state
function setListeningState(isListening) {

    voiceButton.classList.toggle(
        "is-listening",
        isListening
    );

    voiceButton.setAttribute(
        "aria-pressed",
        String(isListening)
    );
}


// Handle voice result
function handleVoiceResult(event) {

    const spokenText = event.results[0][0].transcript;

    voiceCommand.textContent =
        `Recognized: ${spokenText}`;


    const spokenExpression =
        convertVoiceCommand(spokenText);


    if (
        !spokenExpression ||
        !/[0-9]/.test(spokenExpression)
    ) {
        updateStatus(
            "Invalid voice command",
            true
        );

        return;
    }


    currentExpression = spokenExpression;

    updateDisplay();

    // Calculate automatically
    calculateAndShow();
}


// Handle recognition error
function handleRecognitionError(event) {

    recognitionError = true;

    if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
    ) {

        updateStatus(
            "Microphone permission denied",
            true
        );

    } else if (event.error === "no-speech") {

        updateStatus(
            "No speech detected",
            true
        );

    } else {

        updateStatus(
            "Voice recognition error",
            true
        );
    }
}


// Start voice recognition
function startVoiceRecognition() {

    if (!recognition) {

        updateStatus(
            "Speech recognition is not supported in this browser",
            true
        );

        return;
    }

    recognitionError = false;

    voiceCommand.textContent = "";

    try {

        recognition.start();

    } catch (error) {

        updateStatus(
            "Voice recognition could not start",
            true
        );
    }
}


// Speech Recognition
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;


    recognition.onstart = () => {

        setListeningState(true);

        updateStatus("Listening...");
    };


    recognition.onresult = handleVoiceResult;


    recognition.onerror = handleRecognitionError;


    recognition.onend = () => {

        setListeningState(false);

        if (!recognitionError) {
            updateStatus("Ready for input");
        }
    };

} else {

    updateStatus(
        "Speech recognition is not supported in this browser",
        true
    );
}


// Microphone button
voiceButton.addEventListener(
    "click",
    startVoiceRecognition
);


// Read the displayed result aloud when button is clicked
readAloudButton.addEventListener("click", () => {

    speakResult(displayScreen.textContent);

});