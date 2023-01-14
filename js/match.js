export class Match {
    homeTeam;
    awayTeam;
    constructor(homeTeam, awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        homeTeam.matchCount++;
        homeTeam.homeCount++;
        awayTeam.matchCount++;
        awayTeam.awayCount++;
    }
    toString() {
        return `Bar ${this.homeTeam.bar.toString()} : ${this.homeTeam.toString()} vs ${this.awayTeam.toString()}`;
    }
}
//# sourceMappingURL=match.js.map