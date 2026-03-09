"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  defaultCreators,
  formatMinutes,
  getStatusText,
  getTotalCoins,
} from "@/lib/creators"

export default function LeaderboardPage() {
  const [creators, setCreators] = useState(defaultCreators)
  const [dashboardLink, setDashboardLink] = useState("/dashboard/chaossprout")

  useEffect(() => {
    const stored = localStorage.getItem("pp_creators")
    if (stored) {
      setCreators(JSON.parse(stored))
    }

    const lastUsername = localStorage.getItem("pp_last_username")
    if (lastUsername && lastUsername.trim()) {
      setDashboardLink(`/dashboard/${lastUsername}`)
    }
  }, [])

  const leaderboard = useMemo(() => {
    return [...creators]
      .sort((a, b) => getTotalCoins(b) - getTotalCoins(a))
      .map((creator, index) => ({
        ...creator,
        rank: index + 1,
      }))
  }, [creators])

  function getRankIcon(rank) {
    if (rank === 1) return "👑"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return "⚡"
  }

  return (
    <main style={styles.page}>
      <div style={styles.pageGlowOne} />
      <div style={styles.pageGlowTwo} />

      <div style={styles.card}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
            <div>
              <div style={styles.kicker}>⚡ Platinum Pulse Network ⚡</div>
              <h1 style={styles.title}>💎 Platinum Coins Leaderboard ⚡</h1>
              <div style={styles.sub}>
                Ranked by total Platinum Coins earned this month.
              </div>
            </div>
          </div>

          <div style={styles.links}>
            <Link href={dashboardLink} style={styles.linkBtn}>
              Dashboard
            </Link>
            <Link href="/incentives" style={styles.linkBtn}>
              Incentives
            </Link>
            <Link href="/" style={styles.linkBtn}>
              Home
            </Link>
          </div>
        </div>

        <div style={styles.wrap}>
          {leaderboard.map((creator) => (
            <div
              key={creator.id}
              style={{
                ...styles.row,
                ...(creator.rank === 1 ? styles.rowTop1 : {}),
                ...(creator.rank === 2 ? styles.rowTop2 : {}),
                ...(creator.rank === 3 ? styles.rowTop3 : {}),
              }}
            >
              <div style={styles.leftBlock}>
                <div style={styles.agencyLogoWrap}>
                  <img
                    src="/logo.png"
                    alt="Platinum Pulse"
                    style={styles.agencyLogo}
                  />
                </div>

                <div
                  style={{
                    ...styles.rankNumber,
                    ...(creator.rank === 1 ? styles.rank1 : {}),
                    ...(creator.rank === 2 ? styles.rank2 : {}),
                    ...(creator.rank === 3 ? styles.rank3 : {}),
                  }}
                >
                  <div style={styles.rankIcon}>{getRankIcon(creator.rank)}</div>
                  <div>#{creator.rank}</div>
                </div>

                <div style={styles.avatarWrap}>
                  <img
                    src={`https://unavatar.io/tiktok/${creator.username}`}
                    alt={creator.username}
                    style={styles.avatar}
                    onError={(e) => {
                      e.currentTarget.src = "/logo.png"
                    }}
                  />
                </div>
              </div>

              <div style={styles.identity}>
                <div style={styles.usernameRow}>
                  <span style={styles.username}>@{creator.username}</span>
                  {creator.rank <= 3 ? (
                    <span style={styles.topTag}>Top {creator.rank}</span>
                  ) : null}
                </div>
                <div style={styles.meta}>{creator.level || "Tier 1"}</div>
              </div>

              <div style={styles.metrics}>
                <div style={styles.metricBox}>
                  <span style={styles.metricLabel}>⚡ Coins</span>
                  <strong style={styles.metricValue}>
                    {getTotalCoins(creator)}
                  </strong>
                </div>

                <div style={styles.metricBox}>
                  <span style={styles.metricLabel}>💎 Diamonds</span>
                  <strong style={styles.metricValue}>
                    {creator.diamonds.toLocaleString()}
                  </strong>
                </div>

                <div style={styles.metricBox}>
                  <span style={styles.metricLabel}>⚡ LIVE Hours</span>
                  <strong style={styles.metricValue}>
                    {formatMinutes(creator.liveMinutes)}
                  </strong>
                </div>

                <div style={styles.metricBox}>
                  <span style={styles.metricLabel}>💎 Status</span>
                  <strong style={styles.metricValue}>
                    {getStatusText(creator)}
                  </strong>
                </div>
              </div>
            </div>
          ))}
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
    background:
      "linear-gradient(rgba(3,7,18,0.55), rgba(2,6,23,0.86)), url('/background.png') center/cover no-repeat",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: 24,
  },
  pageGlowOne: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    top: -120,
    left: -120,
    background:
      "radial-gradient(circle, rgba(34,211,238,0.14), transparent 70%)",
    filter: "blur(10px)",
  },
  pageGlowTwo: {
    position: "absolute",
    width: 560,
    height: 560,
    borderRadius: "50%",
    bottom: -180,
    right: -140,
    background:
      "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
    filter: "blur(12px)",
  },
  card: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1320,
    margin: "0 auto",
    borderRadius: 30,
    padding: 28,
    background:
      "linear-gradient(180deg, rgba(10,25,61,0.74), rgba(7,18,42,0.7))",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.28)",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  brand: {
    display: "flex",
    gap: 18,
    alignItems: "center",
  },
  logo: {
    width: 78,
    height: 78,
    objectFit: "contain",
    filter: "drop-shadow(0 0 18px rgba(103,232,249,0.18))",
  },
  kicker: {
    color: "#dbeafe",
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.05,
  },
  sub: {
    marginTop: 8,
    color: "#bfdbfe",
    fontSize: 16,
  },
  links: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  linkBtn: {
    padding: "14px 18px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  wrap: {
    display: "grid",
    gap: 14,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "280px minmax(220px, 1fr) minmax(380px, 2fr)",
    gap: 18,
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(11,26,64,0.82), rgba(8,18,46,0.76))",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: 18,
    transition: "transform 0.2s ease",
  },
  rowTop1: {
    border: "1px solid rgba(255,215,0,0.28)",
    boxShadow: "0 0 28px rgba(255,215,0,0.10)",
  },
  rowTop2: {
    border: "1px solid rgba(192,192,192,0.20)",
    boxShadow: "0 0 24px rgba(192,192,192,0.08)",
  },
  rowTop3: {
    border: "1px solid rgba(205,127,50,0.20)",
    boxShadow: "0 0 24px rgba(205,127,50,0.08)",
  },
  leftBlock: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  agencyLogoWrap: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  agencyLogo: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    objectFit: "cover",
  },
  rankNumber: {
    minWidth: 64,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#67e8f9",
    textShadow: "0 0 14px rgba(103,232,249,0.35)",
    display: "grid",
    justifyItems: "center",
    gap: 2,
  },
  rankIcon: {
    fontSize: 18,
    lineHeight: 1,
  },
  rank1: {
    color: "#FFD700",
    textShadow: "0 0 18px rgba(255,215,0,0.6)",
  },
  rank2: {
    color: "#C0C0C0",
    textShadow: "0 0 18px rgba(192,192,192,0.6)",
  },
  rank3: {
    color: "#CD7F32",
    textShadow: "0 0 18px rgba(205,127,50,0.6)",
  },
  avatarWrap: {
    width: 62,
    height: 62,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.14)",
  },
  identity: {
    display: "grid",
    gap: 6,
  },
  usernameRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  username: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 1.1,
  },
  topTag: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(103,232,249,0.10)",
    border: "1px solid rgba(103,232,249,0.18)",
    color: "#cffafe",
    fontSize: 12,
    fontWeight: "bold",
  },
  meta: {
    color: "#bfdbfe",
    fontSize: 16,
  },
  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(90px, 1fr))",
    gap: 12,
  },
  metricBox: {
    display: "grid",
    gap: 6,
    padding: "10px 12px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  metricLabel: {
    color: "#bfdbfe",
    fontSize: 13,
  },
  metricValue: {
    fontSize: 16,
  },
}