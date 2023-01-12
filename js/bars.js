import { random } from "./random.js";
import { Bar } from "./bar.js";
export class Bars {
    bars = [];
    count;
    constructor(count) {
        this.count = count;
        this.bars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, count))
            .map(letter => new Bar(letter));
    }
    toString() {
        return this.bars.map(bar => bar.toString());
    }
    barsWithOneTeam() {
        return this.bars.filter(bar => bar.isOneTeamBar());
    }
    barsWithTwoTeams() {
        return this.bars.filter(bar => !(bar.isOneTeamBar()));
    }
    pickBar() {
        return this.bars[random(this.count)];
    }
}
//# sourceMappingURL=bars.js.map