import {random, Team} from "./"

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

  pickHomeTeam(awayTeams: Team[], matchTarget: number): Team | null {
    const chooseFrom = this.teams.slice()
      .filter(team => team.matchCount() < matchTarget)
      .filter(team => team.homeCount() < Math.floor(matchTarget / 2))
      .filter(team => !awayTeams.includes(team))
    if (chooseFrom.length === 0) {
      return null
    }
    return chooseFrom[random(Math.min(this.teamCount(), chooseFrom.length))]
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
