const started = Date.now()

const menus = document.querySelectorAll(".menu")
const pages = document.querySelectorAll(".page")
const pageTitle = document.getElementById("pageTitle")
const sidebar = document.getElementById("sidebar")
const mobileMenu = document.getElementById("mobileMenu")

const titles = {
  dashboard: "Dashboard",
  system: "System Information",
  runtime: "Web Runtime",
  about: "About Maxiel"
}

menus.forEach(menu => {

  menu.addEventListener("click", () => {

    const target = menu.dataset.page

    menus.forEach(item => {
      item.classList.remove("active")
    })

    pages.forEach(page => {
      page.classList.remove("active")
    })

    menu.classList.add("active")

    const page = document.getElementById(target)

    if (page) {
      page.classList.add("active")
    }

    pageTitle.textContent = titles[target] || "Maxiel"

    sidebar.classList.remove("open")
  })

})

mobileMenu.addEventListener("click", () => {
  sidebar.classList.toggle("open")
})


function updateClock() {

  const now = new Date()

  const time =
    now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    })

  const date =
    now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    })

  document.getElementById("clock").textContent = time
  document.getElementById("date").textContent = date

  document.getElementById("lastUpdate").textContent =
    time
}


function formatRuntime(ms) {

  let seconds = Math.floor(ms / 1000)

  const days = Math.floor(seconds / 86400)

  seconds %= 86400

  const hours = Math.floor(seconds / 3600)

  seconds %= 3600

  const minutes = Math.floor(seconds / 60)

  seconds %= 60

  return (
    String(days).padStart(2, "0") +
    ":" +
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  )
}


function updateRuntime() {

  const elapsed = Date.now() - started

  const value = formatRuntime(elapsed)

  document.getElementById("runtime").textContent =
    value

  document.getElementById("runtimeBig").textContent =
    value
}


function detectBrowser() {

  const ua = navigator.userAgent

  if (/Edg/i.test(ua)) {
    return "Microsoft Edge"
  }

  if (/OPR/i.test(ua)) {
    return "Opera"
  }

  if (/Chrome/i.test(ua)) {
    return "Google Chrome"
  }

  if (/Firefox/i.test(ua)) {
    return "Mozilla Firefox"
  }

  if (/Safari/i.test(ua)) {
    return "Safari"
  }

  return "Unknown Browser"
}


function detectPlatform() {

  const ua = navigator.userAgent

  if (/Android/i.test(ua)) {
    return "Android"
  }

  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "iOS"
  }

  if (/Windows/i.test(ua)) {
    return "Windows"
  }

  if (/Mac/i.test(ua)) {
    return "macOS"
  }

  if (/Linux/i.test(ua)) {
    return "Linux"
  }

  return navigator.platform || "Unknown"
}


function updateSystem() {

  const platform = detectPlatform()
  const browser = detectBrowser()
  const language = navigator.language || "-"
  const screenSize =
    `${screen.width} × ${screen.height}`

  const viewport =
    `${window.innerWidth} × ${window.innerHeight}`

  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone

  let connection = "Unknown"

  if (navigator.connection) {
    connection =
      navigator.connection.effectiveType ||
      "Connected"
  }

  const cookies =
    navigator.cookieEnabled
      ? "Enabled"
      : "Disabled"

  document.getElementById("platform").textContent =
    platform

  document.getElementById("browser").textContent =
    browser

  document.getElementById("language").textContent =
    language

  document.getElementById("screen").textContent =
    screenSize

  document.getElementById("sysPlatform").textContent =
    platform

  document.getElementById("sysBrowser").textContent =
    browser

  document.getElementById("sysLanguage").textContent =
    language

  document.getElementById("sysScreen").textContent =
    screenSize

  document.getElementById("sysViewport").textContent =
    viewport

  document.getElementById("sysTimezone").textContent =
    timezone

  document.getElementById("sysConnection").textContent =
    connection

  document.getElementById("sysCookies").textContent =
    cookies
}


function updateStarted() {

  const start =
    new Date(started)

  document.getElementById("startedAt").textContent =
    start.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
}


updateClock()
updateRuntime()
updateSystem()
updateStarted()

setInterval(updateClock, 1000)
setInterval(updateRuntime, 1000)
setInterval(updateSystem, 5000)

window.addEventListener("resize", updateSystem)

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateClock()
    updateRuntime()
  }
})