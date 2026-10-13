# Movie Watchlist Assignment

This project is a React + Vite movie watchlist app that displays movie cards and lets users add movies to a watchlist.

## Features
- Browse a movie list loaded from a local JSON file
- Filter movies by genre
- Add movies to a watchlist
- Remove movies from the watchlist
- Show a loading spinner while data loads
- Display an error message if the movie data fails to load

## Tech Stack
- React
- Vite
- JavaScript
- CSS
- Axios

## Project Structure
- `src/App.jsx` - main app logic and layout
- `src/App.css` - main page styling
- `src/components/movie-card/` - movie card component and styles
- `src/components/watch-list/` - watchlist sidebar and styles
- `public/movies.json` - movie data source

## Installation
1. Open the project folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local link shown in the terminal to view the project

## Build
To create a production build:
```bash
npm run build
```

## Assignment Goal
The app demonstrates a movie catalog with a clean card-based layout, genre filtering, and watchlist management using React state.
