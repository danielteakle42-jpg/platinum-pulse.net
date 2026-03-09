"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { defaultCreators } from "@/lib/creators"

export default function Home() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [creators, setCreators] = useState(defaultCreators)

  useEffect(() => {
    const stored = localStorage.getItem("pp_creators")
    if (stored) setCreators(JSON.parse(stored))
  }, [])

  function handleLookup() {
    const found = creators.find(
      (c) => c.username.toLowerCase() === username.trim().toLowerCase()
    )
    if (!found) {
      setError("Username not found. Please check spelling and try again.")
      return
    }
    window.location.href = `/dashboard/${found.username}`
  }

  return (
    <main style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.card}>
        <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
        <div style={styles.badge}>Creator Portal</div>
        <h1 style={styles.title}>Platinum Pulse Network</h1>
        <p style={styles.subtitle}>
          Enter your username to access your personal dashboard.
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

        <div style={styles.links}>
          <Link href="/leaderboard" style={styles.linkBtn}>View Leaderboard</Link>
          <Link href="/incentives" style={styles.linkBtn}>How Incentives Work</Link>
          <Link href="/admin" style={styles.linkBtn}>Admin Login</Link>
        </div>

        {error ? <div style={styles.error}>{error}</div> : null}
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(rgba(3,7,18,0.55), rgba(2,6,23,0.86)), url('/background.png') center/cover no-repeat",
    color: "white",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    position: "relative",
    overflow: "hidden",
  },
  glowOne: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)",
    top: -100,
    left: -80,
  },
  glowTwo: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)",
    bottom: -180,
    right: -120,
  },
  card: {
    width: "100%",
    maxWidth: 900,
    borderRadius: 32,
    padding: "54px 42px",
    background: "linear-gradient(180deg, rgba(10,25,61,0.74), rgba(7,18,42,0.7))",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 30px 100px rgba(0,0,0,0.35)",
    textAlign: "center",
    backdropFilter: "blur(18px)",
    position: "relative",
    zIndex: 2,
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: "contain",
    marginBottom: 14,
    filter: "drop-shadow(0 0 20px rgba(103,232,249,0.35))",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#dbeafe",
    fontSize: 14,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 58,
    lineHeight: 1.02,
    letterSpacing: "-2px",
  },
  subtitle: {
    marginTop: 14,
    color: "#dbeafe",
    fontSize: 21,
    lineHeight: 1.5,
  },
  row: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
    maxWidth: 500,
    padding: "18px 20px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: 17,
    outline: "none",
  },
  button: {
    padding: "18px 26px",
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)",
    color: "#062033",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 17,
  },
  links: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 16,
  },
  linkBtn: {
    padding: "14px 18px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  error: {
    marginTop: 16,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(239,68,68,0.14)",
    border: "1px solid rgba(239,68,68,0.24)",
    color: "#fecaca",
  },
}
