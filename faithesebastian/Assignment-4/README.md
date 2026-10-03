Build a Movie Watchlist App with React

Objective:
The purpose of this assignment is to test React component architecture,
props, useState, useEffect, and conditional rendering — the core React
concepts covered in Sessions 27 to 30 — by building a movie watchlist
application.

Assignment: Build a movie watchlist application using React components
and hooks.

Requirements:
● Create a MovieCard component that accepts title, genre, year, and rating
as props and renders a styled card with all four values displayed.
● Maintain a watchlist array in state using useState — clicking 'Add to
Watchlist' on a MovieCard adds that movie to the list.
● Prevent duplicate entries — if a movie is already in the watchlist, change
the button to 'Added' (disabled) instead of adding it again.
● Create a Watchlist component that displays all added movies, each with
a 'Remove' button that removes it from the watchlist.
● Fetch a list of movies from a public API or a local movies.json file using
useEffect and Axios — display a loading spinner while fetching.
● Add a genre filter using useState — buttons (All, Action, Comedy, Drama,
etc.) to show only matching MovieCards.
● Show a 'No movies found' message using conditional rendering when the
filtered list is empty.
