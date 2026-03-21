import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/pages/shared/auth.css";

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
    <main className="auth-page">
      <div className="container auth-container">
        <h1 className="auth-title">SIGN UP</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-form__input"
            type="text"
            name="username"
            id="username"
            placeholder="USERNAME"
            value={username}
            onChange={handleChange(setUsername)}
          />
          <input
            className="auth-form__input"
            type="email"
            name="email"
            id="email"
            placeholder="EMAIL"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <input
            className="auth-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="PASSWORD"
            value={password}
            onChange={handleChange(setPassword)}
          />

          <button className="auth-btn">Sign up</button>
        </form>
        <div className="auth-switch">
          <p className="auth-switch__text">Already have an account? </p>
          <Link className="auth-link" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
