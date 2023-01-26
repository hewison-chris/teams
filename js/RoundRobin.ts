import {Team} from "./team.js"

export class RoundRobin {
  team: Team
  teams: Team[] = []
  round: number = 0

  constructor(team: Team) {
    this.team = team
  }

  reset() {
    this.teams = []
    this.round = 0
  }

  addTeams(teams: Team[]) {
    this.teams = teams.filter(t => t.id() !== this.team.id())
    this.round++
  }

  toString() {
    return this.teams.map(t => t.id())
  }

  removeTeam(team: Team) {
    this.teams.splice(this.teams.findIndex(t => t.id() === team.id()), 1)
    if (this.teams.length === 0) {
      console.log(`Team ${this.team} completed round robin round ${this.round}`)
    }
  }

  completed() {
    return this.teams.length === 0
  }
}
