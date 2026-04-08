import '../styles/components/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>© Dev-Aid {currentYear} — open source</div>
      <div className="footer-links">
        <a href="https://github.com/Dev-Aid-Team/Dev-Aid">GitHub</a>
        <a href="https://github.com/Dev-Aid-Team/Dev-Aid/discussions/1">
          Feedback
        </a>
        <a href="#v1">V1.0.1</a>
      </div>
    </footer>
  );
}

export default Footer;
