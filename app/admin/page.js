"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import * as XLSX from "xlsx"
import {
  defaultCreators,
  getStatusText,
  normalizeCreator,
  formatMinutes,
} from "@/lib/creators"

export default function AdminPage() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [creators, setCreators] = useState(defaultCreators)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef(null)

  useEffect(() => {
    const storedCreators = localStorage.getItem("pp_creators")
    if (storedCreators) {
      setCreators(JSON.parse(storedCreators))
    }

    const storedAdminSession = localStorage.getItem("pp_admin_logged_in")
    if (storedAdminSession === "true") {
      setAdminLoggedIn(true)
    }
  }, [])

  function handleLogout() {
    setAdminLoggedIn(false)
    localStorage.removeItem("pp_admin_logged_in")
    window.location.href = "/"
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

        // FIX: skip the first "Exported at..." row
        const rows = XLSX.utils.sheet_to_json(firstSheet, {
          range: 1,
        })

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
      } catch (error) {
        console.error(error)
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

  if (!adminLoggedIn) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={styles.top}>
            <div style={styles.brand}>
              <img
                src="/logo.png"
                alt="Platinum Pulse Network"
                style={styles.logo}
              />
              <div>
                <div style={styles.kicker}>Platinum Pulse Network</div>
                <h1 style={styles.title}>Admin Panel</h1>
              </div>
            </div>

            <Link href="/" style={styles.linkBtn}>
              Home
            </Link>
          </div>

          <div style={styles.error}>
            Admin access only. Enter the secret admin username on the splash page.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <div style={styles.card}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <img
              src="/logo.png"
              alt="Platinum Pulse Network"
              style={styles.logo}
            />
            <div>
              <div style={styles.kicker}>Platinum Pulse Network</div>
              <h1 style={styles.title}>Admin Panel</h1>
            </div>
          </div>

          <div style={styles.topLinks}>
            <button onClick={handleLogout} style={styles.linkBtnButton}>
              Logout
            </button>
            <Link href="/" style={styles.linkBtn}>
              Home
            </Link>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={styles.button}
          >
            Import Creator File
          </button>

          <button onClick={exportCreators} style={styles.button}>
            Export Creator Data
          </button>
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
    padding: 24,
  },
  card: {
    maxWidth: 1280,
    margin: "0 auto",
    borderRadius: 30,
    padding: 28,
    background:
      "linear-gradient(180deg, rgba(10,25,61,0.74), rgba(7,18,42,0.7))",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
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
    width: 72,
    height: 72,
    objectFit: "contain",
  },
  kicker: {
    color: "#dbeafe",
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    margin: 0,
    fontSize: 42,
  },
  topLinks: {
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
  },
  linkBtnButton: {
    padding: "14px 18px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
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
  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 18,
  },
  error: {
    marginTop: 10,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(239,68,68,0.14)",
    border: "1px solid rgba(239,68,68,0.24)",
    color: "#fecaca",
  },
  success: {
    marginBottom: 16,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(34,197,94,0.14)",
    border: "1px solid rgba(34,197,94,0.24)",
    color: "#bbf7d0",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  },
  td: {
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
}