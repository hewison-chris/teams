import {Bars} from "./bars.js"
import {random} from "./random.js"
import {Team} from "./team.js"

export class Teams {
  teams: Team[] = []
  count: number
  bars: Bars

  constructor(count: number, bars: Bars) {
    this.bars = bars
    this.count = count
    this.teams = bars.bars.map(bar => new Team(bar))
      .concat(this.bars.bars.slice(0, count - bars.count).map(bar => new Team(bar)))
    console.log(`teams = ${this.toString()}`)
  }

  toString() {
    return this.teams.map(team => team.toString())
  }

  pickAwayTeam(homeTeam: Team, homeTeams: Team[], awayTeams: Team[], matchTarget: number): Team {
    const teamsToPlay = this.teams
      .filter(team => team.matchCount < matchTarget)
      .filter(team => team.awayCount < matchTarget / 2)
      .filter(team => !homeTeams.includes(team))
      .filter(team => !awayTeams.includes(team))
      .filter(team => homeTeam.roundRobin.includes(team))
    if (teamsToPlay.length === 0) {
      console.log(`No teams left to play against team ${homeTeam}`)
      return null
    }
    const minAwayPlaysTeams = teamsToPlay.filter(team => team.awayCount <= teamsToPlay.map(t => t.awayCount)
      .reduce((min, current) => current < min ? current : min, matchTarget / 2))
    console.log(`Home team ${homeTeam.toString()}: choose from ${minAwayPlaysTeams}`)
    const picked: Team = minAwayPlaysTeams[random(minAwayPlaysTeams.length)]
    console.log(`Picked away team ${picked.toString()}`)
    homeTeam.removeTeamToPlay(picked)
    picked.removeTeamToPlay(homeTeam)
    return picked
  }
}
