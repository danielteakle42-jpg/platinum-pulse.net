"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  INCENTIVE_DAYS_TARGET,
  INCENTIVE_HOURS_TARGET,
  INCENTIVE_PERIOD_DAYS,
} from "@/lib/creators"

function RuleCard({ icon, title, children, accent }) {
  return (
    <div
      style={{
        ...styles.ruleCard,
        ...(accent === "cyan" ? styles.ruleCardCyan : {}),
        ...(accent === "gold" ? styles.ruleCardGold : {}),
      }}
    >
      <div style={styles.ruleTop}>
        <span style={styles.ruleIcon}>{icon}</span>
        <h3 style={styles.ruleTitle}>{title}</h3>
      </div>
      <div style={styles.ruleContent}>{children}</div>
    </div>
  )
}

export default function IncentivesPage() {
  const [dashboardLink, setDashboardLink] = useState("/dashboard/chaossprout")

  useEffect(() => {
    const lastUsername = localStorage.getItem("pp_last_username")
    if (lastUsername && lastUsername.trim()) {
      setDashboardLink(`/dashboard/${lastUsername}`)
    }
  }, [])

  return (
    <main style={styles.page}>
      <div style={styles.pageGlowOne} />
      <div style={styles.pageGlowTwo} />

      <div style={styles.shell}>
        <div style={styles.card}>
          <div style={styles.hero}>
            <div style={styles.heroLeft}>
              <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
              <div>
                <div style={styles.kicker}>⚡ Platinum Pulse Network ⚡</div>
                <h1 style={styles.title}>💎 How Incentives Work</h1>
                <p style={styles.subtitle}>
                  A clean breakdown of how Platinum Coins are earned, how monthly
                  qualification works, and what creators need to redeem rewards.
                </p>
              </div>
            </div>

            <div style={styles.links}>
              <Link href={dashboardLink} style={styles.linkBtn}>Dashboard</Link>
              <Link href="/leaderboard" style={styles.linkBtn}>Leaderboard</Link>
              <Link href="/" style={styles.linkBtn}>Home</Link>
            </div>
          </div>

          <div style={styles.highlightPanel}>
            <div style={styles.highlightGlow} />
            <div style={styles.highlightContent}>
              <div>
                <div style={styles.highlightKicker}>Monthly Qualification</div>
                <h2 style={styles.highlightTitle}>Hit your LIVE targets first</h2>
                <p style={styles.highlightText}>
                  To redeem Platinum Coins, creators must complete at least{" "}
                  <strong>{INCENTIVE_DAYS_TARGET} valid LIVE days</strong> and{" "}
                  <strong>{INCENTIVE_HOURS_TARGET} LIVE hours</strong> within the{" "}
                  <strong>{INCENTIVE_PERIOD_DAYS}-day monthly cycle</strong>.
                </p>
              </div>

              <div style={styles.highlightStats}>
                <div style={styles.highlightStat}>
                  <span style={styles.highlightStatLabel}>Days Target</span>
                  <strong style={styles.highlightStatValue}>{INCENTIVE_DAYS_TARGET}</strong>
                </div>
                <div style={styles.highlightStat}>
                  <span style={styles.highlightStatLabel}>Hours Target</span>
                  <strong style={styles.highlightStatValue}>{INCENTIVE_HOURS_TARGET}</strong>
                </div>
                <div style={styles.highlightStat}>
                  <span style={styles.highlightStatLabel}>Cycle</span>
                  <strong style={styles.highlightStatValue}>{INCENTIVE_PERIOD_DAYS}D</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.grid}>
            <RuleCard icon="✅" title="Redeemable Requirements" accent="cyan">
              <div style={styles.listRow}>• At the start of each monthly cycle</div>
              <div style={styles.listRow}>• Must hit {INCENTIVE_DAYS_TARGET} valid LIVE days</div>
              <div style={styles.listRow}>• Must hit {INCENTIVE_HOURS_TARGET} LIVE hours</div>
            </RuleCard>

            <RuleCard icon="💎" title="Diamond Coins" accent="gold">
              <div style={styles.listRow}>• First 1,000 diamonds → <strong>10 coins</strong></div>
              <div style={styles.listRow}>• Every additional 1,000 diamonds → <strong>5 coins</strong></div>
            </RuleCard>

            <RuleCard icon="⏱️" title="LIVE Hours">
              <div style={styles.listRow}>• Every full hour streamed → <strong>3 coins</strong></div>
              <div style={styles.listRow}>• Every valid day (1h+) → <strong>+3 coins</strong></div>
            </RuleCard>

            <RuleCard icon="🏆" title="Daily Top Creator Bonuses">
              <div style={styles.rankList}>
                <div style={styles.rankPill}>1st → 25</div>
                <div style={styles.rankPill}>2nd → 20</div>
                <div style={styles.rankPill}>3rd → 15</div>
                <div style={styles.rankPill}>4th → 10</div>
                <div style={styles.rankPill}>5th → 5</div>
              </div>
            </RuleCard>

            <RuleCard icon="🔥" title="Valid Go LIVE Streak Rewards">
              <div style={styles.listRow}>• 3-day streak → <strong>15 coins</strong></div>
              <div style={styles.listRow}>• 5-day streak → <strong>25 coins</strong></div>
              <div style={styles.listRow}>• 10-day streak → <strong>50 coins</strong></div>
              <div style={styles.listRow}>• 20-day streak → <strong>100 coins</strong></div>
              <div style={styles.listRow}>• 30-day streak → <strong>150 coins</strong></div>
            </RuleCard>

            <RuleCard icon="🌙" title="Monthly Milestones" accent="gold">
              <div style={styles.listRow}>• First time hitting 75,000 diamonds → <strong>1,000 coins</strong></div>
              <div style={styles.listRow}>• First time hitting 150,000 diamonds → <strong>2,000 coins</strong></div>
              <div style={styles.listRow}>• Second time hitting 150,000 diamonds → <strong>1,750 coins</strong></div>
              <div style={styles.listRow}>• First time hitting 500,000 diamonds → <strong>6,000 coins</strong></div>
            </RuleCard>
          </div>

          <div style={styles.footerPanel}>
            <div style={styles.footerPanelInner}>
              <div>
                <div style={styles.footerKicker}>Best Practice</div>
                <h3 style={styles.footerTitle}>Consistency wins</h3>
                <p style={styles.footerText}>
                  Creators who stream consistently, hit their valid day targets,
                  and build diamonds across the full month usually earn the most
                  Platinum Coins and rank highest on the leaderboard.
                </p>
              </div>

              <div style={styles.footerBadgeWrap}>
                <div style={styles.footerBadge}>⚡ Stay Live</div>
                <div style={styles.footerBadge}>💎 Build Diamonds</div>
                <div style={styles.footerBadge}>🏆 Rank Higher</div>
              </div>
            </div>
          </div>

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
      "linear-gradient(rgba(3,7,18,0.50), rgba(2,6,23,0.88)), url('/background.png') center/cover no-repeat",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: 28,
  },
  pageGlowOne: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    top: -120,
    left: -120,
    background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)",
    filter: "blur(16px)",
  },
  pageGlowTwo: {
    position: "absolute",
    width: 620,
    height: 620,
    borderRadius: "50%",
    bottom: -220,
    right: -160,
    background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
    filter: "blur(20px)",
  },
  shell: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1280,
    margin: "0 auto",
  },
  card: {
    borderRadius: 34,
    padding: 28,
    background:
      "linear-gradient(180deg, rgba(12,26,67,0.78), rgba(8,18,46,0.68))",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow:
      "0 24px 90px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  heroLeft: {
    display: "flex",
    gap: 18,
    alignItems: "center",
    flexWrap: "wrap",
  },
  logo: {
    width: 86,
    height: 86,
    objectFit: "contain",
    filter: "drop-shadow(0 0 18px rgba(103,232,249,0.18))",
  },
  kicker: {
    color: "#dbeafe",
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    margin: 0,
    fontSize: 46,
    lineHeight: 1.04,
  },
  subtitle: {
    marginTop: 12,
    marginBottom: 0,
    maxWidth: 760,
    color: "#dbeafe",
    lineHeight: 1.7,
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
  highlightPanel: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 26,
    padding: 24,
    marginBottom: 22,
    background:
      "linear-gradient(135deg, rgba(16,34,79,0.92), rgba(7,18,42,0.82))",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  highlightGlow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    right: -80,
    top: -80,
    background: "radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)",
    filter: "blur(12px)",
  },
  highlightContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  highlightKicker: {
    color: "#bfdbfe",
    fontSize: 13,
    marginBottom: 8,
  },
  highlightTitle: {
    margin: 0,
    fontSize: 30,
  },
  highlightText: {
    marginTop: 10,
    marginBottom: 0,
    maxWidth: 680,
    color: "#dbeafe",
    lineHeight: 1.7,
  },
  highlightStats: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  highlightStat: {
    minWidth: 120,
    padding: 16,
    borderRadius: 18,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "grid",
    gap: 8,
  },
  highlightStatLabel: {
    color: "#bfdbfe",
    fontSize: 13,
  },
  highlightStatValue: {
    fontSize: 26,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
    marginBottom: 20,
  },
  ruleCard: {
    borderRadius: 24,
    padding: 22,
    background:
      "linear-gradient(180deg, rgba(12,26,64,0.88), rgba(7,18,42,0.82))",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  },
  ruleCardCyan: {
    border: "1px solid rgba(103,232,249,0.18)",
  },
  ruleCardGold: {
    border: "1px solid rgba(250,204,21,0.18)",
  },
  ruleTop: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    marginBottom: 14,
  },
  ruleIcon: {
    fontSize: 20,
  },
  ruleTitle: {
    margin: 0,
    fontSize: 22,
  },
  ruleContent: {
    color: "#dbeafe",
    lineHeight: 1.8,
  },
  listRow: {
    marginBottom: 6,
  },
  rankList: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  rankPill: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontWeight: "bold",
  },
  footerPanel: {
    borderRadius: 26,
    padding: 22,
    background:
      "linear-gradient(135deg, rgba(14,28,68,0.92), rgba(7,18,42,0.82))",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  footerPanelInner: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  footerKicker: {
    color: "#bfdbfe",
    fontSize: 13,
    marginBottom: 8,
  },
  footerTitle: {
    margin: 0,
    fontSize: 28,
  },
  footerText: {
    marginTop: 10,
    marginBottom: 0,
    maxWidth: 700,
    color: "#dbeafe",
    lineHeight: 1.7,
  },
  footerBadgeWrap: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  footerBadge: {
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontWeight: "bold",
  },
}