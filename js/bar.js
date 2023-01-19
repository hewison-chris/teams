import { random } from "./random.js";
export class Bar {
    name;
    teams = [];
    matchCount = 0;
    constructor(name) {
        this.name = name;
    }
    reset() {
        this.matchCount = 0;
    }
    toString() {
        return this.name;
    }
    addTeam(team) {
        this.teams.push(team);
    }
    teamCount() {
        return this.teams.length;
    }
    isOneTeamBar() {
        return this.teams.length === 1;
    }
    // As bars with only one team will only get matches every other week
    weightedCount() {
        return this.isOneTeamBar() ? this.matchCount * 2 : this.matchCount;
    }
    pickHomeTeam(awayTeams, matchTarget) {
        const chooseFrom = this.teams.slice()
            .filter(team => !awayTeams.includes(team))
            .filter(team => team.homeCount() < matchTarget / 2)
            .sort((a, b) => a.homeCount() - b.homeCount());
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[random(this.teamCount() - 1)];
    }
    pickOtherHomeTeam(homeTeam, awayTeams, matchTarget) {
        if (this.isOneTeamBar()) {
            return null;
        }
        const chooseFrom = this.teams
            .filter(team => team.index !== homeTeam.index)
            .filter(team => team.homeCount() < matchTarget / 2)
            .filter(team => !awayTeams.includes(team));
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[0];
    }
}
//# sourceMappingURL=bar.js.map