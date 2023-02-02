import {Team} from "./team"
import {Week} from "./week"

export class Match {
  homeTeam: Team
  awayTeam: Team
  week: Week

  constructor(homeTeam: Team, awayTeam: Team, week: Week) {
    this.homeTeam = homeTeam
    this.awayTeam = awayTeam
    this.week = week
    homeTeam.addMatch(this)
  }

  toString() {
    return `${this.awayTeam.id()} at ${this.homeTeam.id()}`
  }
}
