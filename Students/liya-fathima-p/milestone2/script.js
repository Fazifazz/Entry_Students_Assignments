const startBtn = document.querySelector("#start-btn");
const speakBtn = document.querySelector("#speak-btn");

const speechText = document.querySelector("#speech-text");
const status = document.querySelector("#status");


// =========================
// SPEECH RECOGNITION
// =========================

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


if (!SpeechRecognition) {

  status.textContent =
    "Speech recognition is not supported in this browser.";

} else {

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.interimResults = false;


  startBtn.addEventListener("click", () => {

    recognition.start();

  });


  recognition.onstart = () => {

    status.textContent = "Listening...";

  };


  recognition.onresult = (event) => {

    const text =
      event.results[0][0].transcript;

    speechText.value = text;

  };


  recognition.onend = () => {

    status.textContent =
      "Stopped listening.";

  };


  recognition.onerror = (event) => {

    status.textContent =
      `Error: ${event.error}`;

  };

}


// =========================
// SPEECH SYNTHESIS
// =========================

speakBtn.addEventListener("click", () => {

  const text = speechText.value.trim();


  if (text === "") {

    status.textContent =
      "Please enter some text first.";

    return;

  }


  const utterance =
    new SpeechSynthesisUtterance(text);


  speechSynthesis.speak(utterance);

});