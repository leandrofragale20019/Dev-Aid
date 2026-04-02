import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Tool-Übersicht</h1>
      <div className="tool-grid">
        <Link to="/tool1" className="tool-card">
          <div className="tool-icon"></div>
          <h3>Tool 1</h3>
          <p>Beschreibung des ersten Tools</p>
        </Link>

        <Link to="/tool2" className="tool-card">
          <div className="tool-icon"></div>
          <h3>Tool 2</h3>
          <p>Beschreibung des zweiten Tools</p>
        </Link>

        <Link to="/tool3" className="tool-card">
          <div className="tool-icon"></div>
          <h3>Tool 3</h3>
          <p>Beschreibung des dritten Tools</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
