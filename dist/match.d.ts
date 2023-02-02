import { Team, Week } from "./";
export declare class Match {
    homeTeam: Team;
    awayTeam: Team;
    week: Week;
    constructor(homeTeam: Team, awayTeam: Team, week: Week);
    toString(): string;
}
