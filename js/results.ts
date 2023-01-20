import {Bars} from "./bars.js"
import {Teams} from "./teams.js"
import {Week} from "./week.js"

export class Results {
  bars: Bars
  teams: Teams
  weeks: Week[]
  completed: boolean
  message: string

  constructor(bars: Bars, teams: Teams) {
    this.completed = false
    this.bars = bars
    this.teams = teams
  }
}
