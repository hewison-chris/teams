import { random } from "./random.js";
export class Bar {
    name;
    teams = [];
    constructor(name) {
        this.name = name;
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
    pickTeam(awayTeams, matchTarget) {
        const chooseFrom = this.teams
            .filter(team => !awayTeams.includes(team))
            .filter(team => team.matchCount < matchTarget);
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[random(chooseFrom.length)];
    }
}
//# sourceMappingURL=bar.js.map