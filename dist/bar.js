"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const _1 = require("./");
class Bar {
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
    pickHomeTeam(awayTeams, matchTarget) {
        const chooseFrom = this.teams.slice()
            .filter(team => team.matchCount() < matchTarget)
            .filter(team => team.homeCount() < Math.floor(matchTarget / 2))
            .filter(team => !awayTeams.includes(team));
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[(0, _1.random)(Math.min(this.teamCount(), chooseFrom.length))];
    }
    pickOtherHomeTeam(homeTeam, awayTeams, matchTarget) {
        if (this.isOneTeamBar()) {
            return null;
        }
        const chooseFrom = this.teams
            .filter(team => team.index !== homeTeam.index)
            .filter(team => team.matchCount() < matchTarget)
            .filter(team => team.homeCount() < Math.floor(matchTarget / 2))
            .filter(team => !awayTeams.includes(team));
        if (chooseFrom.length === 0) {
            return null;
        }
        return chooseFrom[0];
    }
}
exports.Bar = Bar;
//# sourceMappingURL=bar.js.map