import {Match} from "./match.js"

export class Week {
  week: number
  matches: Match[] = []

  constructor(week: number) {
    this.week = week
  }

  toString() {
    return `${this.matches.map(match => match.toString())}`
  }

  weekNumber() {
    return this.week + 1
  }
}
