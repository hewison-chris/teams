export class Results {
    bars;
    teams;
    weeks;
    completed;
    message;
    error;
    attempt;
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
//# sourceMappingURL=results.js.map