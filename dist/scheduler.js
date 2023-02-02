"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const _1 = require("./");
class Scheduler {
    bars;
    teams;
    weeks = [];
    matchTarget;
    constructor(bars, teams, matchTarget) {
        this.bars = bars;
        this.teams = teams;
        this.matchTarget = matchTarget;
    }
    reset() {
        this.weeks.splice(0, this.weeks.length);
        this.bars.reset();
        this.teams.reset();
        this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams));
        this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams));
        this.teams.teams.forEach(t => {
            console.log(`After reset: ${t.debug()}`);
        });
    }
    missingWeeklyMatches(weekIndex) {
        const weekMatchCount = this.weeks[weekIndex].matches.length;
        const expectedCount = this.teams.halfCount();
        console.log(`Week ${weekIndex + 1} has ${weekMatchCount} matches of expected ${expectedCount}`);
        if (weekMatchCount < expectedCount) {
            this.teams.teams.forEach(t => {
                console.log(t.debug());
            });
            return true;
        }
        return false;
    }
    calculate() {
        this.reset();
        for (let weekIndex = 0; this.teams.matchesLeft(this.matchTarget); weekIndex++) {
            console.log(`Week ${weekIndex + 1}`);
            let homeTeams = [];
            let awayTeams = [];
            this.weeks.push(new _1.Week(weekIndex));
            const homeBars = this.bars.bars.slice().sort((a, b) => a.teamCount() - b.teamCount());
            console.log(`teams: home/away ${this.teams.teams.map(t => "[" + t.id() + ":" + t.homeCount() + "/" + t.awayCount() + "]")}`);
            homeBars.forEach(bar => {
                console.log(`Try home team bar ${bar}`);
                let homeTeam = bar.pickHomeTeam(awayTeams, this.matchTarget);
                if (homeTeam === null) {
                    console.log(`No team left for home bar ${bar} this week`);
                }
                else {
                    console.log(`picked home team ${homeTeam}`);
                    const awayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.matchTarget);
                    if (awayTeam === null) {
                        homeTeam = bar.pickOtherHomeTeam(homeTeam, awayTeams, this.matchTarget);
                        if (homeTeam === null) {
                            console.log(`No team left for home bar ${bar}`);
                        }
                        else {
                            console.log(`picked other home team ${homeTeam}`);
                            const anotherAwayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.matchTarget);
                            if (anotherAwayTeam !== null) {
                                homeTeams.push(homeTeam);
                                awayTeams.push(anotherAwayTeam);
                                this.weeks[weekIndex].matches.push(new _1.Match(homeTeam, anotherAwayTeam, this.weeks[weekIndex]));
                            }
                        }
                    }
                    else {
                        homeTeams.push(homeTeam);
                        awayTeams.push(awayTeam);
                        this.weeks[weekIndex].matches.push(new _1.Match(homeTeam, awayTeam, this.weeks[weekIndex]));
                    }
                }
            });
            if (this.missingWeeklyMatches(weekIndex)) {
                return false;
            }
            console.log(this.weeks[weekIndex].toString());
        }
        return true;
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map