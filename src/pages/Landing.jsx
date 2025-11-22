import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

// Use the uploaded file path (your deploy will transform this to a served URL)
const ARCH_IMG = '/ProofChain_Architecture.png';

export default function Landing() {
  return (
    <>
      <Navbar />
      <main className="landing-root">
        <section className="hero">
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="proof-text">Proof</span>
          <span className="chain-text">Chain</span> — <span className="accent-blue">AI</span> &amp; <span className="accent-green">Blockchain</span> Verification
            </h1>
            <p className="hero-sub">
              Trust made transparent. Detect manipulated media with AI, anchor immutable proofs on Sui, and verify with a single scan.
            </p>

            <div className="hero-ctas">
              <Link to="/app" className="btn-primary">Launch App</Link>
              <a href="#features" className="btn-ghost">Explore features</a>
            </div>

            <div className="trust-row">
              <div className="trust-pill">Sui • Move</div>
              <div className="trust-pill">Walrus-ready</div>
              <div className="trust-pill">QR Certificate</div>
            </div>
          </div>

          <div className="hero-right">
            <div className="device-mockup">
              <img src="/proofchain-logo.png" alt="ProofChain" className="mock-logo" />
              <div className="mock-screen">
                <div className="mock-screen-inner">
                  <p className="mock-top">ProofChain • Quick Verify</p>
                  <div className="mock-preview">
                    <img src="./public/mockup.png" alt="ProofChain preview" style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }} />
                  </div>
                  <div className="mock-text">Upload → Analyze → Anchor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">How ProofChain helps</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI Media Analysis</h3>
              <p>Detect manipulation, deepfakes and edits with fast inference and confidence scoring.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>On-chain Anchoring</h3>
              <p>SHA-256 hashes and metadata are stored on Sui via a Move module for immutable provenance.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h3>Verifiable Certificate</h3>
              <p>Mint a certificate with QR code — scan to view on Sui Explorer and confirm authenticity.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Integratable</h3>
              <p>Lightweight React frontend, Express backend, easy API for institutions and researchers.</p>
            </div>
          </div>
        </section>

        <section className="architecture">
          <h2 className="section-title">Architecture</h2>
          <p className="arch-sub">React → Express → Walrus (optional) → Sui Move module</p>
          <div className="arch-image-wrap">
            <img src={ARCH_IMG} alt="Architecture diagram" className="arch-image" />
          </div>
        </section>

        <section className="cta-bottom">
          <h3>Ready to verify media with ProofChain?</h3>
          <Link to="/app" className="btn-primary wide">Get Started — Launch App</Link>
        </section>

        <footer className="landing-footer">
          <div>© 2025 ProofChain • Legends Tech</div>
        </footer>
      </main>
    </>
  );
}
