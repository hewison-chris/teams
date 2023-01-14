import {Bar} from "./bar.js"

export class Team {
  bar: Bar
  index: number
  roundRobin: Team[] = []
  roundRobinComplete = false
  matchCount = 0
  homeCount = 0
  awayCount = 0

  constructor(bar: Bar) {
    this.bar = bar
    bar.addTeam(this)
    this.index = bar.teamCount()
  }

  toString() {
    return `${this.bar.name}${this.index}`
  }

  addTeamsToPlay(teams: Team[]) {
    this.roundRobin = teams.filter(team => team.toString() !== this.toString())
  }

  removeTeamToPlay(team: Team) {
    this.roundRobin.splice(this.roundRobin.findIndex(t => t.toString() === team.toString()), 1)
    if (this.roundRobin.length === 0) {
      console.log(`Round robin matches complete for team ${team.toString()}`)
      this.roundRobinComplete = true
    }
  }
}
