"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bars = void 0;
const _1 = require("./");
class Bars {
    bars = [];
    count;
    constructor(count) {
        this.count = count;
        this.bars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, count))
            .map(letter => new _1.Bar(letter));
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
        return this.bars[(0, _1.random)(this.count)];
    }
}
exports.Bars = Bars;
//# sourceMappingURL=bars.js.map