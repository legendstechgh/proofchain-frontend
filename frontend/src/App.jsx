import React, { useState, useEffect } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleUpload = async () => {
    if (!file) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await fetch("https://proofchain-backend.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed — check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#07112a] via-[#071a36] to-[#000814]">
      {/* top-right theme toggle */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/30 backdrop-blur-sm border border-white/5 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* header */}
        <header className="text-center mb-6">
          <img src="/proofchain-logo.png" alt="ProofChain" className="mx-auto w-36 h-auto" />
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight font-orbitron">
            <span className="text-[#00A4FF]">Proof</span>
            <span className="text-[#24FF8A]">Chain</span>
          </h1>
          <p className="mt-1 text-sm text-slate-300">Trust Made Transparent.</p>
        </header>

        {/* card */}
        <main className="bg-white/3 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-lg animate-fade-in">
          <div className="flex flex-col gap-4">
            {/* custom file picker */}
            <label
              htmlFor="file"
              className="cursor-pointer flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-[#004BFF] to-[#00E676] text-white font-semibold shadow-md hover:scale-[1.02] transition-transform"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3v10" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7l4-4 4 4" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="13" width="18" height="8" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" />
              </svg>
              <span>Browse File</span>
              <input
                id="file"
                type="file"
                accept="image/*,video/*"
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {/* file name */}
            {file && (
              <div className="text-sm text-slate-200/90 px-3">
                Selected: <span className="font-medium">{file.name}</span>
              </div>
            )}

            {/* analyze button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#0a84ff] to-[#24ff8a] text-slate-900 font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze Media"}
            </button>

            {/* result */}
            {result && (
              <div className="mt-4 bg-black/40 border border-white/6 rounded-md p-4 text-sm text-left">
                <div className="mb-2">
                  <span className="font-medium">Hash:</span> <span className="break-all">{result.hash}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Fake?:</span> {result.is_fake ? <span className="text-amber-300">Yes</span> : <span className="text-green-300">No</span>}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Confidence:</span> {(Number(result.confidence) * 100).toFixed(2)}%
                </div>

                {result.sui_proof && (
                  <div className="mt-2">
                    <div className="font-medium">Blockchain Proof ID:</div>
                    <div className="break-all text-xs text-slate-200">{result.sui_proof}</div>
                    <a className="inline-block mt-2 text-xs text-blue-300 underline" href={result.explorer} target="_blank" rel="noreferrer">
                      View on Sui Explorer
                    </a>
                  </div>
                )}

                <div className={`mt-3 font-semibold ${result.is_fake ? "text-amber-300" : "text-green-300"}`}>
                  {result.message}
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="text-center mt-6 text-xs text-slate-400">
          © 2025 ProofChain • Legends Tech
        </footer>
      </div>
    </div>
  );
}
