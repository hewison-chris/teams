import {Match} from "./"

export class Week {
  week: number
  matches: Match[] = []

  constructor(weekIndex: number) {
    this.week = weekIndex + 1
  }

  toString() {
    return `${this.matches.map(match => match.toString())}`
  }

  weekNumber() {
    return this.week
  }
}
