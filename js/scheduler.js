import { Match } from "./match.js";
import { Week } from "./week.js";
import { Results } from "./results.js";
export class Scheduler {
    maxAttempts;
    bars;
    teams;
    weeks = [];
    weekCount;
    constructor(bars, teams, weekCount, maxAttempts) {
        this.bars = bars;
        this.teams = teams;
        this.weekCount = weekCount;
        this.maxAttempts = maxAttempts;
    }
    reset() {
        this.weeks.splice(0, this.weeks.length);
        this.bars.reset();
        this.teams.reset();
        this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams, this.weekCount));
    }
    makeSchedule() {
        const results = new Results(this.bars, this.teams);
        let attempt = 0;
        while (attempt < this.maxAttempts && !this.calculate()) {
            console.warn(`Attempt ${attempt}`);
            this.reset();
            attempt++;
        }
        if (attempt >= this.maxAttempts) {
            results.message = `Failed to make schedule with equal number of matches after ${attempt} attempts`;
        }
        else {
            results.completed = true;
            results.weeks = this.weeks;
            results.message = `Succeeded to make schedule after ${attempt} attempts`;
        }
        console.warn(results.message);
        return Promise.resolve(results);
    }
    calculate() {
        for (let week = 0; week < this.weekCount; week++) {
            console.log(`Week ${week + 1}`);
            let homeTeams = [];
            let awayTeams = [];
            this.weeks.push(new Week(week));
            const homeBars = this.bars.bars.slice()
                .sort((a, b) => a.weightedCount() - b.weightedCount());
            console.log(`home bars=${homeBars.map(b => "[" + b.name + ":" + b.weightedCount() + "]")}`);
            console.log(`teams: home/away ${this.teams.teams.map(t => "[" + t.id() + ":" + t.homeCount() + "/" + t.awayCount() + "]")}`);
            homeBars.forEach(bar => {
                let homeTeam = bar.pickHomeTeam(awayTeams, this.weekCount);
                if (homeTeam === null) {
                    console.log(`No team left for home bar ${bar}`);
                }
                else {
                    console.log(`picked home team ${homeTeam}`);
                    const awayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.weekCount, homeBars.slice(homeBars.findIndex(b => b === bar), this.teams.count / 2));
                    if (awayTeam === null) {
                        homeTeam = bar.pickOtherHomeTeam(homeTeam, awayTeams, this.weekCount);
                        if (homeTeam === null) {
                            console.log(`No team left for home bar ${bar}`);
                        }
                        else {
                            console.log(`picked other home team ${homeTeam}`);
                            const anotherAwayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.weekCount, homeBars.slice(0, this.teams.count / 2));
                            if (anotherAwayTeam !== null) {
                                homeTeams.push(homeTeam);
                                awayTeams.push(anotherAwayTeam);
                                this.weeks[week].matches.push(new Match(homeTeam, anotherAwayTeam, this.weeks[week]));
                            }
                        }
                    }
                    else {
                        homeTeams.push(homeTeam);
                        awayTeams.push(awayTeam);
                        this.weeks[week].matches.push(new Match(homeTeam, awayTeam, this.weeks[week]));
                    }
                }
            });
            if (this.weeks[week].matches.length < this.teams.count / 2) {
                this.teams.teams.forEach(t => {
                    console.log(t.debug());
                });
                return false;
            }
            console.log(this.weeks[week].toString());
        }
        return true;
    }
}
//# sourceMappingURL=scheduler.js.map