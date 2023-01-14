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

  pickHomeTeam(awayTeams: Team[], matchTarget: number): Team {
    const chooseFrom = this.teams
      .filter(team => team.homeCount < matchTarget / 2)
      .filter(team => !awayTeams.includes(team))
    if (chooseFrom.length === 0) {
      return null
    }
    if (chooseFrom.length === 2) {
      if (chooseFrom[0].homeCount < chooseFrom[1].homeCount)
        return chooseFrom[0]
      else return chooseFrom[1]
    }
    return chooseFrom[random(chooseFrom.length)]
  }

  pickOtherHomeTeam(homeTeam: Team, awayTeams: Team[], matchTarget: number): Team {
    if (this.isOneTeamBar()) {
      return null
    }
    const chooseFrom = this.teams
      .filter(team => team.index !== homeTeam.index)
      .filter(team => team.homeCount < matchTarget / 2)
      .filter(team => !awayTeams.includes(team))
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[0]
  }
}
