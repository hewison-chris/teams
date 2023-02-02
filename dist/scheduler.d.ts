import { Bars, Teams, Week } from "./";
export declare class Scheduler {
    bars: Bars;
    teams: Teams;
    weeks: Week[];
    matchTarget: number;
    constructor(bars: Bars, teams: Teams, matchTarget: number);
    reset(): void;
    private missingWeeklyMatches;
    calculate(): boolean;
}
