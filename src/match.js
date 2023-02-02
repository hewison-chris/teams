export class Match {
    homeTeam;
    awayTeam;
    week;
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
//# sourceMappingURL=match.js.map