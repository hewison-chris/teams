import { Bars } from "./bars.js";
import { Teams } from "./teams.js";
import { Schedule } from "./matches.js";
const form = document.getElementById("info");
form.addEventListener("submit", schedule);
function schedule(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);
    const barCount = parseInt(values.bars);
    const teamCount = parseInt(values.teams);
    if (teamCount > 2 * barCount)
        alert("Only a maximum of two teams per bar is supported!");
    if (teamCount < barCount)
        alert("There needs to be at least one team per bar!");
    const matchCount = parseInt(values.matches);
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
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    console.log("Schedule...");
    const schedule = new Schedule(bars, teams, matchCount);
    schedule.calculate();
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
    teams.teams.forEach(team => {
        let stats = document.createElement("h3");
        stats.innerText = `Team ${team} to play ${team.homeCount} home matches and total of ${team.matchCount} matches`;
        results.appendChild(stats);
    });
}
//# sourceMappingURL=main.js.map