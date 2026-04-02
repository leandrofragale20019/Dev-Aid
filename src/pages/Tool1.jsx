import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/Tool1.css';

const Tool1 = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    setError('');
    setOutput('');
    
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e) {
      setError('Invalid JSON format: ' + e.message);
    }
  };

  const minifyJSON = () => {
    setError('');
    setOutput('');
    
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e) {
      setError('Invalid JSON format: ' + e.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  return (
   
    <div className="json-formatter-container">
       <Header/>
      <div className="header-section">
        <h1>JSON Formatter</h1>
        <p>Format and validate JSON data quickly and easily.</p>
      </div>

      <div className="grid-layout">
        {/* Input Bereich */}
        <div className="card">
          <div className="card-header">
            <h3>input</h3>
          </div>
          <div className="card-content">
            <textarea
              placeholder='{"name": "example", "value": 123}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="json-textarea"
            />
            <div className="button-group">
              <button onClick={formatJSON} className="btn btn-primary">
              Format
              </button>
              <button onClick={minifyJSON} className="btn btn-secondary">
              Minimize
              </button>
              <button onClick={clearAll} className="btn btn-outline">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Output Bereich */}
        <div className="card">
          <div className="card-header">
            <h3>output</h3>
            {output && (
              <div className="action-buttons">
                <button onClick={copyToClipboard} className="btn btn-ghost">
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
                <button onClick={downloadJSON} className="btn btn-ghost">
                  Download
                </button>
              </div>
            )}
          </div>
          <div className="card-content">
            {error ? (
              <div className="alert alert-error">
                <span className="alert-icon">⚠</span>
                <span>{error}</span>
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                className="json-textarea output-textarea"
                placeholder="Formated JSON appeares here ...."
              />
            )}
          </div>
        </div>
      </div>

      {/* Info Bereich */}
      <div className="card info-card">
        <div className="card-header">
          <h3>functions</h3>
        </div>
        <div className="card-content">
          <ul className="info-list">
            <li>
              <strong>Format:</strong> Makes JSON readable with indentation
            </li>
            <li>
              <strong>Minimize:</strong> Removes all spaces for compact display
            </li>
            <li>
              <strong>Copy:</strong> Copies the formatted JSON to the clipboard
            </li>
            <li>
              <strong>Download:</strong> Downloads the JSON as a file
            </li>
          </ul>
        </div>
      </div>
       <Footer />
    </div>
   
  );
};

export default Tool1;
