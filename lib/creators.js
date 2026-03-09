export const INCENTIVE_DAYS_TARGET = 15
export const INCENTIVE_HOURS_TARGET = 40
export const INCENTIVE_PERIOD_DAYS = 30
export const NEXT_TIER_DIAMONDS = 100000

export const defaultCreators = [
  {
    id: 1,
    creatorId: "7614187880910471184",
    username: "shanie.louise",
    avatar: "/logo.png",
    diamonds: 12000,
    validLiveDays: 12,
    liveMinutes: 42 * 60,
    eligibleIncentiveDays: 12,
    level: "Tier 1",
    estimatedBonusContribution: 0,
    ratio: 0,
    month: "2026-03",
    streakDays: 5,
    dailyTopPlacements: [1, 4],
    milestone75kCount: 0,
    milestone150kCount: 0,
    milestone500kCount: 0,
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: i < 12 ? 1000 : 0,
      liveMinutes: i < 12 ? 120 : 0,
      hourAchieved: i < 12,
    })),
  },
  {
    id: 2,
    creatorId: "7607536558354317328",
    username: "chaossprout",
    avatar: "/logo.png",
    diamonds: 120000,
    validLiveDays: 20,
    liveMinutes: 55 * 60,
    eligibleIncentiveDays: 20,
    level: "Tier 2",
    estimatedBonusContribution: 0,
    ratio: 0,
    month: "2026-03",
    streakDays: 10,
    dailyTopPlacements: [1, 2, 3, 5],
    milestone75kCount: 1,
    milestone150kCount: 0,
    milestone500kCount: 0,
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: i < 20 ? 6000 : 0,
      liveMinutes: i < 20 ? 165 : 0,
      hourAchieved: i < 20,
    })),
  },
  {
    id: 3,
    creatorId: "7613757241828589569",
    username: "alishaesme",
    avatar: "/logo.png",
    diamonds: 78000,
    validLiveDays: 16,
    liveMinutes: 44 * 60,
    eligibleIncentiveDays: 16,
    level: "Tier 1",
    estimatedBonusContribution: 0,
    ratio: 0,
    month: "2026-03",
    streakDays: 3,
    dailyTopPlacements: [2],
    milestone75kCount: 1,
    milestone150kCount: 0,
    milestone500kCount: 0,
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: i < 16 ? 4800 : 0,
      liveMinutes: i < 16 ? 165 : 0,
      hourAchieved: i < 16,
    })),
  },
]

export function toNumber(value, fallback = 0) {
  if (value === undefined || value === null || value === "") return fallback
  const num = Number(String(value).replace(/[^\d.-]/g, ""))
  return Number.isNaN(num) ? fallback : num
}

// FIXED: decimal numbers in your spreadsheet are hours, so multiply by 60 only
export function parseDurationToMinutes(value) {
  if (value === undefined || value === null || value === "") return 0

  if (typeof value === "number") {
    return Math.round(value * 60)
  }

  const text = String(value).trim().toLowerCase()

  const hmMatch = text.match(/(\d+)\s*h\s*(\d+)\s*m/)
  if (hmMatch) return Number(hmMatch[1]) * 60 + Number(hmMatch[2])

  const hOnlyMatch = text.match(/(\d+)\s*h/)
  if (hOnlyMatch) return Number(hOnlyMatch[1]) * 60

  const colonMatch = text.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)
  if (colonMatch) {
    const hours = Number(colonMatch[1]) || 0
    const minutes = Number(colonMatch[2]) || 0
    const seconds = Number(colonMatch[3]) || 0
    return Math.round(hours * 60 + minutes + seconds / 60)
  }

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
  return isQualified(creator) ? "Redeemable" : "Not redeemable yet"
}

export function getDiamondCoins(diamonds) {
  if (diamonds <= 0) return 0
  if (diamonds <= 1000) return 10
  return 10 + Math.floor((diamonds - 1000) / 1000) * 5
}

export function getLiveHourCoins(liveMinutes) {
  return Math.floor(liveMinutes / 60) * 3
}

export function getValidDayCoins(validLiveDays) {
  return validLiveDays * 3
}

export function getPlacementCoins(placements = []) {
  const map = { 1: 25, 2: 20, 3: 15, 4: 10, 5: 5 }
  return placements.reduce((sum, place) => sum + (map[place] || 0), 0)
}

export function getStreakCoins(streakDays = 0) {
  let total = 0
  if (streakDays >= 3) total += 15
  if (streakDays >= 5) total += 25
  if (streakDays >= 10) total += 50
  if (streakDays >= 20) total += 100
  if (streakDays >= 30) total += 150
  return total
}

export function getMilestoneCoins(creator) {
  let total = 0
  total += (creator.milestone75kCount || 0) * 1000

  if ((creator.milestone150kCount || 0) >= 1) total += 2000
  if ((creator.milestone150kCount || 0) >= 2) total += 1750

  total += (creator.milestone500kCount || 0) * 6000

  return total
}

export function getTotalCoins(creator) {
  return (
    getDiamondCoins(creator.diamonds) +
    getLiveHourCoins(creator.liveMinutes) +
    getValidDayCoins(creator.validLiveDays) +
    getPlacementCoins(creator.dailyTopPlacements) +
    getStreakCoins(creator.streakDays) +
    getMilestoneCoins(creator)
  )
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

  const diamonds = toNumber(
    row["Diamonds in L30D"] ?? row.Diamonds ?? row.diamonds ?? 0
  )

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

  return {
    id: index + 1,
    creatorId: String(creatorId),
    username: String(username).trim(),
    avatar: "/logo.png",
    diamonds,
    validLiveDays,
    liveMinutes,
    eligibleIncentiveDays,
    level: row.Level || row.level || "Tier 1",
    estimatedBonusContribution: toNumber(
      row["Estimated bonus contribution"] ?? row.estimatedBonusContribution ?? 0
    ),
    ratio: toNumber(row.Ratio ?? row.ratio ?? 0),
    month: "2026-03",
    streakDays: toNumber(row["Streak days"] ?? row.streakDays ?? 0),
    dailyTopPlacements: [],
    milestone75kCount: toNumber(
      row["75k milestone count"] ?? row.milestone75kCount ?? 0
    ),
    milestone150kCount: toNumber(
      row["150k milestone count"] ?? row.milestone150kCount ?? 0
    ),
    milestone500kCount: toNumber(
      row["500k milestone count"] ?? row.milestone500kCount ?? 0
    ),
    dailyActivity: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      diamonds: 0,
      liveMinutes: 0,
      hourAchieved: false,
    })),
  }
}