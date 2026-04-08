import React, { useState, useMemo, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/tools/RegexTesterValidater.css';

const RegexTester = () => {
  const [regex, setRegex] = useState("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState(
    "Testen Sie hier: support@example.com oder dev-team@code.org"
  );

  const textAreaRef = useRef(null);
  const highlightRef = useRef(null);

  const syncScroll = () => {
    if (textAreaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textAreaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  };

  const toggleFlag = (f) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  const { matches, error } = useMemo(() => {
    if (!regex) return { matches: [], error: "" };
    try {
      const re = new RegExp(regex, flags);
      const m = [];
      if (flags.includes("g")) {
        re.lastIndex = 0;
        let match;
        while ((match = re.exec(testText)) !== null) {
          m.push({ text: match[0], index: match.index });
          if (match.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const match = testText.match(re);
        if (match) m.push({ text: match[0], index: match.index });
      }
      return { matches: m, error: "" };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [regex, flags, testText]);

  const renderHighlights = () => {
    let result = [];
    let lastIndex = 0;
    matches.forEach((m, i) => {
      result.push(testText.slice(lastIndex, m.index));
      result.push(
        <mark key={i} className="regex-marker">
          {m.text}
        </mark>
      );
      lastIndex = m.index + m.text.length;
    });
    result.push(testText.slice(lastIndex));
    return result;
  };

  return (
  <div className="regex-tester-container">
    <Header />

    <div className="header-section">
      <h1>Regex Visualizer</h1>
      <p>Test and debug your regular expressions with real-time highlighting.</p>
    </div>

    <div className="regex-tester-layout">
      <div className="card">
        <div className="card-header">
          <h3>Pattern & Flags</h3>
        </div>
        <div className="card-content">
          <div className="regex-input-row">
            <span className="slash">/</span>
            <input
              className="regex-main-input"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              spellCheck="false"
              placeholder="Insert regex pattern..."
            />
            <span className="slash">/</span>
            <span className="flag-text">{flags}</span>
          </div>

          <div className="flag-buttons">
            {["g", "i", "m"].map((f) => (
              <button
                key={f}
                onClick={() => toggleFlag(f)}
                className={`btn-flag ${flags.includes(f) ? "active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
          {error && (
            <div className="alert alert-error" style={{ marginTop: "15px" }}>
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Test String</h3>
          <span className="badge">{matches.length} Matches</span>
        </div>
        <div className="card-content">
          <div className="editor-wrapper">
            <textarea
              ref={textAreaRef}
              className="editor-textarea"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              onScroll={syncScroll}
              spellCheck="false"
              placeholder="Insert test text here..."
            />
            <div ref={highlightRef} className="editor-highlights">
              {renderHighlights()}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Functions</h3>
        </div>
        <div className="card-content">
          <ul className="info-list">
            <li><strong>Global (g):</strong> Highlights all matches in the text.</li>
            <li><strong>Case-insensitive (i):</strong> Ignores capital letters.</li>
            <li><strong>Multiline (m):</strong> Anchors (^, $) work per line.</li>
          </ul>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);
};

export default RegexTester;
