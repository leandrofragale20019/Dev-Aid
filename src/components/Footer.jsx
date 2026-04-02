import "../styles/Footer.css";

function Footer() {
const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>© Dev-Aid {currentYear} — open source</div>
      <div className="footer-links">
        <a href="https://github.com/leandrofragale20019/Dev-Aid">GitHub</a>
        <a href="https://github.com/leandrofragale20019/Dev-Aid/discussions">Feedback</a>
        <a href="#v1">V1.0.0</a>
      </div>
    </footer>
  );
}

export default Footer;
