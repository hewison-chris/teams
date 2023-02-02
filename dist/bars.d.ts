import { Bar } from "./";
export declare class Bars {
    bars: Bar[];
    count: number;
    constructor(count: number);
    toString(): string[];
    reset(): void;
    barsWithOneTeam(): Bar[];
    barsWithTwoTeams(): Bar[];
    pickBar(): Bar;
}
