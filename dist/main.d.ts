import { Results } from "./";
export declare function countDown(counts?: number): AsyncGenerator<string>;
export declare function schedule(barCount: number, teamCount: number, matchTarget: number, maxAttempts?: number): AsyncGenerator<Results>;
