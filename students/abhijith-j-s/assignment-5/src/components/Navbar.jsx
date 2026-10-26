import { NavLink, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar() {
  const { favourites } = useFavorites();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">Recipe Box</Link>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/recipes">Recipes</NavLink></li>
            <li>
              <NavLink to="/favourites">
                Favourites
                {favourites.length > 0 && <span className="badge">{favourites.length}</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
