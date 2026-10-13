import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,faInstagram,faXTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>🎬 Movie Watchlist</h2>

          <p>
            Discover great movies, explore new genres,
            and build your personal watchlist.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          <a href="#movies">Movies</a>
          <a href="#watchlist">My Watchlist</a>
          <a href="#hero">Discover</a>
        </div>

        <div className="footer-column">
          <h3>Genres</h3>

          <a href="#movies">Action</a>
          <a href="#movies">Comedy</a>
          <a href="#movies">Drama</a>
        </div>

        <div className="footer-column">
          <h3>Connect With Us </h3>

    <div className="footer-socials">

         <a href="#" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebookF} />
        </a>

        <a href="#" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a href="#" aria-label="X">
        <FontAwesomeIcon icon={faXTwitter} />
        </a>

        <a href="#" aria-label="YouTube">
        <FontAwesomeIcon icon={faYoutube} />
        </a>

    </div>

          <p className="footer-tagline">
            Your next movie is waiting. 🍿
          </p>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Movie Watchlist. All rights reserved.
        </p>

       
      </div>

    </footer>
  );
}

export default Footer;