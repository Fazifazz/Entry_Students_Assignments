# Voice To-do list

Simple demo that accepts voice input and adds tasks to an ordered list. Saying "Done Task 1" will mark the first task complete.

Run locally:

1. Use VS Code Live Server extension (recommended) and open `index.html`.
2. Or run a simple local server from the project folder:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

Notes:
- SpeechRecognition (Web Speech API) works best in Chrome. Some browsers require a secure origin (https) or localhost.
- If your browser blocks microphone access, allow it when prompted.
