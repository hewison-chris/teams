import {Bars} from "./bars.js"
import {Teams} from "./teams.js"
import {Schedule} from "./matches.js"

const form = document.getElementById("info")
form.addEventListener("submit", schedule)

function schedule(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const values = Object.fromEntries(formData)
  const barCount = parseInt(<string>values.bars)
  const teamCount = parseInt(<string>values.teams)
  if (teamCount > 2 * barCount) alert("Only a maximum of two teams per bar is supported!")
  if (teamCount < barCount) alert("There needs to be at least one team per bar!")
  const matchCount = parseInt(<string>values.matches)
  const barLetters = document.getElementById("barLetters")
  const bars = new Bars(barCount)
  barLetters.innerText = `Bars: ${bars.toString()}`
  const oneTeamBars = document.getElementById("oneTeamBars")
  const teams = new Teams(teamCount, bars)
  oneTeamBars.innerText = `Bars with one team: ${bars.barsWithOneTeam().toString()}`
  const twoTeamBars = document.getElementById("twoTeamBars")
  twoTeamBars.innerText = `Bars with two teams: ${bars.barsWithTwoTeams().toString()}`
  const teamLetters = document.getElementById("teamLetters")
  teamLetters.innerText = `Teams: ${teams.toString()}`
  const scheduleWeeks = document.getElementById("scheduleWeeks")
  while (scheduleWeeks.firstChild) {
    scheduleWeeks.removeChild(scheduleWeeks.firstChild)
  }
  console.log("Schedule...")
  const schedule = new Schedule(bars, teams, matchCount)
  schedule.calculate()
  schedule.weeks.forEach(week => {
    let weekHeader = document.createElement("h2")
    weekHeader.innerText = `WEEK ${week.weekNumber().toString()}`
    scheduleWeeks.appendChild(weekHeader)
    week.matches.forEach(match => {
      let item = document.createElement("li")
      item.appendChild(document.createTextNode(match.toString()))
      scheduleWeeks.appendChild(item)
    })
  })
}
