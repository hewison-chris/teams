export class Week {
    week;
    matches = [];
    constructor(week) {
        this.week = week;
    }
    toString() {
        return `${this.matches.map(match => match.toString())}`;
    }
    weekNumber() {
        return this.week + 1;
    }
}
//# sourceMappingURL=week.js.map