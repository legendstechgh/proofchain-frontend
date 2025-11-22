
# 🧾 **ProofChain — AI-Powered Authenticity Verification on Sui Blockchain**

**Live Demo:** [https://proofchain.netlify.app](https://proofchain.netlify.app)
**Backend API:** [https://proofchain-backend.onrender.com](https://proofchain-backend.onrender.com)
**Demo Video:** [https://youtu.be/6879aYvcGVc](https://youtu.be/6879aYvcGVc)
**Pitch Deck:** [https://pitch.com/v/proofchain_presentation-e3b7r9](https://pitch.com/v/proofchain_presentation-e3b7r9)

---

# 🔥 **Tagline: Trust Made Transparent.**

ProofChain is a **hybrid AI + Blockchain authenticity engine** designed to combat the global surge in **deepfakes, misinformation, forged certificates, and tampered documents**.

By combining **AI-based media analysis**, **SHA-256 hashing**, and **on-chain verification on Sui**, ProofChain delivers **provably authentic** records that institutions, journalists, students, and the public can rely on.

---

# 🧠 **Problem**

Fake media and forged documents are exploding:

* Deepfakes are used in scams, blackmail, and misinformation.
* Students and institutions suffer from forged certificates and altered transcripts.
* Images, audio, and PDFs can be easily manipulated without detection.
* Existing verification systems are **centralized**, **slow**, and **easy to bypass**.

**Blockchain + AI** solves this.

But institutions do not have easy tools to generate or verify authenticity.

---

# 🚀 **What ProofChain Solves**

ProofChain offers:

### ✔ AI analysis to detect tampered or AI-generated media

### ✔ Secure hashing + on-chain proof storage

### ✔ Instant verification with QR codes

### ✔ Transparent, tamper-proof metadata

### ✔ A simple interface that anyone can use

---

# 🏆 **Why ProofChain Stands out**

| Feature             | **ProofChain**                             | 
| ------------------- | ------------------------------------------ | 
| Primary Goal        | Detect fake media & authenticate documents | 
| AI Integration      | Yes — deepfake detection + scoring         |
| Blockchain Usage    | Stores verification proofs                 | 
| Certificate Minting | Yes — QR-based certificate                 |
| End Users           | Schools, banks, journalists, public        | 
| Impact              | High-stakes document authentication        | 
| UX                  | Instant verification flow                  | 
| Microscope Effect   | Shows authenticity of a single file        | 

**ProofChain is directly aligned with the “Provably Authentic” track, which focuses on trust & verification.
ProofChain solves a **more critical**, **more urgent**, and **more socially impactful** problem.

---

# 🧩 **System Architecture**

[https://github.com/legendstechgh/proofchain-frontend/blob/main/public/ProofChain_Architecture.png](https://github.com/legendstechgh/proofchain-frontend/blob/main/public/ProofChain_Architecture.png)


The architecture includes:

1. **User Upload (Frontend)**
2. **AI Engine – Authenticity & Deepfake Detection**
3. **Hashing (SHA-256)**
4. **Backend → Sui Transaction Signing**
5. **Move Smart Contract → Immutable Record Storage**
6. **QR Certificate Generation**
7. **Verification Viewer + Local History**

---

# 🧙‍♂️ **How It Works (Step-by-Step)**

### **1. User Uploads a File**

ProofChain supports images, documents, audio, and video.

### **2. AI Authenticity Check**

* Deepfake detection
* Manipulation score
* Confidence level
* Trust classification (Authentic / Fake / Uncertain)

### **3. Hash Computation**

Client computes **SHA-256** hash before sending.

### **4. Secure Backend Signing**

The backend:

* receives the hash
* signs the Sui transaction
* writes metadata on-chain
* returns the transaction digest

### **5. Move Smart Contract Storage**

Your deployed Move module stores:

```
file_hash
verification_confidence
is_fake
timestamp
```

All immutable and publicly verifiable.

---

# 🛠 **Tech Stack**

### **Frontend**

* React
* TailwindCSS
* QR code generator
* Confetti JS
* LocalStorage history
* Animated loader

### **Backend**

* Node.js
* Express
* Multer for file handling
* crypto SHA-256 hashing
* @mysten/sui SDK

### **Blockchain**

* Sui Testnet
* Custom Move module
* On-chain storage of authenticity proofs

---

# 🪪 **Sui Ecosystem Alignment**

ProofChain is deeply aligned with Sui’s ecosystem goals.
Even where integration is **conceptual**, the architecture fully matches Sui’s future direction.

### 🚀 **1. Walrus (Decentralized Storage) — Future Integration**

Will be used for:

* storing authenticity certificates
* archiving media samples
* public verification artifacts

### 🔐 **2. Seal (Encryption Layer) — Future Integration**

For:

* encrypting sensitive documents before verification
* protecting private institutional records

### 🧬 **3. Nautilus (Decentralized Identity) — Future Integration**

For:

* DID-linked verification
* Institutional identities
* User-stamped authenticity signatures

### 💠 **4. DeepBook — Optional (Future Marketplace)**

For:

* selling verification credits
* authenticity-report exchanges

---

# 📦 **Project Structure**

```
proofchain/
│
├── frontend/
│   ├── src/App.jsx
│   ├── src/style.css
│   └── public/proofchain-logo.png
│
└── backend/
    ├── server.js
    ├── sui_service.js
    ├── .env
```

---

# 🧪 **Run Locally**

## Frontend

```
cd proofchain-frontend
npm install
npm run dev
```

## Backend

```
cd proofchain-backend
npm install
node server.js
```

---

# 🧾 **Features**

### ✔ AI authenticity analysis

### ✔ On-chain Sui verification

### ✔ SHA-256 hashing

### ✔ QR certificate generation

### ✔ Confetti animation for success

### ✔ Loading animation

### ✔ Local verification history

### ✔ Fully responsive design

### ✔ Light/Dark theme toggle

---

# 🔮 **Roadmap**

### Q1 2025

* Web3 wallet login (zkLogin + WalletKit)
* Institutional dashboard
* Multi-file batch processing
* Deepfake model upgrade

### Q2 2025

* Integration with **Walrus**
* Encryption with **Seal**
* DID identity with **Nautilus**

---

# 🏆 **Why ProofChain Should Win**

* Tackles **global fraud** — extremely high-impact.
* Directly aligned with the **Provably Authentic** Sui track.
* Works *today* — real frontend, real backend, real Move contract.
* Clean architecture, smooth UI, real-world usability.
* Clear future roadmap aligned with Sui’s 2025 infrastructure stack.
* High social impact for Africa & global educational systems.
* Helps banks, schools, and journalists fight tampered documents.

ProofChain is not just a project —
**it’s a trust infrastructure for the internet.**

