"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDown = countDown;
exports.schedule = schedule;
const _1 = require("./");
const delay = (ms) => new Promise(res => setTimeout(res, ms));
async function* countDown(counts = 3) {
    let count = counts;
    while (count > 0) {
        yield `Getting ready: ${count}`;
        await delay(200);
        count--;
    }
    return `GO`;
}
async function* schedule(barCount, teamCount, matchTarget, maxAttempts = 2) {
    const bars = new _1.Bars(barCount);
    const teams = new _1.Teams(teamCount, bars);
    const results = new _1.Results(bars, teams);
    let done = false;
    if (teamCount < barCount) {
        results.error = "There needs to be at least one team per bar!";
        return results;
    }
    if (teamCount > 2 * barCount) {
        results.error = "Only a maximum of two teams per bar is supported!";
        return results;
    }
    if (matchTarget % 2 !== 0) {
        results.error = "Please choose an even number of matches!";
        return results;
    }
    yield results;
    const scheduler = new _1.Scheduler(bars, teams, matchTarget);
    console.debug("Schedule...");
    do {
        results.attempt++;
        console.debug(`do:attempt=${results.attempt}`);
        done = scheduler.calculate();
        if (!done && results.attempt % 10 === 0) {
            results.message = `Not yet found a solution after ${results.attempt} attempts`;
            await delay(10);
            yield results;
        }
    } while (results.attempt < maxAttempts && !done);
    if (!done) {
        results.error = `Failed to make schedule with equal number of matches after ${results.attempt} attempts`;
        results.weeks = scheduler.weeks;
        console.warn(results.error);
    }
    else {
        results.completed = true;
        results.weeks = scheduler.weeks;
        results.message = `Succeeded to make schedule after ${results.attempt} attempts`;
        console.log(results.message);
    }
    console.debug("exit");
    return results;
}
//# sourceMappingURL=main.js.map