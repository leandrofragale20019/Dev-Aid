import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/global.css";
import "../styles/Home.css";

function Home() {
  return (
    <div className="container">
      <Header />

      <section className="hero">
        <h1>Your Dev-Tools.</h1>
        <p>Open source toolbox for programming</p>
      </section>

      <section className="tools-section">
        <h2 className="section-title">Tool-Overview</h2>
        <div className="tools-list">
          <Link to="/tool1" className="tool-item">
            <div className="tool-header">
              <span className="tool-name">JSON formatter</span>
              <span className="tool-tag">Formatter</span>
            </div>
            <p className="tool-description">
              Problems with reading JSON ?
            </p>
          </Link>

          <Link to="/tool2" className="tool-item">
            <div className="tool-header">
              <span className="tool-name">Tool 2</span>
              <span className="tool-tag">Design</span>
            </div>
            <p className="tool-description">
              Beschreibung des zweiten Tools
            </p>
          </Link>

          <Link to="/tool3" className="tool-item">
            <div className="tool-header">
              <span className="tool-name">Tool 3</span>
              <span className="tool-tag">Converter</span>
            </div>
            <p className="tool-description">
              Beschreibung des dritten Tools
            </p>
          </Link>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <div className="stat-number">03</div>
          <div className="stat-label">Tools available</div>
        </div>
        <div className="stat">
          <div className="stat-number">00</div>
          <div className="stat-label">
          Registrations required</div>
        </div>
        <div className="stat">
          <div className="stat-number">∞</div>
          <div className="stat-label">for ever free</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
