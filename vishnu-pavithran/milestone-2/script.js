// The catalog is data-driven so the same rendering code handles every result.
const products = [
  { id: 1, name: "iPhone 16", category: "Mobile", price: 79999 },
  { id: 2, name: "Samsung Galaxy S25", category: "Mobile", price: 74999 },
  { id: 3, name: "OnePlus 13", category: "Mobile", price: 64999 },
  { id: 4, name: "MacBook Air M4", category: "Laptop", price: 114999 },
  { id: 5, name: "Dell XPS 14", category: "Laptop", price: 129999 },
  { id: 6, name: "Sony WH-1000XM6", category: "Headphones", price: 34990 },
  {
    id: 7,
    name: "Bose QuietComfort Ultra",
    category: "Headphones",
    price: 42900,
  },
  {
    id: 8,
    name: "Apple Watch Series 10",
    category: "Smart Watch",
    price: 46900,
  },
  {
    id: 9,
    name: "Google Pixel Watch 3",
    category: "Smart Watch",
    price: 39999,
  },
  { id: 10, name: "iPad Air M3", category: "Tablet", price: 59900 },
  { id: 11, name: "Samsung Galaxy Tab S10", category: "Tablet", price: 67999 },
  { id: 12, name: "Nothing Phone 3", category: "Mobile", price: 44999 },
];

const searchInput = document.querySelector("#search-input");
const productGrid = document.querySelector("#product-grid");
const resultCount = document.querySelector("#result-count");
const statusMessage = document.querySelector("#status");
const voiceButton = document.querySelector("#voice-button");
const clearButton = document.querySelector("#clear-button");
const voiceLabel = voiceButton.querySelector(".voice-label");
const readSearchButton = document.querySelector("#read-search-button");
const stopSpeechButton = document.querySelector("#stop-speech-button");
const speechStatus = document.querySelector("#speech-status");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

const speechSynthesisSupported = "speechSynthesis" in window;

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function displayProducts(productList) {
  if (productList.length === 0) {
    productGrid.innerHTML =
      '<div class="empty-state">No products found. Try a different search.</div>';
    return;
  }

  productGrid.innerHTML = productList
    .map(
      (product, index) => `
    <article class="product-card" style="animation-delay: ${index * 35}ms">
      <p class="product-category">${product.category}</p>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">${formatPrice(product.price)}</p>
    </article>
  `,
    )
    .join("");
}

function updateResultCount(count) {
  resultCount.textContent =
    count === 0
      ? "No products found"
      : `${count} ${count === 1 ? "product" : "products"} found`;
}

function filterProducts(searchTerm = searchInput.value) {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  const matchingProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedTerm),
  );

  displayProducts(matchingProducts);
  updateResultCount(matchingProducts.length);
}

function setListeningState(listening) {
  isListening = listening;
  voiceButton.classList.toggle("is-listening", listening);
  voiceButton.setAttribute(
    "aria-label",
    listening ? "Stop voice search" : "Start voice search",
  );
  voiceLabel.textContent = listening ? "Listening..." : "Speak";
  voiceButton.querySelector("span:first-child").textContent = listening
    ? "🔴"
    : "🎤";
  statusMessage.classList.toggle("listening", listening);
}

function handleSpeechResult(event) {
  let transcript = "";

  // event.results[0][0].transcript is the first recognized spoken phrase.
  // Looping from resultIndex also includes later interim and final phrases.
  for (
    let index = event.resultIndex;
    index < event.results.length;
    index += 1
  ) {
    transcript += event.results[index][0].transcript;
  }

  searchInput.value = transcript;
  filterProducts(transcript);
}

function startVoiceSearch() {
  if (!recognition || isListening) return;

  setListeningState(true);
  statusMessage.textContent = "🎤 Listening...";

  try {
    recognition.start();
  } catch (error) {
    setListeningState(false);
    statusMessage.textContent = "Unable to recognize speech. Please try again.";
  }
}

function stopVoiceSearch() {
  if (recognition && isListening) recognition.stop();
}

function clearSearch() {
  searchInput.value = "";
  filterProducts("");
  stopVoiceSearch();
  statusMessage.textContent = SpeechRecognition
    ? "Click the microphone to search"
    : "Voice search is not supported in this browser. Please use the text search instead.";
}

function speakSearchText() {
  const text = searchInput.value.trim();

  if (!speechSynthesisSupported) {
    speechStatus.textContent =
      "Text-to-Speech is not supported in this browser.";
    return;
  }

  if (!text) {
    speechStatus.textContent =
      "Speech Status: Please enter or speak a search term first.";
    return;
  }

  speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);

  speech.onstart = () => {
    speechStatus.textContent = "🔊 Speech Status: Reading...";
  };
  speech.onend = () => {
    speechStatus.textContent = "✓ Speech Status: Finished";
  };
  speech.onerror = () => {
    speechStatus.textContent = "Speech Status: Unable to read search text.";
  };

  speechSynthesis.speak(speech);
}

function stopSpeech() {
  if (!speechSynthesisSupported) return;

  speechSynthesis.cancel();
  speechStatus.textContent = "⏹ Speech Status: Stopped";
}

function setupVoiceRecognition() {
  if (!SpeechRecognition) {
    voiceButton.disabled = true;
    voiceButton.setAttribute("aria-disabled", "true");
    statusMessage.textContent =
      "Voice search is not supported in this browser. Please use the text search instead.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-IN";

  recognition.addEventListener("result", handleSpeechResult);
  recognition.addEventListener("end", () => {
    if (isListening) {
      setListeningState(false);
      statusMessage.textContent = "Voice search stopped";
    }
  });
  recognition.addEventListener("error", () => {
    setListeningState(false);
    statusMessage.textContent = "Unable to recognize speech. Please try again.";
  });
}

searchInput.addEventListener("input", () => filterProducts());
voiceButton.addEventListener("click", () => {
  if (isListening) stopVoiceSearch();
  else startVoiceSearch();
});
clearButton.addEventListener("click", clearSearch);
readSearchButton.addEventListener("click", speakSearchText);
stopSpeechButton.addEventListener("click", stopSpeech);

if (!speechSynthesisSupported) {
  speechStatus.textContent = "Text-to-Speech is not supported in this browser.";
  readSearchButton.disabled = true;
  stopSpeechButton.disabled = true;
}

displayProducts(products);
updateResultCount(products.length);
setupVoiceRecognition();
