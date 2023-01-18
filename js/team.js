export class Team {
    bar;
    index;
    roundRobin = [];
    roundRobin2 = [];
    matches = [];
    constructor(bar) {
        this.bar = bar;
        bar.addTeam(this);
        this.index = bar.teamCount();
    }
    id() {
        return `${this.bar.name}${this.index}`;
    }
    toString() {
        return this.id();
    }
    debug() {
        return this.id() + `roundRobin:${this.roundRobin.toString()} roundRobin2:${this.roundRobin2.toString()}`;
    }
    addMatch(match) {
        this.matches.push(match);
        if (match.homeTeam === this) {
            match.awayTeam.addMatch(match);
            this.removeTeamToPlay(match.awayTeam);
        }
        else {
            this.removeTeamToPlay(match.homeTeam);
        }
    }
    homeMatches() {
        return this.matches.filter(m => m.homeTeam.id() === this.id());
    }
    awayMatches() {
        return this.matches.filter(m => m.awayTeam.id() === this.id());
    }
    homeCount() {
        return this.homeMatches().length;
    }
    awayCount() {
        return this.awayMatches().length;
    }
    matchCount() {
        return this.matches.length;
    }
    addTeamsToPlay(teams, weeks) {
        this.roundRobin = teams.filter(team => team.id() !== this.id());
        if (weeks > teams.length - 1)
            this.roundRobin2 = teams.filter(team => team.id() !== this.id());
    }
    removeTeamToPlay(team) {
        if (this.roundRobin.length === 0) {
            this.roundRobin2.splice(this.roundRobin2.findIndex(t => t.toString() === team.toString()), 1);
        }
        else {
            this.roundRobin.splice(this.roundRobin.findIndex(t => t.toString() === team.toString()), 1);
            if (this.roundRobin.length === 0) {
                console.log(`Round robin matches complete for team ${team.toString()}`);
            }
        }
    }
}
//# sourceMappingURL=team.js.map