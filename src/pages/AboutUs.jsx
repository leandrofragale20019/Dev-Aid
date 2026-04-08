import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/global.css";
import "../styles/Home.css";

function AboutUs() {
  return (
    <div className="container">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1>About dev-aid</h1>
        <p>
          We are Leandro and Damian, two aspiring computer scientists from
          Switzerland. What started as a shared passion for coding has evolved
          into dev-aid: our platform for open-source tools designed to make your
          work just a little bit easier.
        </p>
      </section>

      {/* Team Section */}
      <section className="tools-section">
        <h2 className="section-title">The Team</h2>
        <div className="stats">
          <div className="stat">
            <div className="stat-number">Leandro</div>
            <div className="stat-label">Software Engineer</div>
          </div>
          <div className="stat">
            <div className="stat-number">Damian</div>
            <div className="stat-label">Software Engineer</div>
          </div>
          <div className="stat">
            <div className="stat-number">CH</div>
            <div className="stat-label">Based in Switzerland</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="tools-section">
        <h2 className="section-title">Our Mission</h2>
        <div className="tools-list">
          <div className="tool-item">
            <div className="tool-header">
              <span className="tool-name">Developer First</span>
              <span className="tool-tag">Focus</span>
            </div>
            <p className="tool-description">
              We build tools by developers, for developers.
            </p>
          </div>

          <div className="tool-item">
            <div className="tool-header">
              <span className="tool-name">Open Source</span>
              <span className="tool-tag">Community</span>
            </div>
            <p className="tool-description">
              We believe in sharing knowledge and the power of the community.
            </p>
          </div>

          <div className="tool-item">
            <div className="tool-header">
              <span className="tool-name">Efficiency</span>
              <span className="tool-tag">Solutions</span>
            </div>
            <p className="tool-description">
              Turning complex workflows into elegant and simple solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section
        className="hero"
        style={{ marginTop: "var(--spacing-xl)", textAlign: "center" }}
      >
        <p>
          We are currently heads-down building our first major public tool. Stay
          tuned!
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
