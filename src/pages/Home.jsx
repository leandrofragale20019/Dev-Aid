import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="container">
      <Header />

      <section className="hero">
        <h1>Your Dev-Tools.</h1>
        <p>Open source toolbox for programming</p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Tool-Overview</h2>
        <div className="content-list">
          <Link to="/jsonFormatter" className="content-item">
            <div className="content-item-header">
              <span className="content-item-title">JSON formatter</span>
              <span className="content-item-tag">Formatter</span>
            </div>
            <p className="content-item-desc">Problems with reading JSON ?</p>
          </Link>

          <Link to="/colorPicker" className="content-item">
            <div className="content-item-header">
              <span className="content-item-title">Color Picker</span>
              <span className="content-item-tag">Design</span>
            </div>
            <p className="content-item-desc">
              Problems finding the right color ?
            </p>
          </Link>

          <Link to="/tool3" className="content-item">
            <div className="content-item-header">
              <span className="content-item-title">Tool 3</span>
              <span className="content-item-tag">Converter</span>
            </div>
            <p className="content-item-desc">Beschreibung des dritten Tools</p>
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
          <div className="stat-label">Registrations required</div>
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
