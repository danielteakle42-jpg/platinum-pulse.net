"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import * as XLSX from "xlsx"
import { defaultCreators, getStatusText, normalizeCreator, formatMinutes } from "@/lib/creators"

export default function AdminPage() {
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [adminError, setAdminError] = useState("")
  const [creators, setCreators] = useState(defaultCreators)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem("pp_creators")
    if (stored) setCreators(JSON.parse(stored))
  }, [])

  function handleLogin() {
    if (
      adminEmail.trim().toLowerCase() === "admin@platinumpulse.com" &&
      adminPassword === "platinumadmin"
    ) {
      setAdminLoggedIn(true)
      setAdminError("")
      return
    }
    setAdminError("Wrong admin email or password.")
  }

  function handleFileUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: "array" })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(firstSheet)
        const parsed = rows
          .map((row, index) => normalizeCreator(row, index))
          .filter((row) => row.username)

        if (parsed.length) {
          setCreators(parsed)
          localStorage.setItem("pp_creators", JSON.stringify(parsed))
          setMessage(`Imported ${parsed.length} creators successfully.`)
        } else {
          setMessage("No valid creator rows found in the file.")
        }
      } catch {
        setMessage("Upload failed. Please use a valid Excel or CSV file.")
      }
    }
    reader.readAsArrayBuffer(file)
  }

  function exportCreators() {
    const exportRows = creators.map((creator) => ({
      creatorId: creator.creatorId,
      username: creator.username,
      diamonds: creator.diamonds,
      validLiveDays: creator.validLiveDays,
      liveMinutes: creator.liveMinutes,
      eligibleIncentiveDays: creator.eligibleIncentiveDays,
      level: creator.level,
      estimatedBonusContribution: creator.estimatedBonusContribution,
      ratio: creator.ratio,
      qualified: getStatusText(creator),
    }))
    const worksheet = XLSX.utils.json_to_sheet(exportRows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Creators")
    XLSX.writeFile(workbook, "platinum-pulse-creators-export.xlsx")
  }

  return (
    <main style={styles.page}>
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} style={{ display: "none" }} />
      <div style={styles.card}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="Platinum Pulse Network" style={styles.logo} />
            <div>
              <div style={styles.kicker}>Platinum Pulse Network</div>
              <h1 style={styles.title}>Admin Page</h1>
            </div>
          </div>
          <Link href="/" style={styles.linkBtn}>Back</Link>
        </div>

        {!adminLoggedIn ? (
          <div style={styles.loginCard}>
            <input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="Admin email" style={styles.input} />
            <input value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Password" type="password" style={styles.input} />
            <button onClick={handleLogin} style={styles.button}>Admin Login</button>
            {adminError ? <div style={styles.error}>{adminError}</div> : null}
          </div>
        ) : (
          <>
            <div style={styles.actions}>
              <button onClick={() => fileInputRef.current?.click()} style={styles.button}>Import Creator File</button>
              <button onClick={exportCreators} style={styles.button}>Export Creator Data</button>
            </div>
            {message ? <div style={styles.success}>{message}</div> : null}
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Username</th>
                    <th style={styles.th}>Diamonds</th>
                    <th style={styles.th}>LIVE Days</th>
                    <th style={styles.th}>LIVE Hours</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.map((creator) => (
                    <tr key={creator.id}>
                      <td style={styles.td}>@{creator.username}</td>
                      <td style={styles.td}>{creator.diamonds}</td>
                      <td style={styles.td}>{creator.validLiveDays}</td>
                      <td style={styles.td}>{formatMinutes(creator.liveMinutes)}</td>
                      <td style={styles.td}>{getStatusText(creator)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
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
  loginCard: { maxWidth: 520, display: "grid", gap: 12 },
  input: { width: "100%", padding: "18px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.08)", color: "white", fontSize: 17, outline: "none" },
  button: { padding: "18px 26px", borderRadius: 16, border: "none", background: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)", color: "#062033", cursor: "pointer", fontWeight: "bold", fontSize: 17 },
  actions: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 },
  error: { marginTop: 10, padding: "14px 16px", borderRadius: 16, background: "rgba(239,68,68,0.14)", border: "1px solid rgba(239,68,68,0.24)", color: "#fecaca" },
  success: { marginBottom: 16, padding: "14px 16px", borderRadius: 16, background: "rgba(34,197,94,0.14)", border: "1px solid rgba(34,197,94,0.24)", color: "#bbf7d0" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: 12, borderBottom: "1px solid rgba(255,255,255,0.12)" },
  td: { padding: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" },
}
