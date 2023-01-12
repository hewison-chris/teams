import {random} from "./random.js"
import {Team} from "./team.js"

export class Bar {
  name: string
  teams: Team[] = []

  constructor(name: string) {
    this.name = name
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

  pickTeam(awayTeams: Team[], matchTarget: number): Team {
    const chooseFrom = this.teams
      .filter(team => !awayTeams.includes(team))
      .filter(team => team.matchCount < matchTarget)
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[random(chooseFrom.length)]
  }
}
