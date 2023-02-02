import { Team } from "./";
export declare class RoundRobin {
    team: Team;
    teams: Team[];
    round: number;
    constructor(team: Team);
    reset(): void;
    addTeams(teams: Team[]): void;
    toString(): string[];
    removeTeam(team: Team): void;
    completed(): boolean;
}
