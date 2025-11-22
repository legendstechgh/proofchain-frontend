import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import QRCode from "qrcode";


function App() {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const inputRef = useRef();
  const [history, setHistory] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem("proof_history") || "[]");
    setHistory(savedHistory);
    
    // Simulate loading delay
    setTimeout(() => setHistoryLoading(false), 700);
  }, []);

  // File icon function
  const getFileIcon = (file) => {
    if (!file) return "📁";
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type.startsWith("video/")) return "🎥";
    if (file.type.includes("pdf")) return "📄";
    return "📁";
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const downloadCertificate = async (hash, qr) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#0A192F";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#24FF8A";
    ctx.font = "bold 38px Poppins";
    ctx.fillText("ProofChain Verification Certificate", 50, 80);

    // Hash
    ctx.fillStyle = "#fff";
    ctx.font = "18px Poppins";
    ctx.fillText("Document Hash:", 50, 160);
    ctx.fillText(hash, 50, 190);

    // QR Code
    const qrImg = new Image();
    qrImg.src = qr;
    await new Promise((res) => (qrImg.onload = res));
    ctx.drawImage(qrImg, 50, 250, 260, 260);

    // Footer
    ctx.fillStyle = "#24FF8A";
    ctx.font = "18px Poppins";
    ctx.fillText("Verified on Sui Blockchain • ProofChain", 50, 560);

    const link = document.createElement("a");
    link.download = "ProofChain-Certificate.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleFileSelect = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
  };

  const handleInputChange = (e) => {
    const f = e.target.files?.[0];
    handleFileSelect(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    handleFileSelect(f);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://proofchain-backend.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      const data = await res.json();
      setResult(data);

      // 🎉 Confetti on success
      if (data.hash && data.is_fake !== undefined) {
        confetti({
          particleCount: 150,
          spread: 70,
          startVelocity: 35,
          origin: { y: 0.65 }
        });
      }


      // 📌 Generate QR code for the Sui Explorer link
      if (data.sui?.explorer) {
        const qr = await QRCode.toDataURL(data.sui.explorer, {
          errorCorrectionLevel: "H",
          margin: 1,
          width: 400
        });
        setQrCode(qr);
        setShowModal(true);
      }




      // 📝 Store last 5 verified items locally
      const newItem = {
      name: file.name,
      hash: data.hash,
      fake: data.is_fake,
      explorer: data.sui?.explorer || null,
      qr: data.sui?.explorer 
            ? await QRCode.toDataURL(data.sui.explorer)
            : null,
      time: new Date().toISOString()
      };


      const updated = [newItem, ...history].slice(0, 5);
      setHistory(updated);
      localStorage.setItem("proof_history", JSON.stringify(updated));

    } catch (error) {
      console.error("Upload error:", error);
      setResult({
        error: true,
        message: error.message || "Failed to analyze file"
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="app-container">
      {/* Theme toggle */}
      <div className="theme-toggle">
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label="Toggle theme"
          className="theme-button"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Header */}
      <header className="header">
        <img src="/proofchain-logo.png" alt="ProofChain Logo" className="logo" />
        <h1 className="title">
          <span className="proof-text">Proof</span>
          <span className="chain-text">Chain</span>
        </h1>
        <p className="tagline">Trust Made Transparent.</p>
      </header>

      {/* Main card */}
      <main className="card-container" role="main">
        {/* Upload area */}
        <div
          className={`upload-area ${dragOver ? "drag-over" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          {!file ? (
            <div className="upload-placeholder">
              <div className="upload-visual">
                <div className="upload-arrow">⬆️</div>
              </div>

              <div className="upload-texts">
                <div className="upload-title">Upload Photo</div>
                <div className="upload-subtitle">Drag & drop an image or click to browse</div>
              </div>

              <div className="upload-actions">
                <button
                  className="btn-outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current && inputRef.current.click();
                  }}
                >
                  Browse Files
                </button>

                <button
                  className="btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current && inputRef.current.click();
                  }}
                >
                  Use Camera
                </button>
              </div>
            </div>
          ) : (
            <div className="file-selected">
              <div className="file-meta">
                <div className="file-thumb">
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" />
                  ) : (
                    <div className="file-fallback">{getFileIcon(file)}</div>
                  )}
                </div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <div className="file-status">File ready for analysis ✓</div>
                </div>
              </div>

              <div className="file-controls">
                <button className="btn-link" onClick={(e) => { e.stopPropagation(); clearFile(); }}>
                  Remove
                </button>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*,application/pdf"
            hidden
            onChange={handleInputChange}
          />
        </div>

        {/* Analyze button + loader */}
        <div className="controls-row">
          <button
            onClick={handleUpload}
            className={`analyze-btn ${(!file || loading) ? "disabled" : ""}`}
            disabled={!file || loading}
          >
            {loading ? (
              <span className="loading-wrap">
                <span className="spinner" aria-hidden></span>
                <span>Analyzing...</span>
              </span>
            ) : (
              "Analyze Media"
            )}
          </button>
        </div>

        {/* Result area */}
        <div className="result-area">
          {result && result.error && (
            <div className="result-card error">
              <strong>Error:</strong> {result.message || "Unknown error"}
            </div>
          )}

          {result && !result.error && (
            <div className="result-card success">
              <p><strong>Hash:</strong> <code className="hash">{result.hash}</code></p>
              <p><strong>Fake?:</strong> {result.is_fake ? "Yes" : "No"}</p>
              <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
              <p className="msg">{result.message}</p>

              {result?.sui?.success && (
                <div className="onchain">
                  <div><strong>On-chain TX:</strong> <code className="break-all">{result.sui.txDigest}</code></div>
                  <a href={result.sui.explorer} target="_blank" rel="noreferrer" className="link">
                    View on Sui Explorer
                  </a>
                </div>
              )}

              {result?.sui?.error && (
                <div className="onchain error">
                  Chain write error: {result.sui.error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* History section with skeleton loading */}
        {historyLoading ? (
          <div className="history-card">
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
          </div>
        ) : history.length > 0 ? (
          <div className="history-card">
            <h3 className="history-title">Recent Verifications</h3>
            <ul className="history-list">
              {history.map((item, i) => (
                <li key={i} className="history-item">
                  <div>
                    <strong>{item.name}</strong>
                    <div className="hist-hash">{item.hash}</div>
                    <div className="hist-time">{new Date(item.time).toLocaleString()}</div>
                  </div>

                  {item.qr && (
                    <img
                      src={item.qr}
                      alt="QR Code"
                      className="qr-thumb"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </main>

      {/* Success Modal */}
      {showModal && result && !result.error && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-check">
              ✓
            </div>

            <h2 className="modal-title">Verified & Stored on Sui</h2>

            <p className="modal-hash">
              <strong>Hash:</strong> {result.hash}
            </p>

            {qrCode && (
              <img src={qrCode} alt="QR Code" className="modal-qr" />
            )}

            <a href={result.sui.explorer} target="_blank" rel="noreferrer" className="modal-link">
              View on Sui Explorer
            </a>

            <button
              className="modal-btn"
              onClick={() => downloadCertificate(result.hash, qrCode)}
            >
              Download Certificate
            </button>

            <button className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        © 2025 ProofChain • Legends Tech
      </footer>
    </div>
  );
}

export default App;