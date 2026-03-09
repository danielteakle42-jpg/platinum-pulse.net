"use client"

import Link from "next/link"
import { INCENTIVE_DAYS_TARGET, INCENTIVE_HOURS_TARGET, INCENTIVE_PERIOD_DAYS } from "@/lib/creators"

export default function IncentivesPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
            <div>
              <div style={styles.kicker}>Platinum Pulse Network</div>
              <h1 style={styles.title}>How Incentives Work</h1>
            </div>
          </div>
          <Link href="/" style={styles.linkBtn}>Back</Link>
        </div>

        <div style={styles.grid}>
          <div style={styles.panel}><h2>Incentive Period</h2><p>{INCENTIVE_PERIOD_DAYS} day incentive cycle.</p></div>
          <div style={styles.panel}><h2>Minimum LIVE Days</h2><p>Creators must complete at least {INCENTIVE_DAYS_TARGET} valid LIVE days.</p></div>
          <div style={styles.panel}><h2>Minimum LIVE Hours</h2><p>Creators must complete at least {INCENTIVE_HOURS_TARGET} LIVE hours.</p></div>
          <div style={styles.panel}><h2>Qualification</h2><p>A creator qualifies when both the LIVE day and LIVE hour requirements are met.</p></div>
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
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 },
  panel: { borderRadius: 22, padding: 22, background: "linear-gradient(180deg, rgba(11,26,64,0.82), rgba(8,18,46,0.76))", border: "1px solid rgba(255,255,255,0.12)" },
}
