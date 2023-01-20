import { Scheduler } from "./scheduler.js";
import { Bars } from "./bars.js";
import { Teams } from "./teams.js";
export function schedule(barCount, teamCount, weekCount, maxAttempts) {
    if (teamCount < barCount) {
        return Promise.reject("There needs to be at least one team per bar!");
    }
    if (teamCount > 2 * barCount) {
        return Promise.reject("Only a maximum of two teams per bar is supported!");
    }
    if (teamCount % 2 === 1) {
        return Promise.reject("Currently only even number of teams is supported!");
    }
    console.log("Schedule...");
    const bars = new Bars(barCount);
    const teams = new Teams(teamCount, bars);
    const scheduler = new Scheduler(bars, teams, weekCount, maxAttempts);
    return scheduler.makeSchedule();
}
//# sourceMappingURL=main.js.map