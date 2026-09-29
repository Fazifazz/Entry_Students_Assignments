// EchoNote uses the browser's Web Speech API and localStorage for persistence.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const noteInput = document.getElementById("noteInput");
const recordButton = document.getElementById("recordButton");
const recordButtonLabel = document.getElementById("recordButtonLabel");
const recordingHint = document.getElementById("recordingHint");
const recordingTimer = document.getElementById("recordingTimer");
const supportStatus = document.getElementById("supportStatus");
const notesList = document.getElementById("notesList");
const emptyState = document.getElementById("emptyState");
const noteCount = document.getElementById("noteCount");
const wordCount = document.getElementById("wordCount");
const toast = document.getElementById("toast");

let notes = loadNotes();
let isRecording = false;
let timerInterval;
let recordingSeconds = 0;
let toastTimeout;
let recognition;

// Restore saved notes safely, even if localStorage contains invalid data.
function loadNotes() {
	try {
		const savedNotes = JSON.parse(localStorage.getItem("echoNotes") || "[]");
		return Array.isArray(savedNotes) ? savedNotes : [];
	} catch (error) {
		return [];
	}
}

function saveNotes() {
	localStorage.setItem("echoNotes", JSON.stringify(notes));
}

function updateWordCount() {
	const words = noteInput.value.trim() ? noteInput.value.trim().split(/\s+/).length : 0;
	wordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;
}

function renderNotes() {
	notesList.innerHTML = "";
	notes.forEach((note) => {
		const card = document.createElement("article");
		card.className = "note-card";
		card.innerHTML = `
			<p></p>
			<span class="note-date">${formatDate(note.createdAt)}</span>
			<button class="delete-button" type="button" aria-label="Delete note" data-note-id="${note.id}">×</button>
		`;
		card.querySelector("p").textContent = note.text;
		notesList.appendChild(card);
	});
	noteCount.textContent = notes.length;
	emptyState.hidden = notes.length > 0;
}

function formatDate(date) {
	return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}

function showToast(message) {
	toast.textContent = message;
	toast.classList.add("show");
	clearTimeout(toastTimeout);
	toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setRecordingState(recording) {
	isRecording = recording;
	document.body.classList.toggle("recording", recording);
	recordButton.setAttribute("aria-pressed", String(recording));
	recordButtonLabel.textContent = recording ? "Stop recording" : "Start recording";
	recordingHint.textContent = recording ? "Listening... speak clearly" : "Press the button and start speaking";
	supportStatus.textContent = recording ? "Listening now" : "Ready to listen";
}

function resetTimer() {
	clearInterval(timerInterval);
	recordingSeconds = 0;
	recordingTimer.textContent = "00:00";
}

function startTimer() {
	timerInterval = setInterval(() => {
		recordingSeconds += 1;
		const minutes = String(Math.floor(recordingSeconds / 60)).padStart(2, "0");
		const seconds = String(recordingSeconds % 60).padStart(2, "0");
		recordingTimer.textContent = `${minutes}:${seconds}`;
	}, 1000);
}

function startRecording() {
	if (!recognition) return;
	setRecordingState(true);
	resetTimer();
	startTimer();
	recognition.start();
}

function stopRecording() {
	if (!recognition) return;
	recognition.stop();
	setRecordingState(false);
	clearInterval(timerInterval);
}

function saveCurrentNote() {
	const text = noteInput.value.trim();
	if (!text) {
		showToast("Add some words before saving.");
		noteInput.focus();
		return;
	}
	notes.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), text, createdAt: Date.now() });
	saveNotes();
	renderNotes();
	noteInput.value = "";
	updateWordCount();
	showToast("Note saved to your library.");
}

function setupSpeechRecognition() {
	if (!SpeechRecognition) {
		supportStatus.textContent = "Speech input unavailable";
		recordingHint.textContent = "Type your note below in this browser";
		recordButton.disabled = true;
		recordButton.title = "Speech recognition is not supported in this browser";
		return;
	}

	recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = "en-US";
	recognition.onresult = (event) => {
		let transcript = "";
		for (let index = event.resultIndex; index < event.results.length; index += 1) {
			transcript += event.results[index][0].transcript;
		}
		noteInput.value = transcript;
		updateWordCount();
	};
	recognition.onerror = (event) => {
		if (event.error === "not-allowed") showToast("Microphone access is required to record.");
		if (event.error !== "aborted") stopRecording();
	};
	recognition.onend = () => {
		if (isRecording) setRecordingState(false);
		clearInterval(timerInterval);
	};
}

recordButton.addEventListener("click", () => (isRecording ? stopRecording() : startRecording()));
noteInput.addEventListener("input", updateWordCount);
document.getElementById("saveNoteButton").addEventListener("click", saveCurrentNote);
document.getElementById("clearDraftButton").addEventListener("click", () => {
	noteInput.value = "";
	updateWordCount();
});
document.getElementById("clearAllButton").addEventListener("click", () => {
	if (!notes.length) return;
	if (window.confirm("Delete all saved notes?")) {
		notes = [];
		saveNotes();
		renderNotes();
		showToast("All notes cleared.");
	}
});
notesList.addEventListener("click", (event) => {
	const button = event.target.closest("[data-note-id]");
	if (!button) return;
	notes = notes.filter((note) => note.id !== button.dataset.noteId);
	saveNotes();
	renderNotes();
	showToast("Note deleted.");
});

setupSpeechRecognition();
renderNotes();
updateWordCount();
