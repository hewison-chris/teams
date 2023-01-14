import {Team} from "./team.js"

export class Match {
  homeTeam: Team
  awayTeam: Team

  constructor(homeTeam: Team, awayTeam: Team) {
    this.homeTeam = homeTeam
    this.awayTeam = awayTeam
    homeTeam.matchCount++
    homeTeam.homeCount++
    awayTeam.matchCount++
    awayTeam.awayCount++
  }

  toString() {
    return `Bar ${this.homeTeam.bar.toString()} : ${this.homeTeam.toString()} vs ${this.awayTeam.toString()}`
  }
}
