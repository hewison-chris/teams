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
    pickHomeTeam(awayTeams, matchTarget) {
        const chooseFrom = this.teams
            .filter(team => team.homeCount < matchTarget / 2)
            .filter(team => !awayTeams.includes(team));
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[random(chooseFrom.length)];
    }
    pickOtherHomeTeam(homeTeam, awayTeams, matchTarget) {
        if (this.isOneTeamBar()) {
            return null;
        }
        const chooseFrom = this.teams
            .filter(team => team.index !== homeTeam.index)
            .filter(team => team.homeCount < matchTarget / 2)
            .filter(team => !awayTeams.includes(team));
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[0];
    }
}
//# sourceMappingURL=bar.js.map