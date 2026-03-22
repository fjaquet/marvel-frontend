import "../styles/components/loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-box">
        <span className="loader-text">LOADING</span>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
