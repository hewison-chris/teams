export class Week {
    week;
    matches = [];
    constructor(weekIndex) {
        this.week = weekIndex + 1;
    }
    toString() {
        return `${this.matches.map(match => match.toString())}`;
    }
    weekNumber() {
        return this.week;
    }
}
//# sourceMappingURL=week.js.map