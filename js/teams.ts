import {Bars} from "./bars.js"
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
    return this.teams.map(team => team.id())
  }

  pickAwayTeam(homeTeam: Team, homeTeams: Team[], awayTeams: Team[], matchTarget: number): Team {
    const teamsNotPlayingThisWeekYet = this.teams
      // Not the home team
      .filter(team => team.id() !== homeTeam.id())
      // Not other match this week
      .filter(team => !homeTeams.includes(team))
      .filter(team => !awayTeams.includes(team))
      // Not played all matches
      .filter(team => team.matchCount() < matchTarget)
      // Not played all away matches
      .filter(team => team.awayCount() < matchTarget / 2)
      // Already played this home team at home
      .filter(team => !homeTeam.homeMatches().map(m => m.awayTeam).includes(team))
      // prevent both bar teams playing away
      .filter(team => !awayTeams.map(t => t.bar).includes(team.bar))
      // prevent all single bar teams playing away
      .filter(team => !team.bar.isOneTeamBar() || awayTeams.filter(t => t.bar.isOneTeamBar())
        .length < this.bars.barsWithOneTeam().length - 1)
    console.log(`Teams not yet playing this week: ${teamsNotPlayingThisWeekYet}`)
    console.log(`Pick away team to play ${homeTeam} from robin1:${homeTeam.roundRobin.toString()}`)
    let teamsToPlay = teamsNotPlayingThisWeekYet
      .filter(team => homeTeam.roundRobin.includes(team))
      .sort((a, b) =>
        a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount())
    if (teamsToPlay.length === 0) {
      console.log(`Pick away team to play ${homeTeam} from robin2:${homeTeam.roundRobin2.toString()}`)
      teamsToPlay = teamsNotPlayingThisWeekYet
        .filter(team => homeTeam.roundRobin2.includes(team))
        .sort((a, b) =>
          a.matchCount() === b.matchCount() ? a.awayCount() - b.awayCount() : a.matchCount() - b.matchCount())
      console.log(`Try choose from ${teamsToPlay}`)
    }
    if (teamsToPlay.length === 0) {
      console.log(`No teams to select`)
      return null
    }
    console.log(`Home team ${homeTeam.toString()}: choose from ${teamsToPlay}`)
    const picked: Team = teamsToPlay[0]
    console.log(`Picked away team ${picked.toString()}`)
    return picked
  }
}
