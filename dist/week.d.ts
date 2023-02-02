import { Match } from "./";
export declare class Week {
    week: number;
    matches: Match[];
    constructor(weekIndex: number);
    toString(): string;
    weekNumber(): number;
}
