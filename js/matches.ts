import {Bars} from "./bars.js"
import {Teams} from "./teams.js"
import {Match} from "./match.js"
import {Week} from "./week.js"
import {Team} from "./team.js"


export class Schedule {
  bars: Bars
  teams: Teams
  weeks: Week[] = []
  weekCount: number

  constructor(bars: Bars, teams: Teams, weekCount: number) {
    this.bars = bars
    this.teams = teams
    this.weekCount = weekCount
  }

  makeSchedule() {
    this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams, this.weekCount))
    this.teams.teams.forEach(t => {
      console.log(t.debug())
    })
    this.calculate()
    this.teams.teams.forEach(t => {
      console.log(t.debug())
    })
  }

  calculate() {
    for (let week = 0; week < this.weekCount; week++) {
      console.log(`Week ${week + 1}`)
      let homeTeams: Team[] = []
      let awayTeams: Team[] = []
      this.weeks.push(new Week(week))
      const homeBars = this.bars.bars.slice().sort((a, b) => a.matchCount - b.matchCount)
      console.log(`home bars=${homeBars.toString()}`)
      homeBars.forEach(bar => {
        let homeTeam = bar.pickHomeTeam(awayTeams, this.weekCount)
        if (homeTeam === null) {
          console.log(`No team left for home bar ${bar}`)
        } else {
          console.log(`picked home team ${homeTeam}`)
          const awayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.weekCount)
          if (awayTeam === null) {
            homeTeam = bar.pickOtherHomeTeam(homeTeam, awayTeams, this.weekCount)
            if (homeTeam === null) {
              console.log(`No team left for home bar ${bar}`)
            } else {
              console.log(`picked other home team ${homeTeam}`)
              const anotherAwayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.weekCount)
              if (anotherAwayTeam !== null) {
                homeTeams.push(homeTeam)
                awayTeams.push(anotherAwayTeam)
                this.weeks[week].matches.push(new Match(homeTeam, anotherAwayTeam, this.weeks[week]))
              }
            }
          } else {
            homeTeams.push(homeTeam)
            awayTeams.push(awayTeam)
            this.weeks[week].matches.push(new Match(homeTeam, awayTeam, this.weeks[week]))
          }
        }
      })
      console.log(this.weeks[week].toString())
    }
  }

  allMatches() {
    return this.weeks.flatMap(week => week.matches)
  }

  checkDone() {
    let completed = true
    this.teams.teams.forEach(team => {
      if (team.matchCount() < this.weekCount) {
        console.log(`Team ${team} still has ${this.weekCount - team.matchCount()} matches to play`)
        completed = false
      }
    })
    if (completed)
      console.log("COMPLETED SCHEDULE")
    else
      console.error("DID NOT COMPLETE SCHEDULE")
    return completed
  }
}
