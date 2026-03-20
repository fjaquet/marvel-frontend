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
              <Link to="/favorites">Favorites</Link>
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
              Signup
            </button>
            <button
              className="header__btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
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
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
