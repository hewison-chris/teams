import {Team} from "./team"
import {random} from "./random"

export class Bar {
  name: string
  teams: Team[] = []
  matchCount: number = 0

  constructor(name: string) {
    this.name = name
  }

  reset() {
    this.matchCount = 0
  }

  toString() {
    return this.name
  }

  addTeam(team: Team) {
    this.teams.push(team)
  }

  teamCount() {
    return this.teams.length
  }

  isOneTeamBar() {
    return this.teams.length === 1
  }

  // As bars with only one team will only get matches every other week
  weightedCount() {
    return this.isOneTeamBar() ? this.matchCount : this.matchCount
    // return this.isOneTeamBar() ? this.matchCount * 2 : this.matchCount
  }

  pickHomeTeam(awayTeams: Team[], matchTarget: number): Team | null {
    const chooseFrom = this.teams.slice()
      .filter(team => team.matchCount() < matchTarget)
      .filter(team => team.homeCount() < Math.floor(matchTarget / 2))
      .filter(team => !awayTeams.includes(team))
      .sort((a, b) => a.homeCount() - b.homeCount())
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[random(this.teamCount())]
  }

  pickOtherHomeTeam(homeTeam: Team, awayTeams: Team[], matchTarget: number): Team | null {
    if (this.isOneTeamBar()) {
      return null
    }
    const chooseFrom = this.teams
      .filter(team => team.index !== homeTeam.index)
      .filter(team => team.matchCount() < matchTarget)
      .filter(team => team.homeCount() < Math.floor(matchTarget / 2))
      .filter(team => !awayTeams.includes(team))
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[0]
  }
}
