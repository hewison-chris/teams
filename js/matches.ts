import {Bars} from "./bars.js"
import {Teams} from "./teams.js"
import {Match} from "./match.js"
import {Week} from "./week.js"
import {Team} from "./team.js"


export class Schedule {
  bars: Bars
  teams: Teams
  weeks: Week[] = []
  targetMatches: number

  constructor(bars: Bars, teams: Teams, targetMatches: number) {
    this.bars = bars
    this.teams = teams
    this.targetMatches = targetMatches
  }

  calculate() {
    this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams))
    let roundRobinCompleted = false
    let matchesCompleted = false
    const maxWeeks = 52 // Just a safeguard against infinite looping bug
    for (let week = 0; !matchesCompleted && week <= maxWeeks; week++) {
      console.log(`Week ${week + 1}`)
      if (!roundRobinCompleted) {
        roundRobinCompleted = this.roundRobinCompleted()
        if (roundRobinCompleted) {
          console.log("calculate: Round Robin Completed. Re add teams to play")
          this.teams.teams.forEach(team => team.addTeamsToPlay(this.teams.teams))
        }
      }
      let homeTeams: Team[] = []
      let awayTeams: Team[] = []
      this.weeks.push(new Week(week))
      const homeBars = (week % 2 === 0) ? this.bars.bars : this.bars.bars.slice().reverse()
      homeBars.forEach(bar => {
        const homeTeam = bar.pickTeam(awayTeams, this.targetMatches)
        if (homeTeam !== null) {
          homeTeams.push(homeTeam)
          console.log(`picked home team ${homeTeam}`)
          const awayTeam = this.teams.pickAwayTeam(homeTeam, homeTeams, awayTeams, this.targetMatches)
          if (awayTeam === null) {
            homeTeams.splice(homeTeams.findIndex(t => t.toString() === homeTeam.toString()))
          } else {
            awayTeams.push(awayTeam)
            this.weeks[week].matches.push(new Match(homeTeam, awayTeam))
          }
          console.log(this.weeks[week].toString())
        }
        if (week === maxWeeks) {
          alert("Failed to calculate within 52 weeks due to unlucky randomness. Try again.")
        }
      })
      if (roundRobinCompleted) {
        matchesCompleted = this.targetMatchCountReached()
      }
    }
  }

  allMatches() {
    return this.weeks.flatMap(week => week.matches)
  }

  countMatchesForTeam(team) {
    return this.allMatches().filter(match => match.homeTeam === team || match.awayTeam === team).length
  }

  roundRobinCompleted() {
    const remainingRoundRobin = this.teams.teams.filter(team => !team.roundRobinComplete)
    if (remainingRoundRobin.length === 0) {
      console.log("Round robin complete")
      return true
    }
    return false
  }

  targetMatchCountReached() {
    let completed = true
    this.teams.teams.forEach(team => {
      if (team.matchCount < this.targetMatches) {
        console.log(`Team ${team} still has ${this.targetMatches - team.matchCount} matches to play`)
        completed = false
      }
    })
    this.teams.teams.forEach(team => {
      console.log(`Team ${team} played ${team.matchCount} matches`)
    })
    return completed
  }
}
