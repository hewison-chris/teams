export class Team {
    bar;
    index;
    roundRobin = [];
    roundRobinComplete = false;
    matchCount = 0;
    homeCount = 0;
    awayCount = 0;
    constructor(bar) {
        this.bar = bar;
        bar.addTeam(this);
        this.index = bar.teamCount();
    }
    toString() {
        return `${this.bar.name}${this.index}`;
    }
    addTeamsToPlay(teams) {
        this.roundRobin = teams.filter(team => team.toString() !== this.toString());
    }
    removeTeamToPlay(team) {
        this.roundRobin.splice(this.roundRobin.findIndex(t => t.toString() === team.toString()), 1);
        if (this.roundRobin.length === 0) {
            console.log(`Round robin matches complete for team ${team.toString()}`);
            this.roundRobinComplete = true;
        }
    }
}
//# sourceMappingURL=team.js.map