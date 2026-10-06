# 🎬 Mallu Movie Hub

A React-based Movie Watchlist application built using React, Axios, JavaScript, HTML, CSS, and Bootstrap.

The application allows users to browse movies, filter movies by genre, add movies to a personal watchlist, prevent duplicate additions, and remove movies from the watchlist.

---

## 📌 Project Overview

**Mallu Movie Hub** is a movie collection and watchlist application developed as part of a React assignment.

The project demonstrates the use of:

- React Components
- Props
- `useState`
- `useEffect`
- Conditional Rendering
- Axios
- Local Storage
- Dynamic Movie Cards
- Genre Filtering
- Loading Spinner
- Watchlist Management

---

## ✨ Features

### 🎥 Movie Collection

- Displays movies dynamically from `movies.json`.
- Movie information includes:
  - Movie Title
  - Genre
  - Release Year
  - Rating
  - Movie Poster

### 🔎 Genre Filtering

Movies can be filtered using genre buttons:

- All
- Comedy
- Drama
- Romance
- Thriller
- Fiction

Only movies matching the selected genre are displayed.

### ❤️ Watchlist

Users can:

- Add movies to the watchlist.
- View all added movies.
- Remove movies from the watchlist.
- Store watchlist data using browser `localStorage`.

### 🚫 Duplicate Prevention

If a movie has already been added to the watchlist:

- The button changes to **ADDED**.
- The button becomes disabled.
- The same movie cannot be added again.

### ⏳ Loading Spinner

A Bootstrap loading spinner is displayed while movie data is being fetched.

### ❌ No Movies Found

If no movies match the selected genre, the application displays:

> No movies found in this genre

### 💾 Local Storage

The watchlist is stored in browser `localStorage`, allowing the watchlist data to remain available after refreshing the page.

---

## 🛠️ Technologies Used

- React
- JavaScript
- HTML5
- CSS3
- Axios
- Bootstrap
- Vite
- Browser Local Storage

---

## 📂 Project Structure

```text
movie-watchlist-app/
│
├── public/
│   └── movies.json
│
├── src/
│   ├── assets/
│   │   └── logo.png
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   └── WatchList.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md