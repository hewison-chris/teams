import { random } from "./random.js";
import { Team } from "./team.js";
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
    toString() {
        return this.teams.map(team => team.toString());
    }
    pickAwayTeam(homeTeam, homeTeams, awayTeams, matchTarget) {
        const teamsToPlay = this.teams
            .filter(team => team.matchCount < matchTarget)
            .filter(team => team.awayCount < matchTarget / 2)
            .filter(team => !homeTeams.includes(team))
            .filter(team => !awayTeams.includes(team))
            .filter(team => homeTeam.roundRobin.includes(team));
        if (teamsToPlay.length === 0) {
            console.log(`No teams left to play against team ${homeTeam}`);
            return null;
        }
        const minAwayPlaysTeams = teamsToPlay.filter(team => team.awayCount <= teamsToPlay.map(t => t.awayCount)
            .reduce((min, current) => current < min ? current : min, matchTarget / 2));
        console.log(`Home team ${homeTeam.toString()}: choose from ${minAwayPlaysTeams}`);
        const picked = minAwayPlaysTeams[random(minAwayPlaysTeams.length)];
        console.log(`Picked away team ${picked.toString()}`);
        homeTeam.removeTeamToPlay(picked);
        picked.removeTeamToPlay(homeTeam);
        return picked;
    }
}
//# sourceMappingURL=teams.js.map