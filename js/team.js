"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const RoundRobin_1 = require("./RoundRobin");
class Team {
    constructor(bar) {
        this.matches = [];
        this.bar = bar;
        bar.addTeam(this);
        this.index = bar.teamCount();
        this.roundRobin = new RoundRobin_1.RoundRobin(this);
    }
    addTeamsToPlay(teams) {
        this.roundRobin.addTeams(teams);
    }
    id() {
        return `${this.bar.name}${this.index}`;
    }
    toString() {
        return this.id();
    }
    reset() {
        this.matches = [];
        this.roundRobin.reset();
    }
    debug() {
        return this.id() + `: round robins:${this.roundRobin.toString()}`;
    }
    addMatch(match) {
        this.matches.push(match);
        if (match.homeTeam === this) {
            this.bar.matchCount++;
            match.awayTeam.addMatch(match);
            this.roundRobin.removeTeam(match.awayTeam);
        }
        else {
            this.roundRobin.removeTeam(match.homeTeam);
        }
    }
    homeMatches() {
        return this.matches.filter(m => m.homeTeam.id() === this.id());
    }
    awayMatches() {
        return this.matches.filter(m => m.awayTeam.id() === this.id());
    }
    homeCount() {
        return this.homeMatches().length;
    }
    awayCount() {
        return this.awayMatches().length;
    }
    matchCount() {
        return this.matches.length;
    }
}
exports.Team = Team;
