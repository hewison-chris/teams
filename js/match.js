"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
class Match {
    constructor(homeTeam, awayTeam, week) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.week = week;
        homeTeam.addMatch(this);
    }
    toString() {
        return `${this.awayTeam.id()} at ${this.homeTeam.id()}`;
    }
}
exports.Match = Match;
