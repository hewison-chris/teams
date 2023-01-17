import { Match } from "./match.js";
import { Week } from "./week.js";
export class Schedule {
    bars;
    teams;
    weeks = [];
    weekCount;
    constructor(bars, teams, weekCount) {
        this.bars = bars;
        this.teams = teams;
        this.weekCount = weekCount;
    }
    makeSchedule() {
        this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams, this.weekCount));
        this.teams.teams.forEach(t => {
            console.log(t.debug());
        });
        this.calculate();
        this.teams.teams.forEach(t => {
            console.log(t.debug());
        });
    }
    calculate() {
        for (let week = 0; week < this.weekCount; week++) {
            console.log(`Week ${week + 1}`);
            let homeTeams = [];
            let awayTeams = [];
            this.weeks.push(new Week(week));
            const homeBars = this.bars.bars.slice().sort((a, b) => a.matchCount - b.matchCount);
            console.log(`bars=${homeBars.toString()}`);
            homeBars.forEach(bar => {
                const homeTeam = bar.pickHomeTeam(awayTeams, this.weekCount);
                if (homeTeam !== null) {
                    homeTeams.push(homeTeam);
                    console.log(`picked home team ${homeTeam}`);
                    const awayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.weekCount);
                    if (awayTeam === null) {
                        homeTeams.splice(homeTeams.findIndex(t => t.toString() === homeTeam.toString()));
                        const otherHomeTeam = bar.pickOtherHomeTeam(homeTeam, awayTeams, this.weekCount);
                        if (otherHomeTeam !== null) {
                            homeTeams.push(homeTeam);
                            console.log(`picked other home team ${otherHomeTeam}`);
                            const anotherAwayTeam = this.teams.pickAwayTeam(otherHomeTeam, homeTeams, awayTeams, this.weekCount);
                            if (anotherAwayTeam === null) {
                                homeTeams.splice(homeTeams.findIndex(t => t.toString() === otherHomeTeam.toString()));
                            }
                            else {
                                awayTeams.push(anotherAwayTeam);
                                this.weeks[week].matches.push(new Match(otherHomeTeam, anotherAwayTeam, this.weeks[week]));
                            }
                        }
                    }
                    else {
                        awayTeams.push(awayTeam);
                        this.weeks[week].matches.push(new Match(homeTeam, awayTeam, this.weeks[week]));
                    }
                }
            });
            console.log(this.weeks[week].toString());
        }
    }
    allMatches() {
        return this.weeks.flatMap(week => week.matches);
    }
    checkDone() {
        let completed = true;
        this.teams.teams.forEach(team => {
            if (team.matchCount() < this.weekCount) {
                console.log(`Team ${team} still has ${this.weekCount - team.matchCount()} matches to play`);
                completed = false;
            }
        });
        if (completed)
            console.log("COMPLETED SCHEDULE");
        else
            console.error("DID NOT COMPLETE SCHEDULE");
        return completed;
    }
}
//# sourceMappingURL=matches.js.map