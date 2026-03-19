import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
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
      await axios({
        method: "post",
        url: `${VITE_API_PROTOCOL}://${VITE_API_FQDN}:${VITE_API_PORT}/user/login`,
        data: {
          email: email,
          password: password,
        },
      });

      navigate("/publish");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="signup-page__container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="signup-form__input"
            type="email"
            name="Adresse email"
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

          <button>Se connecter</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </main>
  );
};

export default LoginPage;
