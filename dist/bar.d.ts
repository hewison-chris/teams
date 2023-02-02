import { Team } from "./";
export declare class Bar {
    name: string;
    teams: Team[];
    matchCount: number;
    constructor(name: string);
    reset(): void;
    toString(): string;
    addTeam(team: Team): void;
    teamCount(): number;
    isOneTeamBar(): boolean;
    pickHomeTeam(awayTeams: Team[], matchTarget: number): Team | null;
    pickOtherHomeTeam(homeTeam: Team, awayTeams: Team[], matchTarget: number): Team | null;
}
