import { Bars } from "./bars.js";
import { Teams } from "./teams.js";
import { Schedule } from "./matches.js";
const form = document.getElementById("info");
form.addEventListener("submit", schedule);
function schedule(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);
    const barCount = parseInt(values.barCount);
    const teamCount = parseInt(values.teamCount);
    if (teamCount > 2 * barCount)
        alert("Only a maximum of two teams per bar is supported!");
    if (teamCount < barCount)
        alert("There needs to be at least one team per bar!");
    const weekCount = parseInt(values.weekCount);
    const barLetters = document.getElementById("barLetters");
    const bars = new Bars(barCount);
    barLetters.innerText = `Bars: ${bars.toString()}`;
    const oneTeamBars = document.getElementById("oneTeamBars");
    const teams = new Teams(teamCount, bars);
    oneTeamBars.innerText = `Bars with one team: ${bars.barsWithOneTeam().toString()}`;
    const twoTeamBars = document.getElementById("twoTeamBars");
    twoTeamBars.innerText = `Bars with two teams: ${bars.barsWithTwoTeams().toString()}`;
    const teamLetters = document.getElementById("teamLetters");
    teamLetters.innerText = `Teams: ${teams.toString()}`;
    const results = document.getElementById("results");
    if (results !== null)
        while (results.firstChild) {
            results.removeChild(results.firstChild);
        }
    console.log("Schedule...");
    const schedule = new Schedule(bars, teams, weekCount);
    schedule.makeSchedule();
    schedule.weeks.forEach(week => {
        let weekHeader = document.createElement("h2");
        weekHeader.innerText = `WEEK ${week.weekNumber().toString()}`;
        results.appendChild(weekHeader);
        week.matches.forEach(match => {
            let item = document.createElement("h3");
            item.appendChild(document.createTextNode(match.toString()));
            results.appendChild(item);
        });
    });
    teams.teams.forEach(t => {
        let stats = document.createElement("h3");
        let statsHome = document.createElement("p");
        let statsAway = document.createElement("p");
        stats.innerText = `${t} plays ${t.matchCount()} matches: ${t.homeCount()} home and and ${t.awayCount()} away`;
        statsHome.innerText = `HOME: ${t.homeMatches().map(m => m.awayTeam.id())}`;
        statsAway.innerText = `AWAY: ${t.awayMatches().map(m => m.homeTeam.id())}`;
        results.appendChild(stats);
        results.appendChild(statsHome);
        results.appendChild(statsAway);
    });
}
//# sourceMappingURL=main.js.map