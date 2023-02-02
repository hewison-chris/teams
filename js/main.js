"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.countDown = void 0;
const results_1 = require("./results");
const scheduler_1 = require("./scheduler");
const bars_1 = require("./bars");
const teams_1 = require("./teams");
const delay = (ms) => new Promise(res => setTimeout(res, ms));
function countDown(counts = 3) {
    return __asyncGenerator(this, arguments, function* countDown_1() {
        let count = counts;
        while (count > 0) {
            yield yield __await(`Getting ready: ${count}`);
            yield __await(delay(200));
            count--;
        }
        return yield __await(`GO`);
    });
}
exports.countDown = countDown;
function schedule(barCount, teamCount, matchTarget, maxAttempts = 1) {
    return __asyncGenerator(this, arguments, function* schedule_1() {
        const bars = new bars_1.Bars(barCount);
        const teams = new teams_1.Teams(teamCount, bars);
        const results = new results_1.Results(bars, teams);
        let done = false;
        if (teamCount < barCount) {
            results.error = "There needs to be at least one team per bar!";
            return yield __await(results);
        }
        if (teamCount > 2 * barCount) {
            results.error = "Only a maximum of two teams per bar is supported!";
            return yield __await(results);
        }
        if (matchTarget % 2 !== 0) {
            results.error = "Please choose an even number of matches!";
            return yield __await(results);
        }
        yield yield __await(results);
        const scheduler = new scheduler_1.Scheduler(bars, teams, matchTarget);
        console.debug("Schedule...");
        console.debug(`before do:attempt=${results.attempt}`);
        do {
            results.attempt++;
            console.debug(`do:attempt=${results.attempt}`);
            done = scheduler.calculate();
            if (!done && results.attempt % 10 === 0) {
                results.message = `Not yet found a solution after ${results.attempt} attempts`;
                yield __await(delay(10));
                yield yield __await(results);
            }
        } while (results.attempt < maxAttempts && !done);
        if (results.attempt >= maxAttempts) {
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
        return yield __await(results);
    });
}
exports.schedule = schedule;
