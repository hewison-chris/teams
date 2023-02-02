"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bars = void 0;
const random_1 = require("./random");
const bar_1 = require("./bar");
class Bars {
    constructor(count) {
        this.bars = [];
        this.count = count;
        this.bars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, count))
            .map(letter => new bar_1.Bar(letter));
    }
    toString() {
        return this.bars.map(bar => bar.toString());
    }
    reset() {
        this.bars.forEach(bar => bar.reset());
    }
    barsWithOneTeam() {
        return this.bars.filter(bar => bar.isOneTeamBar());
    }
    barsWithTwoTeams() {
        return this.bars.filter(bar => !(bar.isOneTeamBar()));
    }
    pickBar() {
        return this.bars[(0, random_1.random)(this.count)];
    }
}
exports.Bars = Bars;
