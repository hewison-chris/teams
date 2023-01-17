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
        return this.teams.map(team => team.id());
    }
    pickAwayTeam(homeTeam, homeTeams, awayTeams, matchTarget) {
        const teamsNotPlayingThisWeekYet = this.teams
            .filter(team => !homeTeams.includes(team))
            .filter(team => !awayTeams.includes(team))
            .filter(team => team.matchCount() < matchTarget);
        console.log(`Teams not yet playing this week: ${teamsNotPlayingThisWeekYet}`);
        console.log(`Pick away team to play ${homeTeam} from robin1:${homeTeam.roundRobin.toString()}`);
        let teamsToPlay = teamsNotPlayingThisWeekYet
            .filter(team => homeTeam.roundRobin.includes(team))
            .sort((a, b) => a.matchCount() - b.matchCount())
            .sort((a, b) => a.awayCount() - b.awayCount());
        if (teamsToPlay.length === 0) {
            console.log(`Pick away team to play ${homeTeam} from robin2:${homeTeam.roundRobin2.toString()}`);
            teamsToPlay = teamsNotPlayingThisWeekYet
                .filter(team => homeTeam.roundRobin2.includes(team))
                .sort((a, b) => -b.matchCount())
                .sort((a, b) => a.matchCount() - b.matchCount())
                .sort((a, b) => a.awayCount() - b.awayCount());
            console.log(`Try choose from ${teamsToPlay}`);
        }
        if (teamsToPlay.length === 0) {
            console.log(`No teams to select`);
            return null;
        }
        console.log(`Home team ${homeTeam.toString()}: choose from ${teamsToPlay}`);
        const picked = teamsToPlay[0];
        console.log(`Picked away team ${picked.toString()}`);
        return picked;
    }
}
//# sourceMappingURL=teams.js.map