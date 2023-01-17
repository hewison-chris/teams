import {Team} from "./team.js"

export class Bar {
  name: string
  teams: Team[] = []
  matchCount: number = 0

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
      .filter(team => team.homeCount() < matchTarget / 2)
      .filter(team => !awayTeams.includes(team))
      .slice()
      .sort((a, b) => a.homeCount() - b.homeCount())
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[0]
  }

  pickOtherHomeTeam(homeTeam: Team, awayTeams: Team[], matchTarget: number): Team {
    if (this.isOneTeamBar()) {
      return null
    }
    const chooseFrom = this.teams
      .filter(team => team.index !== homeTeam.index)
      .filter(team => team.homeCount() < matchTarget / 2)
      .filter(team => !awayTeams.includes(team))
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[0]
  }
}
