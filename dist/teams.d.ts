import { Bars, Team } from "./";
export declare class Teams {
    teams: Team[];
    count: number;
    bars: Bars;
    constructor(count: number, bars: Bars);
    halfCount(): number;
    matchesLeft(matchTarget: number): boolean;
    toString(): string[];
    reset(): void;
    pickAwayTeam(homeTeam: Team, homeTeams: Team[], awayTeams: Team[], matchTarget: number): Team | null;
}
