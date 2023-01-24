import { Team } from "./team.js";
import { random } from "./random.js";
import { debugLog } from "./logging.js";
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
        debugLog(`Remaining match bars:${remainingMatchBars.toString()}`);
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
        debugLog(`Teams not yet playing this week: ${teamsNotPlayingThisWeekYet}`);
        debugLog(`Possible teams: ${possibleTeams}`);
        debugLog(`Pick away team to play ${homeTeam} from robin1:${homeTeam.roundRobin.toString()}`);
        let teamsToPlay = possibleTeams
            .filter(team => homeTeam.roundRobin.includes(team))
            .sort((a, b) => a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount());
        if (teamsToPlay.length === 0) {
            debugLog(`Pick away team to play ${homeTeam} from robin2:${homeTeam.roundRobin2.toString()}`);
            teamsToPlay = possibleTeams
                .filter(team => homeTeam.roundRobin2.includes(team))
                .sort((a, b) => a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount());
            debugLog(`Try choose from ${teamsToPlay}`);
        }
        if (teamsToPlay.length === 0) {
            debugLog(`No teams to select`);
            return null;
        }
        debugLog(`Home team ${homeTeam.toString()}: choose from ${teamsToPlay}`);
        const picked = teamsToPlay[random(teamsToPlay.length)];
        debugLog(`Picked away team ${picked.toString()}`);
        return picked;
    }
}
//# sourceMappingURL=teams.js.map