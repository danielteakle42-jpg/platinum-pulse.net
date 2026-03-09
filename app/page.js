"use client"

import { useEffect, useState } from "react"
import { defaultCreators } from "@/lib/creators"

const ADMIN_USERNAME = "ppn777"

export default function Home() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [creators, setCreators] = useState(defaultCreators)

  useEffect(() => {
    const stored = localStorage.getItem("pp_creators")
    if (stored) {
      setCreators(JSON.parse(stored))
    }
  }, [])

  function handleLookup() {
    const cleaned = username.trim().toLowerCase()

    if (cleaned === ADMIN_USERNAME.toLowerCase()) {
      localStorage.setItem("pp_admin_logged_in", "true")
      window.location.href = "/admin"
      return
    }

    const found = creators.find(
      (c) => c.username.toLowerCase() === cleaned
    )

    if (!found) {
      setError("Username not found. Please check spelling and try again.")
      return
    }

    setError("")
    localStorage.setItem("pp_last_username", found.username)
    window.location.href = `/dashboard/${found.username}`
  }

  return (
    <main style={styles.page}>
      <div style={styles.overlay} />
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />
      <div style={styles.glowThree} />

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logoHalo} />
          <img
            src="/logo.png"
            alt="Platinum Pulse Network"
            style={styles.logo}
          />
        </div>

        <div style={styles.badge}>⚡ Creator Portal ⚡</div>

        <h1 style={styles.title}>💎 Platinum Pulse Network ⚡</h1>

        <p style={styles.subtitle}>
          Enter your username to access your personal dashboard, LIVE progress,
          incentives, and leaderboard position.
        </p>

        <div style={styles.row}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            placeholder="Enter your username"
            style={styles.input}
          />

          <button onClick={handleLookup} style={styles.button}>
            Enter Dashboard
          </button>
        </div>

        {error ? <div style={styles.error}>{error}</div> : null}

        <div style={styles.bottomText}>
          Private creator access only.
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    color: "white",
    fontFamily: "Arial, sans-serif",
    background:
      "url('/background.png') center/cover no-repeat",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(2,6,23,0.42), rgba(2,6,23,0.82))",
  },
  glowOne: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    top: -120,
    left: -120,
    background:
      "radial-gradient(circle, rgba(34,211,238,0.20), transparent 70%)",
    filter: "blur(8px)",
  },
  glowTwo: {
    position: "absolute",
    width: 640,
    height: 640,
    borderRadius: "50%",
    bottom: -220,
    right: -140,
    background:
      "radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)",
    filter: "blur(12px)",
  },
  glowThree: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: "50%",
    top: "18%",
    right: "16%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.08), transparent 72%)",
    filter: "blur(18px)",
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 940,
    textAlign: "center",
    padding: "56px 42px",
    borderRadius: 34,
    background:
      "linear-gradient(180deg, rgba(12,26,67,0.74), rgba(8,18,46,0.70))",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(18px)",
    boxShadow:
      "0 30px 120px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  logoWrap: {
    position: "relative",
    width: 280,
    height: 280,
    margin: "0 auto 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoHalo: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(103,232,249,0.28), rgba(59,130,246,0.16), transparent 72%)",
    filter: "blur(20px)",
  },
  logo: {
    position: "relative",
    width: 250,
    height: 250,
    objectFit: "contain",
    display: "block",
    filter:
      "drop-shadow(0 0 22px rgba(103,232,249,0.28)) drop-shadow(0 0 38px rgba(59,130,246,0.20))",
  },
  badge: {
    display: "inline-block",
    padding: "9px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#dbeafe",
    fontSize: 14,
    marginBottom: 18,
    letterSpacing: "0.4px",
  },
  title: {
    margin: 0,
    fontSize: 60,
    lineHeight: 1.02,
    letterSpacing: "-2px",
    textShadow: "0 6px 24px rgba(0,0,0,0.32)",
  },
  subtitle: {
    maxWidth: 720,
    margin: "16px auto 0",
    color: "#dbeafe",
    fontSize: 21,
    lineHeight: 1.55,
  },
  row: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 34,
  },
  input: {
    width: "100%",
    maxWidth: 520,
    padding: "18px 20px",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: 17,
    outline: "none",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
  },
  button: {
    padding: "18px 28px",
    borderRadius: 18,
    border: "none",
    background: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 45%, #38bdf8 100%)",
    color: "#062033",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 17,
    boxShadow: "0 14px 30px rgba(34,211,238,0.22)",
  },
  error: {
    maxWidth: 520,
    margin: "18px auto 0",
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(239,68,68,0.14)",
    border: "1px solid rgba(239,68,68,0.24)",
    color: "#fecaca",
  },
  bottomText: {
    marginTop: 22,
    color: "#bfdbfe",
    fontSize: 14,
    opacity: 0.9,
  },
}