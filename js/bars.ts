import {random} from "./random"
import {Bar} from "./bar"

export class Bars {
  bars: Bar[] = []
  count: number

  constructor(count: number) {
    this.count = count
    this.bars = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, count))
      .map(letter => new Bar(letter))
  }

  toString() {
    return this.bars.map(bar => bar.toString())
  }

  reset() {
    this.bars.forEach(bar => bar.reset())
  }

  barsWithOneTeam() {
    return this.bars.filter(bar => bar.isOneTeamBar())
  }

  barsWithTwoTeams() {
    return this.bars.filter(bar => !(bar.isOneTeamBar()))
  }

  pickBar() {
    return this.bars[random(this.count)]
  }
}
