import { Bar, Match, RoundRobin } from "./";
export declare class Team {
    bar: Bar;
    index: number;
    roundRobin: RoundRobin;
    matches: Match[];
    constructor(bar: Bar);
    addTeamsToPlay(teams: Team[]): void;
    id(): string;
    toString(): string;
    reset(): void;
    debug(): string;
    addMatch(match: Match): void;
    homeMatches(): Match[];
    awayMatches(): Match[];
    homeCount(): number;
    awayCount(): number;
    matchCount(): number;
}
