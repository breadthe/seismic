
// Round a number to 1 decimal
export const round1 = function (num: number): string {
    return (Math.round(num * 10) / 10).toFixed(1)
}

// Converts a timestamp to a difference string like "2 hours ago"
export const diffForHumans = function (timestamp: number): string {
    const diff = Date.now() - timestamp
    const diffSeconds = Math.round(diff / 1000)
    const diffMinutes = Math.round(diffSeconds / 60)
    const diffHours = Math.round(diffMinutes / 60)
    const diffDays = Math.round(diffHours / 24)
    const diffWeeks = Math.round(diffDays / 7)
    const diffMonths = Math.round(diffDays / 30)
    const diffYears = Math.round(diffDays / 365)

    if (diffSeconds < 60) {
        return `${diffSeconds}s ago` // seconds
    } else if (diffMinutes < 60) {
        return `${diffMinutes}m ago` // minutes
    } else if (diffHours < 24) {
        return `${diffHours}h ago` // hours
    } else if (diffDays < 7) {
        return `${diffDays}d ago` // days
    } else if (diffWeeks < 4) {
        return `${diffWeeks}w ago` // weeks
    } else if (diffMonths < 12) {
        return `${diffMonths}mo ago` // months
    } else {
        return `${diffYears}y ago` // years
    }
}

// Converts a timestamp to a local time string like "2023-02-08 07:48:11 (UTC-10:00)"
// actually "2/8/2023, 10:06:22 AM (UTC+10:00)" for me
export const timestampToLocalString = function (timestamp: number): string {
    const date = new Date(timestamp)
    const offset = date.getTimezoneOffset() / 60
    const offsetString = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`
    return `${date.toLocaleString()} (${offsetString}:00)`
}


// Theming functions
export function setIsDark(dark: boolean) {
    const htmlNode = document.querySelector("html")
    dark ? htmlNode?.classList.add("dark") : htmlNode?.classList.remove("dark")
}

export function isDark() {
    return document.querySelector("html")?.classList.contains("dark") || window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function setTheme(theme: string) {
    if (theme === "light") {
        return setIsDark(false)
    }

    if (theme === "dark") {
        return setIsDark(true)
    }

    if (theme === "automatic" || theme === undefined) {
        return setIsDark(
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
    }
}
