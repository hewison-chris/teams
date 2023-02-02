"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Week = void 0;
class Week {
    constructor(weekIndex) {
        this.matches = [];
        this.week = weekIndex + 1;
    }
    toString() {
        return `${this.matches.map(match => match.toString())}`;
    }
    weekNumber() {
        return this.week;
    }
}
exports.Week = Week;
