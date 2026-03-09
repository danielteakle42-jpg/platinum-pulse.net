export const INCENTIVE_DAYS_TARGET = 8
export const INCENTIVE_HOURS_TARGET = 20
export const INCENTIVE_PERIOD_DAYS = 30
export const NEXT_TIER_DIAMONDS = 100000

export const defaultCreators = [
  {
    id: 1,
    creatorId: "7614187880910471184",
    username: "shanie.louise",
    avatar: "/logo.png",
    diamonds: 0,
    validLiveDays: 0,
    liveMinutes: 0,
    eligibleIncentiveDays: 26,
    level: "Tier 1",
    estimatedBonusContribution: 0,
    ratio: 0,
    month: "2026-03",
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: 0,
      liveMinutes: 0,
      hourAchieved: false,
    })),
  },
  {
    id: 2,
    creatorId: "7607536558354317328",
    username: "chaossprout",
    avatar: "/logo.png",
    diamonds: 145,
    validLiveDays: 3,
    liveMinutes: 335,
    eligibleIncentiveDays: 31,
    level: "Tier 1",
    estimatedBonusContribution: 0,
    ratio: 0,
    month: "2026-03",
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: i < 3 ? 20 + i * 10 : 0,
      liveMinutes: i < 3 ? 70 + i * 20 : 0,
      hourAchieved: i < 3,
    })),
  },
  {
    id: 3,
    creatorId: "7613757241828589569",
    username: "alishaesme",
    avatar: "/logo.png",
    diamonds: 125,
    validLiveDays: 2,
    liveMinutes: 264,
    eligibleIncentiveDays: 27,
    level: "Tier 1",
    estimatedBonusContribution: 0,
    ratio: 0,
    month: "2026-03",
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: i < 2 ? 40 + i * 15 : 0,
      liveMinutes: i < 2 ? 110 + i * 20 : 0,
      hourAchieved: i < 2,
    })),
  },
]

export function toNumber(value, fallback = 0) {
  if (value === undefined || value === null || value === "") return fallback
  const num = Number(String(value).replace(/[^\d.-]/g, ""))
  return Number.isNaN(num) ? fallback : num
}

export function parseDurationToMinutes(value) {
  if (value === undefined || value === null || value === "") return 0
  if (typeof value === "number") return Math.round(value * 24 * 60)

  const text = String(value).trim().toLowerCase()
  const hmMatch = text.match(/(\d+)\s*h\s*(\d+)\s*m/)
  if (hmMatch) return Number(hmMatch[1]) * 60 + Number(hmMatch[2])
  const hOnlyMatch = text.match(/(\d+)\s*h/)
  if (hOnlyMatch) return Number(hOnlyMatch[1]) * 60
  const colonMatch = text.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/)
  if (colonMatch) return Number(colonMatch[1]) * 60 + Number(colonMatch[2])
  return 0
}

export function formatMinutes(minutes) {
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hrs}h ${mins}m`
}

export function formatHoursDecimal(minutes) {
  return (minutes / 60).toFixed(1)
}

export function formatCurrency(value) {
  return `$${Number(value || 0).toFixed(2)}`
}

export function isQualified(creator) {
  return (
    creator.validLiveDays >= INCENTIVE_DAYS_TARGET &&
    creator.liveMinutes >= INCENTIVE_HOURS_TARGET * 60
  )
}

export function getDaysProgress(days) {
  return Math.min((days / INCENTIVE_DAYS_TARGET) * 100, 100)
}

export function getHoursProgress(minutes) {
  return Math.min((minutes / (INCENTIVE_HOURS_TARGET * 60)) * 100, 100)
}

export function getTierProgress(diamonds) {
  return Math.min((diamonds / NEXT_TIER_DIAMONDS) * 100, 100)
}

export function getStatusText(creator) {
  return isQualified(creator) ? "Requirements Met" : "Requirements Not Met"
}

export function normalizeCreator(row, index) {
  const creatorId =
    row["Creator ID:"] ||
    row["Creator ID"] ||
    row.creatorId ||
    row["creator id"] ||
    ""

  const username =
    row["Creator's username"] ||
    row["Creator username"] ||
    row.username ||
    row.Username ||
    row.creator ||
    ""

  const diamonds = toNumber(row["Diamonds in L30D"] ?? row.Diamonds ?? row.diamonds ?? 0)
  const validLiveDays = toNumber(
    row["Valid go LIVE days in L30D"] ??
      row["Valid go LIVE days"] ??
      row.validLiveDays ??
      row["live days"] ??
      0
  )
  const liveMinutes = parseDurationToMinutes(
    row["LIVE duration in L30D"] ??
      row["LIVE duration"] ??
      row.liveDuration ??
      row["live duration"] ??
      0
  )
  const eligibleIncentiveDays = toNumber(
    row["Eligible incentive days"] ??
      row.eligibleIncentiveDays ??
      row["eligible days"] ??
      0
  )
  const level = row.Level || row.level || "Tier 1"
  const estimatedBonusContribution = toNumber(
    row["Estimated bonus contribution"] ??
      row.estimatedBonusContribution ??
      0
  )
  const ratio = toNumber(row.Ratio ?? row.ratio ?? 0)

  return {
    id: index + 1,
    creatorId: String(creatorId),
    username: String(username).trim(),
    avatar: "/logo.png",
    diamonds,
    validLiveDays,
    liveMinutes,
    eligibleIncentiveDays,
    level,
    estimatedBonusContribution,
    ratio,
    month: "2026-03",
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: 0,
      liveMinutes: 0,
      hourAchieved: false,
    })),
  }
}
