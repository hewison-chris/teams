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

  pickTeam() {
    return this.teams[random(this.count)]
  }

  pickAwayTeam(homeTeam: Team, homeTeams: Team[], awayTeams: Team[], matchTarget: number) {
    const teamsToPlay = this.teams
      .filter(team => team.matchCount < matchTarget)
      .filter(team => !homeTeams.includes(team))
      .filter(team => !awayTeams.includes(team))
      .filter(team => homeTeam.roundRobin.includes(team))
    if (teamsToPlay.length === 0) {
      console.log(`No teams left to play against team ${homeTeam}`)
      return null
    }
    console.log(`Home team ${homeTeam.toString()}: choose from ${teamsToPlay}`)
    const picked = teamsToPlay[random(teamsToPlay.length)]
    console.log(`Picked away team ${picked.toString()}`)
    homeTeam.removeTeamToPlay(picked)
    picked.removeTeamToPlay(homeTeam)
    return picked
  }
}
