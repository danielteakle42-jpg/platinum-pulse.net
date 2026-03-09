"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import {
  defaultCreators,
  formatCurrency,
  formatHoursDecimal,
  formatMinutes,
  getDaysProgress,
  getHoursProgress,
  getStatusText,
  getTierProgress,
  INCENTIVE_DAYS_TARGET,
  INCENTIVE_HOURS_TARGET,
  NEXT_TIER_DIAMONDS,
} from "@/lib/creators"

function StatCard({ title, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statTitle}>{title}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  )
}

function ProgressBar({ value }) {
  return (
    <div style={styles.progressTrack}>
      <div style={{ ...styles.progressFill, width: `${value}%` }} />
    </div>
  )
}

export default function CreatorDashboardPage() {
  const params = useParams()
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

  const creator =
    leaderboard.find((c) => c.username.toLowerCase() === String(params.username).toLowerCase()) ||
    null

  if (!creator) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1>Creator not found</h1>
          <Link href="/" style={styles.linkBtn}>Back</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
            <div>
              <div style={styles.kicker}>Platinum Pulse Network</div>
              <h1 style={styles.title}>{creator.username}</h1>
              <div style={styles.sub}>Rank #{creator.rank} of {leaderboard.length}</div>
            </div>
          </div>
          <div style={styles.links}>
            <Link href="/leaderboard" style={styles.linkBtn}>Leaderboard</Link>
            <Link href="/" style={styles.linkBtn}>Home</Link>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <StatCard title="This Month's Diamonds" value={creator.diamonds} />
          <StatCard title="Viewing" value={creator.month} />
          <StatCard title="Tier" value={`${creator.level} • ≥ 0`} />
          <StatCard title="Activeness Level" value={creator.validLiveDays} />
        </div>

        <div style={styles.twoCol}>
          <div style={styles.panel}>
            <h2>Requirements</h2>
            <div style={styles.status}>{getStatusText(creator)}</div>
          </div>

          <div style={styles.panel}>
            <h2>Incentive Coins</h2>
            <p style={styles.bigFigure}>2,100 coins</p>
            <p style={styles.text}>Next: Tier 2 (≥ {NEXT_TIER_DIAMONDS.toLocaleString()})</p>
            <ProgressBar value={getTierProgress(creator.diamonds)} />
            <p style={styles.text}>
              {creator.diamonds.toLocaleString()} / {NEXT_TIER_DIAMONDS.toLocaleString()} diamonds
            </p>
          </div>
        </div>

        <div style={styles.twoCol}>
          <div style={styles.panel}>
            <h2>Activeness</h2>
            <p style={styles.text}>
              Minimum requirements for incentives: {INCENTIVE_DAYS_TARGET} days and {INCENTIVE_HOURS_TARGET} hours.
            </p>

            <div style={styles.reqBlock}>
              <div style={styles.reqHeader}>
                <span>Valid days</span>
                <strong>{creator.validLiveDays}/{INCENTIVE_DAYS_TARGET}</strong>
              </div>
              <ProgressBar value={getDaysProgress(creator.validLiveDays)} />
              <div style={styles.text}>{creator.validLiveDays >= INCENTIVE_DAYS_TARGET ? "Met" : "Not Met"}</div>
            </div>

            <div style={styles.reqBlock}>
              <div style={styles.reqHeader}>
                <span>Hours live</span>
                <strong>{formatHoursDecimal(creator.liveMinutes)}/{INCENTIVE_HOURS_TARGET}</strong>
              </div>
              <ProgressBar value={getHoursProgress(creator.liveMinutes)} />
              <div style={styles.text}>{creator.liveMinutes >= INCENTIVE_HOURS_TARGET * 60 ? "Met" : "Not Met"}</div>
            </div>
          </div>

          <div style={styles.panel}>
            <h2>Extra Stats</h2>
            <div style={styles.text}><strong>Eligible incentive days:</strong> {creator.eligibleIncentiveDays}</div>
            <div style={styles.text}><strong>Estimated bonus contribution:</strong> {formatCurrency(creator.estimatedBonusContribution)}</div>
            <div style={styles.text}><strong>Ratio:</strong> {creator.ratio}%</div>
          </div>
        </div>

        <div style={styles.panel}>
          <h2>{creator.month} Activity</h2>
          <div style={styles.activityGrid}>
            {creator.dailyActivity.map((item) => (
              <div key={item.day} style={styles.activityCard}>
                <div style={styles.day}>{item.day}</div>
                <div style={styles.value}>{item.diamonds > 0 ? item.diamonds : "-"}</div>
                <div style={styles.time}>⏱{item.liveMinutes > 0 ? formatMinutes(item.liveMinutes) : "-"}</div>
                <div style={styles.footer}>
                  {item.hourAchieved ? "Hour achieved" : "Hour not achieved"}
                </div>
              </div>
            ))}
          </div>
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
  sub: { marginTop: 8, color: "#bfdbfe" },
  links: { display: "flex", gap: 12, flexWrap: "wrap" },
  linkBtn: { padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)", color: "white", textDecoration: "none", fontWeight: "bold" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 },
  statCard: { borderRadius: 22, padding: 22, background: "linear-gradient(180deg, rgba(11,26,64,0.82), rgba(8,18,46,0.76))", border: "1px solid rgba(255,255,255,0.12)" },
  statTitle: { color: "#bfdbfe", marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: "bold" },
  twoCol: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 24 },
  panel: { borderRadius: 22, padding: 22, background: "linear-gradient(180deg, rgba(11,26,64,0.82), rgba(8,18,46,0.76))", border: "1px solid rgba(255,255,255,0.12)" },
  status: { display: "inline-block", padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", fontWeight: "bold" },
  bigFigure: { fontSize: 36, fontWeight: "bold", margin: "8px 0 14px" },
  text: { color: "#dbeafe", lineHeight: 1.7 },
  reqBlock: { marginTop: 18 },
  reqHeader: { display: "flex", justifyContent: "space-between", marginBottom: 10, color: "#dbeafe" },
  progressTrack: { width: "100%", height: 14, background: "rgba(255,255,255,0.10)", borderRadius: 999, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%)", borderRadius: 999 },
  activityGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(86px, 1fr))", gap: 10 },
  activityCard: { padding: 12, borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)", textAlign: "center" },
  day: { fontWeight: "bold", marginBottom: 6 },
  value: { fontSize: 18, fontWeight: "bold" },
  time: { color: "#bfdbfe", fontSize: 12, marginTop: 6 },
  footer: { color: "#dbeafe", fontSize: 11, marginTop: 8 },
}
