import {Bars} from "./bars"
import {Teams} from "./teams"
import {Match} from "./match"
import {Week} from "./week"
import {Team} from "./team"

export class Scheduler {
  bars: Bars
  teams: Teams
  weeks: Week[] = []
  matchTarget: number

  constructor(bars: Bars, teams: Teams, matchTarget: number) {
    this.bars = bars
    this.teams = teams
    this.matchTarget = matchTarget
  }

  reset() {
    this.weeks.splice(0, this.weeks.length)
    this.bars.reset()
    this.teams.reset()
    this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams))
    this.teams.teams.forEach(t => {
      console.log(`After reset: ${t.debug()}`)
    })
  }

  private missingWeeklyMatches(weekIndex: number) {
    if (!this.teams.matchesLeft(this.matchTarget)) {
      console.log(`Week ${weekIndex + 1} must be the last week as no matches left`)
      return false
    }
    const weekMatchCount = this.weeks[weekIndex].matches.length
    const expectedCount = this.teams.halfCount()
    console.log(`Week ${weekIndex + 1} has ${weekMatchCount} matches of expected ${expectedCount}`)
    if (weekMatchCount < expectedCount) {
      this.teams.teams.forEach(t => {
        console.log(t.debug())
      })
      return true
    }
    return false
  }

  calculate(): boolean {
    this.reset()
    for (let weekIndex = 0; this.teams.matchesLeft(this.matchTarget); weekIndex++) {
      console.log(`Week ${weekIndex + 1}`)
      let homeTeams: Team[] = []
      let awayTeams: Team[] = []
      this.weeks.push(new Week(weekIndex))
      const homeBars = this.bars.bars.reverse().slice().sort((a, b) => a.weightedCount() - a.weightedCount())
      console.log(`teams: home/away ${this.teams.teams.map(t => "[" + t.id() + ":" + t.homeCount() + "/" + t.awayCount() + "]")}`)
      homeBars.forEach(bar => {
        console.log(`Home team bar ${bar}`)
        let homeTeam = bar.pickHomeTeam(awayTeams, this.matchTarget)
        if (homeTeam === null) {
          console.log(`No team left for home bar ${bar}`)
        } else {
          console.log(`picked home team ${homeTeam}`)
          const awayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.matchTarget)
          if (awayTeam === null) {
            homeTeam = bar.pickOtherHomeTeam(homeTeam, awayTeams, this.matchTarget)
            if (homeTeam === null) {
              console.log(`No team left for home bar ${bar}`)
            } else {
              console.log(`picked other home team ${homeTeam}`)
              const anotherAwayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.matchTarget)
              if (anotherAwayTeam !== null) {
                homeTeams.push(homeTeam)
                awayTeams.push(anotherAwayTeam)
                this.weeks[weekIndex].matches.push(new Match(homeTeam, anotherAwayTeam, this.weeks[weekIndex]))
              }
            }
          } else {
            homeTeams.push(homeTeam)
            awayTeams.push(awayTeam)
            this.weeks[weekIndex].matches.push(new Match(homeTeam, awayTeam, this.weeks[weekIndex]))
          }
        }
      })
      if (this.missingWeeklyMatches(weekIndex)) {
        return false
      }
      console.log(this.weeks[weekIndex].toString())
      if (this.teams.teams.findIndex(t => t.roundRobin.completed) === -1) {
        this.teams.teams.forEach(team => {
          team.addTeamsToPlay(this.teams.teams)
          console.log(`After reset: ${team.debug()}`)
        })
      }
    }
    return true
  }
}
