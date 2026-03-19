import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/img/marvelLogo.png";
import "../styles/components/header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header__container container">
        <img className="header__logo" src={logo} alt="Logo marvel" />
        <nav>
          <ul>
            <li>
              <Link to="/">Characters</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
            <li>
              <Link to="/favoris">Favoris</Link>
            </li>
          </ul>
        </nav>
        <div className="header__auth">
          <button
            className="header__btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            S'inscrire
          </button>
          <button
            className="header__btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
