const form = document.getElementById('info')
const results = document.getElementById('results')
form.addEventListener('submit', schedule)

function schedule(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const values = Object.fromEntries(formData)
  if (typeof values.bars !== "string") new Error("Invalid input")
  if (typeof values.teams !== "string") new Error("Invalid input")
  const barCount = parseInt(values.bars)
  const teamCount = parseInt(values.teams)
  const weekCount = parseInt(values.weeks)
  console.log(`Bar count:${barCount}`)
  console.log(`Team count:${teamCount}`)
  const bars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, barCount))
  let teams = bars.map(b => `${b}1`)
  bars.slice(0, teamCount - barCount).map(t => teams.push(`${t}2`))
  const barLetters = document.getElementById('barLetters')
  barLetters.innerText = `Bars: ${bars.toString()}`
  const teamLetters = document.getElementById('teamLetters')
  teamLetters.innerText = `Teams: ${teams.toString()}`
  const scheduleResult = document.getElementById('scheduleResult')
  let result = "Schedule:\n"
  for (let i = 1; i< weekCount; i++)
    result.concat(weekResult())
  scheduleResult.innerText = result
}

function weekResult(week, unpicked) {
  return `Week ${week}`
}

function pickTeam(unpicked) {
  const i = Math.floor(Math.random() * unpicked.length)
  return unpicked[i]
}
