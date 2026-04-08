import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div className="container">
      <Header />

      <section className="hero">
        <h1>About dev-aid</h1>
        <p>
          We are Leandro and Damian, two aspiring computer scientists from
          Switzerland. What started as a shared passion for coding has evolved
          into dev-aid: our platform for open-source tools designed to make your
          work just a little bit easier.
        </p>
      </section>

      <section className="content-section">
        <h2 className="section-title">Our Mission</h2>
        <div className="content-list">
          <div className="content-item">
            <div className="content-item-header">
              <span className="content-item-title">Developer First</span>
              <span className="content-item-tag">Focus</span>
            </div>
            <p className="content-item-desc">
              We build tools by developers, for developers.
            </p>
          </div>

          <div className="content-item">
            <div className="content-item-header">
              <span className="content-item-title">Open Source</span>
              <span className="content-item-tag">Community</span>
            </div>
            <p className="content-item-desc">
              We believe in sharing knowledge and the power of the community.
            </p>
          </div>

          <div className="content-item">
            <div className="content-item-header">
              <span className="content-item-title">Efficiency</span>
              <span className="content-item-tag">Solutions</span>
            </div>
            <p className="content-item-desc">
              Turning complex workflows into elegant and simple solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">The Team</h2>
        <div className="stats">
          <div className="stat">
            <div className="stat-content">Leandro</div>
            <div className="stat-label">Software Engineer</div>
          </div>
          <div className="stat">
            <div className="stat-content">Damian</div>
            <div className="stat-label">Software Engineer</div>
          </div>
          <div className="stat">
            <div className="stat-content">CH</div>
            <div className="stat-label">Based in Switzerland</div>
          </div>
        </div>
      </section>

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
