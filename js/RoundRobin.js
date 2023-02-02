"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundRobin = void 0;
class RoundRobin {
    constructor(team) {
        this.teams = [];
        this.round = 0;
        this.team = team;
    }
    reset() {
        this.teams = [];
        this.round = 0;
    }
    addTeams(teams) {
        this.teams = teams.filter(t => t.id() !== this.team.id());
        this.round++;
    }
    toString() {
        return this.teams.map(t => t.id());
    }
    removeTeam(team) {
        this.teams.splice(this.teams.findIndex(t => t.id() === team.id()), 1);
        if (this.completed()) {
            console.log(`Team ${this.team} completed round robin round ${this.round}`);
        }
    }
    completed() {
        return this.teams.length === 0;
    }
}
exports.RoundRobin = RoundRobin;
