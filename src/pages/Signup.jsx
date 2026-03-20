import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const VITE_API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
  const VITE_API_FQDN = import.meta.env.VITE_API_FQDN;
  const VITE_API_PORT = import.meta.env.VITE_API_PORT;

  const navigate = useNavigate();

  const handleChange = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/signup`,
        data: {
          username,
          email,
          password,
        },
      });

      Cookies.set("56879_marvel_access_token", response.data.token, {
        expires: 7,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="signup-page__container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="signup-form__input"
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={handleChange(setUsername)}
          />
          <input
            className="signup-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <input
            className="signup-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handleChange(setPassword)}
          />

          <button>S'inscrire</button>
        </form>
        <Link to="/login">login</Link>
      </div>
    </main>
  );
};

export default SignupPage;
