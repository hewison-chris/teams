import {Bars} from "./bars"
import {Teams} from "./teams"
import {Week} from "./week"

export class Results {
  bars: Bars
  teams: Teams
  weeks: Week[]
  completed: boolean
  message: string
  error: string
  attempt: number

  constructor(bars: Bars, teams: Teams) {
    this.message = ""
    this.error = ""
    this.bars = bars
    this.teams = teams
    this.attempt = 0
    this.completed = false
    this.weeks = []
  }

}
