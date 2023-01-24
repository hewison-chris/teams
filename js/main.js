import { Results } from "./results.js";
import { Scheduler } from "./scheduler.js";
import { Bars } from "./bars.js";
import { Teams } from "./teams.js";
const delay = ms => new Promise(res => setTimeout(res, ms));
export async function* countDown(counts = 3) {
    let count = counts;
    while (count > 0) {
        yield `Getting ready: ${count}`;
        await delay(200);
        count--;
    }
    yield `GO`;
}
export async function* schedule(barCount, teamCount, weekCount, maxAttempts) {
    const bars = new Bars(barCount);
    const teams = new Teams(teamCount, bars);
    const results = new Results(bars, teams);
    if (teamCount < barCount) {
        results.error = "There needs to be at least one team per bar!";
        yield results;
    }
    if (teamCount > 2 * barCount) {
        results.error = "Only a maximum of two teams per bar is supported!";
        yield results;
    }
    yield results;
    const scheduler = new Scheduler(bars, teams, weekCount);
    console.log("Schedule...");
    while (results.attempt < maxAttempts && !scheduler.calculate()) {
        scheduler.reset();
        results.attempt++;
        if (results.attempt % 10 === 0) {
            results.message = `Not yet found a solution after ${results.attempt} attempts`;
            await delay(10);
            yield results;
        }
    }
    if (results.attempt >= maxAttempts) {
        results.error = `Failed to make schedule with equal number of matches after ${results.attempt} attempts`;
        console.warn(results.message);
    }
    else {
        results.completed = true;
        results.weeks = scheduler.weeks;
        results.message = `Succeeded to make schedule after ${results.attempt} attempts`;
        console.log(results.message);
    }
    yield results;
}
//# sourceMappingURL=main.js.map