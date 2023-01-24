import {Bars} from "./bars.js"
import {Teams} from "./teams.js"
import {Week} from "./week.js"

export class Results {
  bars: Bars
  teams: Teams
  weeks: Week[] = []
  completed: boolean = false
  message: string
  error: string
  attempt: number = 0

  constructor(bars: Bars, teams: Teams) {
    this.bars = bars
    this.teams = teams
  }
}
