"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Results = void 0;
class Results {
    constructor(bars, teams) {
        this.message = "";
        this.error = "";
        this.bars = bars;
        this.teams = teams;
        this.attempt = 0;
        this.completed = false;
        this.weeks = [];
    }
}
exports.Results = Results;
