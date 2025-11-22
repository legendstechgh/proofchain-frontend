import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <img src="/proofchain-logo.png" alt="ProofChain" className="nav-logo"/>
          <span className="proof-text">Proof</span><span className="chain-text">Chain</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/app" className="nav-link btn-small">Launch App</Link>
        </div>
      </div>
    </nav>
  );
}
