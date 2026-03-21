import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/img/marvelLogo.png";
import "../styles/components/header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("56879_marvel_access_token");

  return (
    <header>
      <div className="header__container container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo marvel" />
        </Link>

        <nav>
          <ul>
            <li>
              <Link to="/">CHARACTERS</Link>
            </li>
            <li>
              <Link to="/comics">COMICS</Link>
            </li>
            <li>
              <Link to="/favorites">FAVORITES</Link>
            </li>
          </ul>
        </nav>

        {!token ? (
          <div className="header__auth">
            <button
              className="header__btn"
              onClick={() => {
                navigate("/signup");
              }}
            >
              SIGN UP
            </button>
            <button
              className="header__btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              LOG IN
            </button>
          </div>
        ) : (
          <div className="header__auth">
            <button
              className="header__btn"
              onClick={() => {
                Cookies.remove("56879_marvel_access_token");
                navigate("/");
              }}
            >
              DISCONNECT
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
