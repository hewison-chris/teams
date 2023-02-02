import {Bar} from "./bar"
import {Match} from "./match"
import {RoundRobin} from "./RoundRobin"

export class Team {
  bar: Bar
  index: number
  roundRobin: RoundRobin
  matches: Match[] = []

  constructor(bar: Bar) {
    this.bar = bar
    bar.addTeam(this)
    this.index = bar.teamCount()
    this.roundRobin = new RoundRobin(this)
  }

  addTeamsToPlay(teams: Team[]) {
    this.roundRobin.addTeams(teams)
  }

  id() {
    return `${this.bar.name}${this.index}`
  }

  toString() {
    return this.id()
  }

  reset() {
    this.matches = []
    this.roundRobin.reset()
  }

  debug() {
    return this.id() + `: round robins:${this.roundRobin.toString()}`
  }

  addMatch(match: Match) {
    this.matches.push(match)
    if (match.homeTeam === this) {
      this.bar.matchCount++
      match.awayTeam.addMatch(match)
      this.roundRobin.removeTeam(match.awayTeam)
    } else {
      this.roundRobin.removeTeam(match.homeTeam)
    }
  }

  homeMatches() {
    return this.matches.filter(m => m.homeTeam.id() === this.id())
  }

  awayMatches() {
    return this.matches.filter(m => m.awayTeam.id() === this.id())
  }

  homeCount() {
    return this.homeMatches().length
  }

  awayCount() {
    return this.awayMatches().length
  }

  matchCount() {
    return this.matches.length
  }
}
