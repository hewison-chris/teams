import { Bars, Teams, Week } from "./";
export declare class Results {
    bars: Bars;
    teams: Teams;
    weeks: Week[];
    completed: boolean;
    message: string;
    error: string;
    attempt: number;
    constructor(bars: Bars, teams: Teams);
}
