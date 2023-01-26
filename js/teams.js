import { Team } from "./team.js";
import { random } from "./random.js";
export class Teams {
    teams = [];
    count;
    bars;
    constructor(count, bars) {
        this.bars = bars;
        this.count = count;
        this.teams = bars.bars.map(bar => new Team(bar))
            .concat(this.bars.bars.slice(0, count - bars.count).map(bar => new Team(bar)));
        console.log(`teams = ${this.toString()}`);
    }
    halfCount() {
        return Math.floor(this.count / 2);
    }
    matchesLeft(matchTarget) {
        return this.teams.findIndex(team => team.matchCount() < matchTarget) !== -1;
    }
    toString() {
        return this.teams.map(team => team.id());
    }
    reset() {
        this.teams.forEach(team => team.reset());
    }
    pickAwayTeam(homeTeam, homeTeams, awayTeams, matchTarget) {
        const teamsNotPlayingThisWeekYet = this.teams
            // Not the home team
            .filter(team => team.id() !== homeTeam.id())
            // Not already playing at home
            .filter(team => !homeTeams.includes(team))
            // Not already playing away
            .filter(team => !awayTeams.includes(team));
        console.log(`Teams not yet playing this week: ${teamsNotPlayingThisWeekYet}`);
        const possibleTeams = teamsNotPlayingThisWeekYet
            // Not played all matches
            .filter(team => team.matchCount() < matchTarget)
            // Not played all away matches
            .filter(team => team.awayCount() < Math.floor(matchTarget / 2))
            // Already played this team at home for required number
            .filter(team => homeTeam.homeMatches().map(m => m.awayTeam)
            .filter(t => t.id() === team.id()).length < Math.floor(matchTarget / 2));
        console.log(`Possible teams: ${possibleTeams}`);
        let teamsToPlay = possibleTeams
            .filter(team => homeTeam.roundRobin.teams.includes(team))
            .sort((a, b) => a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount());
        console.log(`Try choose from ${teamsToPlay}`);
        if (teamsToPlay.length === 0) {
            console.log(`No teams to select`);
            return null;
        }
        console.log(`Home team ${homeTeam.toString()}: choose from ${teamsToPlay}`);
        const picked = teamsToPlay[random(teamsToPlay.length)];
        console.log(`Picked away team ${picked.toString()}`);
        return picked;
    }
}
//# sourceMappingURL=teams.js.map