"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { defaultCreators, formatMinutes, getStatusText } from "@/lib/creators"

export default function LeaderboardPage() {
  const [creators, setCreators] = useState(defaultCreators)

  useEffect(() => {
    const stored = localStorage.getItem("pp_creators")
    if (stored) setCreators(JSON.parse(stored))
  }, [])

  const leaderboard = useMemo(() => {
    return [...creators]
      .sort((a, b) => b.diamonds - a.diamonds)
      .map((creator, index) => ({ ...creator, rank: index + 1 }))
  }, [creators])

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
            <div>
              <div style={styles.kicker}>Platinum Pulse Network</div>
              <h1 style={styles.title}>Public Leaderboard</h1>
            </div>
          </div>
          <Link href="/" style={styles.linkBtn}>Back</Link>
        </div>

        <div style={styles.wrap}>
          {leaderboard.map((creator) => (
            <div key={creator.id} style={styles.row}>
              <div style={styles.rank}>#{creator.rank}</div>
              <div style={styles.identity}>
                <img src={creator.avatar} alt={creator.username} style={styles.avatar} />
                <div>
                  <div style={styles.username}>@{creator.username}</div>
                  <div style={styles.meta}>{creator.level}</div>
                </div>
              </div>
              <div style={styles.metrics}>
                <div><span>Diamonds</span><strong>{creator.diamonds}</strong></div>
                <div><span>LIVE Days</span><strong>{creator.validLiveDays}</strong></div>
                <div><span>LIVE Hours</span><strong>{formatMinutes(creator.liveMinutes)}</strong></div>
                <div><span>Status</span><strong>{getStatusText(creator)}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(rgba(3,7,18,0.55), rgba(2,6,23,0.86)), url('/background.png') center/cover no-repeat", color: "white", fontFamily: "Arial, sans-serif", padding: 24 },
  card: { maxWidth: 1280, margin: "0 auto", borderRadius: 30, padding: 28, background: "linear-gradient(180deg, rgba(10,25,61,0.74), rgba(7,18,42,0.7))", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)" },
  top: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 24 },
  brand: { display: "flex", gap: 18, alignItems: "center" },
  logo: { width: 72, height: 72, objectFit: "contain" },
  kicker: { color: "#dbeafe", fontSize: 14, marginBottom: 6 },
  title: { margin: 0, fontSize: 42 },
  linkBtn: { padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", color: "white", textDecoration: "none", fontWeight: "bold" },
  wrap: { display: "grid", gap: 14 },
  row: { display: "grid", gridTemplateColumns: "90px minmax(220px, 1fr) minmax(380px, 2fr)", gap: 16, alignItems: "center", background: "linear-gradient(180deg, rgba(11,26,64,0.82), rgba(8,18,46,0.76))", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 18 },
  rank: { width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #67e8f9 0%, #2563eb 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" },
  identity: { display: "flex", alignItems: "center", gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.14)" },
  username: { fontWeight: "bold", fontSize: 18 },
  meta: { color: "#bfdbfe", fontSize: 14, marginTop: 4 },
  metrics: { display: "grid", gridTemplateColumns: "repeat(4, minmax(90px, 1fr))", gap: 12 },
}
