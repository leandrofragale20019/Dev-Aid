import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/tools/ColorPicker.css';

// Helper: pick color from image canvas
const getColorAtPixel = (canvas, x, y) => {
  const ctx = canvas.getContext("2d");
  const p = ctx.getImageData(x, y, 1, 1).data;
  return { r: p[0], g: p[1], b: p[2] };
};

const ColorPicker = () => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState({ h: 210, s: 80, l: 60 });
  const [hexColor, setHexColor] = useState("#4a9eff");
  const [rgbColor, setRgbColor] = useState({ r: 74, g: 158, b: 255 });
  const [copied, setCopied] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectorPos, setSelectorPos] = useState({ x: 0, y: 0 });
  const [colorHistory, setColorHistory] = useState([]);
  const [brightness, setBrightness] = useState(60);

  const WHEEL_SIZE = 280;
  const RADIUS = WHEEL_SIZE / 2;
  const INNER_RADIUS = 60;

  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    };
  };

  const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = RADIUS;
    const cy = RADIUS;

    ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);

    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = ((angle - 1) * Math.PI) / 180;
      const endAngle = ((angle + 1) * Math.PI) / 180;

      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        INNER_RADIUS,
        cx,
        cy,
        RADIUS
      );
      gradient.addColorStop(0, `hsla(${angle}, 0%, ${brightness}%, 1)`);
      gradient.addColorStop(
        1,
        `hsla(${angle}, 100%, ${brightness / 2 + 20}%, 1)`
      );

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, RADIUS - 2, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cx, cy, INNER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    ctx.beginPath();
    ctx.arc(cx, cy, INNER_RADIUS - 2, 0, Math.PI * 2);
    ctx.fillStyle = hexColor;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(selectorPos.x, selectorPos.y, 10, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(selectorPos.x, selectorPos.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = hexColor;
    ctx.fill();
  }, [hexColor, selectorPos, brightness, RADIUS, WHEEL_SIZE, INNER_RADIUS]);

  const updateColorFromAngleDistance = useCallback(
    (angle, distance) => {
      const clampedDist = Math.min(Math.max(distance, 0), 1);
      const h = ((angle * 180) / Math.PI + 360) % 360;
      const s = clampedDist * 100;
      const l = brightness;

      const rgb = hslToRgb(h, s, l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setSelectedColor({ h, s, l });
      setRgbColor(rgb);
      setHexColor(hex);
    },
    [brightness]
  );

  const getPolarFromEvent = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - RADIUS;
    const y = clientY - rect.top - RADIUS;
    const distance = Math.sqrt(x * x + y * y) / (RADIUS - 2);
    const angle = Math.atan2(y, x);
    return { x: clientX - rect.left, y: clientY - rect.top, angle, distance };
  };

  const handleCanvasInteraction = useCallback(
    (e) => {
      e.preventDefault();
      const { x, y, angle, distance } = getPolarFromEvent(e);
      if (distance <= 1 && distance >= INNER_RADIUS / RADIUS) {
        setSelectorPos({ x, y });
        updateColorFromAngleDistance(angle, distance);
      }
    },
    [updateColorFromAngleDistance, INNER_RADIUS, RADIUS]
  );

  useEffect(() => {
    const angle = (selectedColor.h * Math.PI) / 180;
    const dist = (selectedColor.s / 100) * (RADIUS - 2);
    const x = RADIUS + Math.cos(angle) * dist;
    const y = RADIUS + Math.sin(angle) * dist;
    setSelectorPos({ x, y });
  }, []);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  useEffect(() => {
    const rgb = hslToRgb(selectedColor.h, selectedColor.s, brightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setRgbColor(rgb);
    setHexColor(hex);
  }, [brightness, selectedColor.h, selectedColor.s]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleCanvasInteraction(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleCanvasInteraction(e);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const randomColor = () => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 60) + 40;
    const l = Math.floor(Math.random() * 30) + 40;
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    setSelectedColor({ h, s, l });
    setBrightness(l);
    setRgbColor(rgb);
    setHexColor(hex);

    const angle = (h * Math.PI) / 180;
    const dist = (s / 100) * (RADIUS - 2);
    const x = RADIUS + Math.cos(angle) * dist;
    const y = RADIUS + Math.sin(angle) * dist;
    setSelectorPos({ x, y });
  };

  const addToHistory = () => {
    if (!colorHistory.includes(hexColor)) {
      setColorHistory((prev) => [hexColor, ...prev].slice(0, 10));
    }
  };

  const loadFromHex = (e) => {
    const val = e.target.value;
    setHexColor(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      const rgb = hexToRgb(val);
      if (rgb) setRgbColor(rgb);
    }
  };

  const clearHistory = () => setColorHistory([]);

  const selectFromHistory = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    setHexColor(hex);
    setRgbColor(rgb);
  };

  // ─── Image Eyedropper ────────────────────────────────────────────────────────
  const imageCanvasRef = useRef(null);
  const magnifierCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imagePickedColor, setImagePickedColor] = useState(null);
  const [eyedropperActive, setEyedropperActive] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const MAGNIFIER_SIZE = 120;
  const MAGNIFIER_ZOOM = 5;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // 1. Zuerst den Status setzen!
        // Das sorgt dafür, dass React das <canvas> Element im DOM rendert.
        setImageLoaded(true);
        setImagePickedColor(null);
        setEyedropperActive(false);

        // 2. Ein minimaler Timeout (0ms) verschiebt das Zeichnen in den nächsten "Event Loop".
        // Bis dahin hat React das Canvas-Element tatsächlich erstellt.
        setTimeout(() => {
          const canvas = imageCanvasRef.current;
          if (!canvas) return; // Sicherheitscheck

          const ctx = canvas.getContext("2d");
          const maxW = 600,
            maxH = 340;
          let w = img.width,
            h = img.height;

          if (w > maxW) {
            h = (h * maxW) / w;
            w = maxW;
          }
          if (h > maxH) {
            w = (w * maxH) / h;
            h = maxH;
          }

          canvas.width = Math.round(w);
          canvas.height = Math.round(h);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }, 0);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const drawMagnifier = (canvas, x, y) => {
    const magCanvas = magnifierCanvasRef.current;
    if (!magCanvas) return;
    const magCtx = magCanvas.getContext("2d");
    const half = MAGNIFIER_SIZE / 2;
    const srcSize = MAGNIFIER_SIZE / MAGNIFIER_ZOOM;

    magCtx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);

    // Clip to circle
    magCtx.save();
    magCtx.beginPath();
    magCtx.arc(half, half, half - 2, 0, Math.PI * 2);
    magCtx.clip();

    magCtx.imageSmoothingEnabled = false;
    magCtx.drawImage(
      canvas,
      x - srcSize / 2,
      y - srcSize / 2,
      srcSize,
      srcSize,
      0,
      0,
      MAGNIFIER_SIZE,
      MAGNIFIER_SIZE
    );

    // Grid crosshair
    magCtx.strokeStyle = "rgba(255,255,255,0.6)";
    magCtx.lineWidth = 1;
    magCtx.beginPath();
    magCtx.moveTo(half, 0);
    magCtx.lineTo(half, MAGNIFIER_SIZE);
    magCtx.moveTo(0, half);
    magCtx.lineTo(MAGNIFIER_SIZE, half);
    magCtx.stroke();

    magCtx.restore();

    // Border
    magCtx.beginPath();
    magCtx.arc(half, half, half - 1, 0, Math.PI * 2);
    magCtx.strokeStyle = "rgba(255,255,255,0.85)";
    magCtx.lineWidth = 3;
    magCtx.stroke();
  };

  const getCanvasCoords = (e) => {
    const canvas = imageCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.floor((e.clientX - rect.left) * scaleX),
      y: Math.floor((e.clientY - rect.top) * scaleY),
      clientX: e.clientX,
      clientY: e.clientY,
    };
  };

  const handleImageMouseMove = (e) => {
    if (!eyedropperActive || !imageLoaded) return;
    const { x, y, clientX, clientY } = getCanvasCoords(e);
    const canvas = imageCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    setMagnifierPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setShowMagnifier(true);
    drawMagnifier(canvas, x, y);

    // Live preview the hovered color
    const rgb = getColorAtPixel(canvas, x, y);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setImagePickedColor({ rgb, hex });
  };

  const handleImageClick = (e) => {
    if (!eyedropperActive || !imageLoaded) return;
    const { x, y } = getCanvasCoords(e);
    const canvas = imageCanvasRef.current;
    const rgb = getColorAtPixel(canvas, x, y);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setImagePickedColor({ rgb, hex });
    setHexColor(hex);
    setRgbColor(rgb);
    setEyedropperActive(false);
    setShowMagnifier(false);
  };

  const handleImageMouseLeave = () => {
    setShowMagnifier(false);
  };

  const luminance =
    (rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114) / 255;
  const textOnColor = luminance > 0.55 ? "#000000" : "#ffffff";

  const imgPickedLum = imagePickedColor
    ? (imagePickedColor.rgb.r * 0.299 +
        imagePickedColor.rgb.g * 0.587 +
        imagePickedColor.rgb.b * 0.114) /
      255
    : 1;
  const textOnPicked = imgPickedLum > 0.55 ? "#000000" : "#ffffff";

  return (
    <div className="color-picker-container">
      <Header />

      <div className="header-section">
        <h1>Color Picker</h1>
        <p>Pick, explore and export colors with ease.</p>
      </div>

      <div className="picker-layout">
        {/* Wheel + Preview */}
        <div className="card wheel-card">
          <div className="card-header">
            <h3>Color Wheel</h3>
          </div>
          <div className="card-content wheel-content">
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={WHEEL_SIZE}
                height={WHEEL_SIZE}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onTouchStart={handleCanvasInteraction}
                onTouchMove={handleCanvasInteraction}
                className="color-canvas"
                style={{ cursor: isDragging ? "crosshair" : "pointer" }}
              />
            </div>

            <div className="brightness-row">
              <span className="slider-label">Brightness</span>
              <input
                type="range"
                min="10"
                max="90"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="brightness-slider"
                style={{ "--thumb-color": hexColor }}
              />
              <span className="slider-value">{brightness}%</span>
            </div>
          </div>
        </div>

        {/* Color Info */}
        <div className="card info-card-right">
          <div className="card-header">
            <h3>Color Values</h3>
          </div>
          <div className="card-content">
            <div
              className="color-preview-box"
              style={{ backgroundColor: hexColor, color: textOnColor }}
            >
              <span className="preview-label">{hexColor.toUpperCase()}</span>
            </div>

            <div className="color-codes">
              <div className="color-code-row">
                <span className="code-label">HEX</span>
                <input
                  className="code-input"
                  value={hexColor}
                  onChange={loadFromHex}
                  maxLength={7}
                  spellCheck={false}
                />
                <button
                  className={`btn btn-ghost copy-btn ${
                    copied === "HEX" ? "copied" : ""
                  }`}
                  onClick={() => copyToClipboard(hexColor, "HEX")}
                >
                  {copied === "HEX" ? "✓" : "Copy"}
                </button>
              </div>

              <div className="color-code-row">
                <span className="code-label">RGB</span>
                <span className="code-value">{`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`}</span>
                <button
                  className={`btn btn-ghost copy-btn ${
                    copied === "RGB" ? "copied" : ""
                  }`}
                  onClick={() =>
                    copyToClipboard(
                      `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`,
                      "RGB"
                    )
                  }
                >
                  {copied === "RGB" ? "✓" : "Copy"}
                </button>
              </div>

              <div className="color-code-row">
                <span className="code-label">HSL</span>
                <span className="code-value">{`hsl(${Math.round(
                  selectedColor.h
                )}, ${Math.round(selectedColor.s)}%, ${brightness}%)`}</span>
                <button
                  className={`btn btn-ghost copy-btn ${
                    copied === "HSL" ? "copied" : ""
                  }`}
                  onClick={() =>
                    copyToClipboard(
                      `hsl(${Math.round(selectedColor.h)}, ${Math.round(
                        selectedColor.s
                      )}%, ${brightness}%)`,
                      "HSL"
                    )
                  }
                >
                  {copied === "HSL" ? "✓" : "Copy"}
                </button>
              </div>
            </div>

            <div className="action-row">
              <button onClick={randomColor} className="btn btn-primary">
                Random
              </button>
              <button onClick={addToHistory} className="btn btn-secondary">
                Save Color
              </button>
              <button onClick={clearHistory} className="btn btn-outline">
                Clear History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Image Eyedropper Card ─────────────────────────────────────────── */}
      <div className="card image-picker-card">
        <div className="card-header">
          <h3>Image Eyedropper</h3>
          <span className="card-subtitle">
            Upload an image and pick any color directly from it
          </span>
        </div>
        <div className="card-content">
          {/* Upload area */}
          {!imageLoaded ? (
            <div
              className="image-drop-zone"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  const fakeEvent = { target: { files: [file] } };
                  handleImageUpload(fakeEvent);
                }
              }}
            >
              <div className="drop-zone-icon">🖼️</div>
              <p className="drop-zone-text">Click or drag an image here</p>
              <p className="drop-zone-hint">PNG, JPG, WEBP, GIF …</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="image-picker-layout">
              {/* Canvas wrapper with magnifier */}
              <div
                className="image-canvas-wrapper"
                style={{ position: "relative", display: "inline-block" }}
              >
                <canvas
                  ref={imageCanvasRef}
                  className="image-canvas"
                  style={{
                    cursor: eyedropperActive ? "none" : "default",
                    borderRadius: "8px",
                    display: "block",
                    maxWidth: "100%",
                  }}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  onClick={handleImageClick}
                />

                {/* Magnifier lens */}
                {eyedropperActive && showMagnifier && (
                  <div
                    style={{
                      position: "absolute",
                      left: magnifierPos.x + 16,
                      top: magnifierPos.y - MAGNIFIER_SIZE / 2,
                      pointerEvents: "none",
                      zIndex: 10,
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
                    }}
                  >
                    <canvas
                      ref={magnifierCanvasRef}
                      width={MAGNIFIER_SIZE}
                      height={MAGNIFIER_SIZE}
                    />
                    {/* Color label below magnifier */}
                    {imagePickedColor && (
                      <div
                        style={{
                          marginTop: 4,
                          background: imagePickedColor.hex,
                          color: textOnPicked,
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontSize: 12,
                          fontFamily: "monospace",
                          textAlign: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                        }}
                      >
                        {imagePickedColor.hex.toUpperCase()}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Controls beside canvas */}
              <div className="image-picker-controls">
                <button
                  className={`btn ${
                    eyedropperActive ? "btn-primary" : "btn-secondary"
                  } eyedropper-btn`}
                  onClick={() => {
                    setEyedropperActive((v) => !v);
                    setShowMagnifier(false);
                  }}
                  title="Pipette aktivieren"
                >
                  <span style={{ fontSize: 18 }}>🔬</span>
                  {eyedropperActive
                    ? "Pipette aktiv – klicken zum Aufnehmen"
                    : "Pipette aktivieren"}
                </button>

                {imagePickedColor && (
                  <div className="picked-color-preview">
                    <div
                      className="picked-swatch"
                      style={{ backgroundColor: imagePickedColor.hex }}
                    />
                    <div className="picked-color-info">
                      <span className="picked-hex">
                        {imagePickedColor.hex.toUpperCase()}
                      </span>
                      <span className="picked-rgb">
                        rgb({imagePickedColor.rgb.r}, {imagePickedColor.rgb.g},{" "}
                        {imagePickedColor.rgb.b})
                      </span>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setHexColor(imagePickedColor.hex);
                        setRgbColor(imagePickedColor.rgb);
                        addToHistory();
                      }}
                    >
                      Übernehmen &amp; Speichern
                    </button>
                  </div>
                )}

                <button
                  className="btn btn-outline"
                  style={{ marginTop: "auto" }}
                  onClick={() => {
                    setImageLoaded(false);
                    setImagePickedColor(null);
                    setEyedropperActive(false);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Anderes Bild laden
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {colorHistory.length > 0 && (
        <div className="card history-card">
          <div className="card-header">
            <h3>Saved Colors</h3>
            <span className="history-count">{colorHistory.length} / 10</span>
          </div>
          <div className="card-content">
            <div className="history-swatches">
              {colorHistory.map((hex, i) => (
                <button
                  key={i}
                  className="swatch"
                  style={{ backgroundColor: hex }}
                  onClick={() => selectFromHistory(hex)}
                  title={hex}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="card info-bottom-card">
        <div className="card-header">
          <h3>functions</h3>
        </div>
        <div className="card-content">
          <ul className="info-list">
            <li>
              <strong>Color Wheel:</strong> Click or drag to select any color
              interactively
            </li>
            <li>
              <strong>Brightness:</strong> Adjust the lightness of the selected
              color
            </li>
            <li>
              <strong>Copy:</strong> Copy HEX, RGB, or HSL values to clipboard
            </li>
            <li>
              <strong>Random:</strong> Generate a random vibrant color instantly
            </li>
            <li>
              <strong>Save Color:</strong> Add the current color to your history
            </li>
            <li>
              <strong>Image Eyedropper:</strong> Upload any image, activate the
              pipette and click on any pixel to extract its exact color
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ColorPicker;
