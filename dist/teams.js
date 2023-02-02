"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
const _1 = require("./");
class Teams {
    teams = [];
    count;
    bars;
    constructor(count, bars) {
        this.bars = bars;
        this.count = count;
        this.teams = bars.bars.map(bar => new _1.Team(bar))
            .concat(this.bars.bars.slice(0, count - bars.count).map(bar => new _1.Team(bar)));
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
        console.log(`Possible teams: [${possibleTeams}]`);
        if (possibleTeams.length === 0) {
            console.log(`No teams to select`);
            return null;
        }
        console.log(`Home team ${homeTeam.toString()}: choose from ${possibleTeams}`);
        const picked = possibleTeams[(0, _1.random)(possibleTeams.length)];
        console.log(`Picked away team ${picked.toString()}`);
        return picked;
    }
}
exports.Teams = Teams;
//# sourceMappingURL=teams.js.map