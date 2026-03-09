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
  getDiamondCoins,
  getLiveHourCoins,
  getValidDayCoins,
  getPlacementCoins,
  getStreakCoins,
  getMilestoneCoins,
  getTotalCoins,
  INCENTIVE_DAYS_TARGET,
  INCENTIVE_HOURS_TARGET,
} from "@/lib/creators"

function StatCard({ icon, title, value, sub }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statTop}>
        <span style={styles.statIcon}>{icon}</span>
        <span style={styles.statTitle}>{title}</span>
      </div>
      <div style={styles.statValue}>{value}</div>
      {sub ? <div style={styles.statSub}>{sub}</div> : null}
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
      .sort((a, b) => getTotalCoins(b) - getTotalCoins(a))
      .map((creator, index) => ({ ...creator, rank: index + 1 }))
  }, [creators])

  const creator =
    leaderboard.find(
      (c) => c.username.toLowerCase() === String(params.username).toLowerCase()
    ) || null

  if (!creator) {
    return (
      <main style={styles.page}>
        <div style={styles.pageGlowOne} />
        <div style={styles.pageGlowTwo} />
        <div style={styles.shell}>
          <div style={styles.card}>
            <h1 style={{ marginTop: 0 }}>Creator not found</h1>
            <Link href="/" style={styles.linkBtn}>Home</Link>
          </div>
        </div>
      </main>
    )
  }

  const liveHours = formatHoursDecimal(creator.liveMinutes)
  const daysProgress = getDaysProgress(creator.validLiveDays)
  const hoursProgress = getHoursProgress(creator.liveMinutes)
  const status = getStatusText(creator)
  const totalCoins = getTotalCoins(creator)
  const minutesTarget = INCENTIVE_HOURS_TARGET * 60
  const minutesRemaining = Math.max(minutesTarget - creator.liveMinutes, 0)
  const daysRemaining = Math.max(INCENTIVE_DAYS_TARGET - creator.validLiveDays, 0)

  return (
    <main style={styles.page}>
      <div style={styles.pageGlowOne} />
      <div style={styles.pageGlowTwo} />

      <div style={styles.shell}>
        <div style={styles.card}>
          <div style={styles.hero}>
            <div style={styles.heroLeft}>
              <div style={styles.avatarWrap}>
                <div style={styles.avatarHalo} />
                <img
                  src={`https://unavatar.io/tiktok/${creator.username}`}
                  alt={creator.username}
                  style={styles.avatar}
                  onError={(e) => {
                    e.currentTarget.src = "/logo.png"
                  }}
                />
              </div>

              <div>
                <div style={styles.kicker}>⚡ Platinum Pulse Network ⚡</div>
                <h1 style={styles.username}>@{creator.username}</h1>

                <div style={styles.heroBadges}>
                  <span style={styles.rankBadge}>🏆 Rank #{creator.rank}</span>
                  <span style={styles.tierBadge}>{creator.level || "Tier 1"}</span>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(status === "Redeemable" ? styles.statusGood : styles.statusWarn),
                    }}
                  >
                    {status}
                  </span>
                </div>

                <p style={styles.heroText}>
                  Your creator dashboard shows imported diamonds, LIVE progress,
                  incentive qualification, and Platinum Coin breakdown.
                </p>
              </div>
            </div>

            <div style={styles.heroLinks}>
              <Link href="/leaderboard" style={styles.linkBtn}>Leaderboard</Link>
              <Link href="/incentives" style={styles.linkBtn}>Incentives</Link>
              <Link href="/" style={styles.linkBtn}>Home</Link>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <StatCard
              icon="💎"
              title="Diamonds"
              value={creator.diamonds.toLocaleString()}
              sub="Imported creator data"
            />
            <StatCard
              icon="⚡"
              title="Platinum Coins"
              value={totalCoins.toLocaleString()}
              sub="Calculated from your performance"
            />
            <StatCard
              icon="📅"
              title="Valid LIVE Days"
              value={creator.validLiveDays}
              sub={`Target: ${INCENTIVE_DAYS_TARGET}`}
            />
            <StatCard
              icon="⏱️"
              title="LIVE Hours"
              value={liveHours}
              sub={`Target: ${INCENTIVE_HOURS_TARGET}`}
            />
          </div>

          <div style={styles.twoCol}>
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Qualification Progress</h2>
                <span style={styles.panelTag}>Incentives</span>
              </div>

              <div style={styles.reqBlock}>
                <div style={styles.reqHeader}>
                  <span>Valid LIVE Days</span>
                  <strong>{creator.validLiveDays}/{INCENTIVE_DAYS_TARGET}</strong>
                </div>
                <ProgressBar value={daysProgress} />
                <div style={styles.smallText}>
                  {daysRemaining === 0
                    ? "LIVE day target reached"
                    : `${daysRemaining} more valid day${daysRemaining === 1 ? "" : "s"} needed`}
                </div>
              </div>

              <div style={styles.reqBlock}>
                <div style={styles.reqHeader}>
                  <span>LIVE Hours</span>
                  <strong>{liveHours}/{INCENTIVE_HOURS_TARGET}</strong>
                </div>
                <ProgressBar value={hoursProgress} />
                <div style={styles.smallText}>
                  {minutesRemaining === 0
                    ? "LIVE hour target reached"
                    : `${formatMinutes(minutesRemaining)} more needed`}
                </div>
              </div>

              <div style={styles.summaryStrip}>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Status</span>
                  <strong style={styles.summaryValue}>{status}</strong>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Eligible Days</span>
                  <strong style={styles.summaryValue}>{creator.eligibleIncentiveDays || 0}</strong>
                </div>
              </div>
            </div>

            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Creator Insights</h2>
                <span style={styles.panelTag}>Imported</span>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Estimated Bonus</div>
                  <div style={styles.infoValue}>{formatCurrency(creator.estimatedBonusContribution)}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Ratio</div>
                  <div style={styles.infoValue}>{creator.ratio ?? 0}%</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Creator ID</div>
                  <div style={styles.infoValueSmall}>{creator.creatorId || "Not available"}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Month</div>
                  <div style={styles.infoValue}>{creator.month || "Current"}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.twoCol}>
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Coin Breakdown</h2>
                <span style={styles.panelTag}>Agency System</span>
              </div>

              <div style={styles.coinList}>
                <div style={styles.coinRow}>
                  <span>💎 Diamond Coins</span>
                  <strong>{getDiamondCoins(creator.diamonds)}</strong>
                </div>
                <div style={styles.coinRow}>
                  <span>⏱️ LIVE Hour Coins</span>
                  <strong>{getLiveHourCoins(creator.liveMinutes)}</strong>
                </div>
                <div style={styles.coinRow}>
                  <span>📅 Valid Day Coins</span>
                  <strong>{getValidDayCoins(creator.validLiveDays)}</strong>
                </div>
                <div style={styles.coinRow}>
                  <span>🏆 Placement Bonus</span>
                  <strong>{getPlacementCoins(creator.dailyTopPlacements || [])}</strong>
                </div>
                <div style={styles.coinRow}>
                  <span>🔥 Streak Reward</span>
                  <strong>{getStreakCoins(creator.streakDays || 0)}</strong>
                </div>
                <div style={styles.coinRow}>
                  <span>🌙 Milestone Reward</span>
                  <strong>{getMilestoneCoins(creator)}</strong>
                </div>
              </div>

              <div style={styles.totalRow}>
                <span>Total Platinum Coins</span>
                <strong>{totalCoins}</strong>
              </div>
            </div>

            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Creator Snapshot</h2>
                <span style={styles.panelTag}>Summary</span>
              </div>

              <div style={styles.snapshotGrid}>
                <div style={styles.snapshotCard}>
                  <div style={styles.snapshotLabel}>💎 Diamonds</div>
                  <div style={styles.snapshotValue}>{creator.diamonds.toLocaleString()}</div>
                </div>
                <div style={styles.snapshotCard}>
                  <div style={styles.snapshotLabel}>⚡ LIVE Duration</div>
                  <div style={styles.snapshotValue}>{formatMinutes(creator.liveMinutes)}</div>
                </div>
                <div style={styles.snapshotCard}>
                  <div style={styles.snapshotLabel}>📅 Valid Days</div>
                  <div style={styles.snapshotValue}>{creator.validLiveDays}</div>
                </div>
                <div style={styles.snapshotCard}>
                  <div style={styles.snapshotLabel}>🎯 Eligible Days</div>
                  <div style={styles.snapshotValue}>{creator.eligibleIncentiveDays || 0}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.bottomPanel}>
            <div style={styles.bottomGlow} />
            <div style={styles.bottomContent}>
              <div>
                <div style={styles.bottomKicker}>Performance Summary</div>
                <h3 style={styles.bottomTitle}>Keep pushing your LIVE targets</h3>
                <p style={styles.bottomText}>
                  Hit {INCENTIVE_DAYS_TARGET} valid days and {INCENTIVE_HOURS_TARGET} LIVE hours
                  to fully qualify for monthly incentives and maximise your Platinum Coin total.
                </p>
              </div>

              <div style={styles.bottomStats}>
                <div style={styles.bottomStat}>
                  <span style={styles.bottomStatLabel}>Days Left</span>
                  <strong style={styles.bottomStatValue}>{daysRemaining}</strong>
                </div>
                <div style={styles.bottomStat}>
                  <span style={styles.bottomStatLabel}>Hours Left</span>
                  <strong style={styles.bottomStatValue}>
                    {minutesRemaining > 0 ? formatMinutes(minutesRemaining) : "0h 0m"}
                  </strong>
                </div>
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
    background: "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
    filter: "blur(16px)",
  },
  pageGlowTwo: {
    position: "absolute",
    width: 620,
    height: 620,
    borderRadius: "50%",
    bottom: -220,
    right: -160,
    background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 70%)",
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
    gap: 24,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 26,
  },
  heroLeft: {
    display: "flex",
    gap: 20,
    alignItems: "center",
    flexWrap: "wrap",
  },
  avatarWrap: {
    position: "relative",
    width: 122,
    height: 122,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarHalo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(103,232,249,0.28), rgba(59,130,246,0.14), transparent 72%)",
    filter: "blur(18px)",
  },
  avatar: {
    position: "relative",
    width: 112,
    height: 112,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(255,255,255,0.16)",
    boxShadow: "0 0 22px rgba(56,189,248,0.14)",
  },
  kicker: {
    color: "#dbeafe",
    fontSize: 14,
    marginBottom: 8,
  },
  username: {
    margin: 0,
    fontSize: 40,
    lineHeight: 1.05,
  },
  heroBadges: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },
  rankBadge: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(56,189,248,0.12)",
    border: "1px solid rgba(56,189,248,0.28)",
    color: "#d9f7ff",
    fontWeight: "bold",
    fontSize: 13,
  },
  tierBadge: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontWeight: "bold",
    fontSize: 13,
  },
  statusBadge: {
    padding: "8px 12px",
    borderRadius: 999,
    fontWeight: "bold",
    fontSize: 13,
    border: "1px solid transparent",
  },
  statusGood: {
    background: "rgba(34,197,94,0.14)",
    border: "1px solid rgba(34,197,94,0.24)",
    color: "#bbf7d0",
  },
  statusWarn: {
    background: "rgba(245,158,11,0.14)",
    border: "1px solid rgba(245,158,11,0.24)",
    color: "#fde68a",
  },
  heroText: {
    marginTop: 14,
    marginBottom: 0,
    maxWidth: 640,
    color: "#dbeafe",
    lineHeight: 1.7,
    fontSize: 15,
  },
  heroLinks: {
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 22,
  },
  statCard: {
    borderRadius: 22,
    padding: 22,
    background:
      "linear-gradient(180deg, rgba(13,28,69,0.92), rgba(8,18,46,0.82))",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  },
  statTop: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 18,
  },
  statTitle: {
    color: "#bfdbfe",
    fontSize: 14,
  },
  statValue: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 1.1,
  },
  statSub: {
    marginTop: 10,
    color: "#dbeafe",
    fontSize: 13,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 16,
    marginBottom: 18,
  },
  panel: {
    borderRadius: 24,
    padding: 22,
    background:
      "linear-gradient(180deg, rgba(12,26,64,0.88), rgba(7,18,42,0.82))",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  panelTitle: {
    margin: 0,
    fontSize: 24,
  },
  panelTag: {
    padding: "7px 11px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "bold",
  },
  reqBlock: {
    marginTop: 18,
  },
  reqHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "#dbeafe",
  },
  progressTrack: {
    width: "100%",
    height: 14,
    background: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%)",
    borderRadius: 999,
  },
  smallText: {
    marginTop: 8,
    color: "#dbeafe",
    fontSize: 13,
    lineHeight: 1.5,
  },
  summaryStrip: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  summaryItem: {
    padding: 14,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "grid",
    gap: 6,
  },
  summaryLabel: {
    color: "#bfdbfe",
    fontSize: 13,
  },
  summaryValue: {
    fontSize: 16,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "grid",
    gap: 8,
  },
  infoLabel: {
    color: "#bfdbfe",
    fontSize: 13,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoValueSmall: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 1.5,
    wordBreak: "break-all",
  },
  coinList: {
    display: "grid",
    gap: 10,
  },
  coinRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    color: "#dbeafe",
  },
  totalRow: {
    marginTop: 16,
    padding: "16px 18px",
    borderRadius: 16,
    background: "rgba(103,232,249,0.08)",
    border: "1px solid rgba(103,232,249,0.18)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    fontSize: 18,
    color: "#cffafe",
  },
  snapshotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  snapshotCard: {
    padding: 16,
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "grid",
    gap: 8,
  },
  snapshotLabel: {
    color: "#bfdbfe",
    fontSize: 13,
  },
  snapshotValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  bottomPanel: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 26,
    padding: 24,
    background:
      "linear-gradient(135deg, rgba(16,34,79,0.92), rgba(7,18,42,0.82))",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  bottomGlow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    right: -80,
    top: -80,
    background: "radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)",
    filter: "blur(12px)",
  },
  bottomContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  bottomKicker: {
    color: "#bfdbfe",
    fontSize: 13,
    marginBottom: 8,
  },
  bottomTitle: {
    margin: 0,
    fontSize: 28,
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 0,
    maxWidth: 640,
    color: "#dbeafe",
    lineHeight: 1.7,
  },
  bottomStats: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  bottomStat: {
    minWidth: 150,
    padding: 16,
    borderRadius: 18,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "grid",
    gap: 8,
  },
  bottomStatLabel: {
    color: "#bfdbfe",
    fontSize: 13,
  },
  bottomStatValue: {
    fontSize: 24,
  },
}