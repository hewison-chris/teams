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
    toString() {
        return this.teams.map(team => team.id());
    }
    reset() {
        this.teams.forEach(team => team.reset());
    }
    pickAwayTeam(homeTeam, homeTeams, awayTeams, matchTarget, remainingMatchBars) {
        console.log(`Remaining match bars:${remainingMatchBars.toString()}`);
        const teamsNotPlayingThisWeekYet = this.teams
            // Not the home team
            .filter(team => team.id() !== homeTeam.id())
            // Not other match this week
            .filter(team => !homeTeams.includes(team))
            .filter(team => !awayTeams.includes(team));
        const possibleTeams = teamsNotPlayingThisWeekYet
            // Not played all matches
            .filter(team => team.matchCount() < matchTarget)
            // Not played all away matches
            .filter(team => team.awayCount() < matchTarget / 2)
            // Team is needed for home match
            .filter(team => !(remainingMatchBars.includes(team.bar)
            && (team.bar.isOneTeamBar() || awayTeams.map(t => t.bar).concat(homeTeams.map(t => t.bar)).includes(team.bar))))
            // Already played this team at home
            .filter(team => !homeTeam.homeMatches().map(m => m.awayTeam).includes(team));
        console.log(`Teams not yet playing this week: ${teamsNotPlayingThisWeekYet}`);
        console.log(`Possible teams: ${possibleTeams}`);
        console.log(`Pick away team to play ${homeTeam} from robin1:${homeTeam.roundRobin.toString()}`);
        let teamsToPlay = possibleTeams
            .filter(team => homeTeam.roundRobin.includes(team))
            .sort((a, b) => a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount());
        if (teamsToPlay.length === 0) {
            console.log(`Pick away team to play ${homeTeam} from robin2:${homeTeam.roundRobin2.toString()}`);
            teamsToPlay = possibleTeams
                .filter(team => homeTeam.roundRobin2.includes(team))
                .sort((a, b) => a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount());
            console.log(`Try choose from ${teamsToPlay}`);
        }
        if (teamsToPlay.length === 0) {
            console.log(`No teams to select`);
            return null;
        }
        console.log(`Home team ${homeTeam.toString()}: choose from ${teamsToPlay}`);
        const picked = teamsToPlay[random(teamsToPlay.length - 1)];
        console.log(`Picked away team ${picked.toString()}`);
        return picked;
    }
}
//# sourceMappingURL=teams.js.map