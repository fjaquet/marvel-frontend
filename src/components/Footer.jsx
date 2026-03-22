import "../styles/components/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container container">
        <p className="footer__text">
          Made with{" "}
          <a
            className="footer__link"
            href="https://fr.reactjs.org/"
            target="_blank"
          >
            React
          </a>{" "}
          by{" "}
          <a
            className="footer__link"
            href="https://github.com/fjaquet"
            target="_blank"
          >
            fjaquet
          </a>
          .
        </p>
        <p className="footer__text">
          This project was created as part of the{" "}
          <a
            className="footer__link"
            href="https://www.lereacteur.io/"
            target="_blank"
          >
            Le Reacteur
          </a>{" "}
          training program.
        </p>
        <p className="footer__text">
          It is intended for learning purposes only, has no commercial purpose,
          and is not affiliated with Marvel.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
