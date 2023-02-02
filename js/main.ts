import {Results} from "./results"
import {Scheduler} from "./scheduler"
import {Bars} from "./bars"
import {Teams} from "./teams"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function* countDown(counts: number = 3): AsyncGenerator<string> {
  let count = counts
  while (count > 0) {
    yield `Getting ready: ${count}`
    await delay(200)
    count--
  }
  return `GO`
}

export async function* schedule(barCount: number, teamCount: number, matchTarget: number,
                                maxAttempts: number = 1): AsyncGenerator<Results> {
  const bars = new Bars(barCount)
  const teams = new Teams(teamCount, bars)
  const results = new Results(bars, teams)
  let done = false
  if (teamCount < barCount) {
    results.error = "There needs to be at least one team per bar!"
    return results
  }
  if (teamCount > 2 * barCount) {
    results.error = "Only a maximum of two teams per bar is supported!"
    return results
  }
  if (matchTarget % 2 !== 0) {
    results.error = "Please choose an even number of matches!"
    return results
  }
  yield results
  const scheduler = new Scheduler(bars, teams, matchTarget)
  console.debug("Schedule...")
  console.debug(`before do:attempt=${results.attempt}`)
  do {
    results.attempt++
    console.debug(`do:attempt=${results.attempt}`)
    done = scheduler.calculate()
    if (!done && results.attempt % 10 === 0) {
      results.message = `Not yet found a solution after ${results.attempt} attempts`
      await delay(10)
      yield results
    }
  } while (results.attempt < maxAttempts && !done)
  if (results.attempt >= maxAttempts) {
    results.error = `Failed to make schedule with equal number of matches after ${results.attempt} attempts`
    results.weeks = scheduler.weeks
    console.warn(results.error)
  } else {
    results.completed = true
    results.weeks = scheduler.weeks
    results.message = `Succeeded to make schedule after ${results.attempt} attempts`
    console.log(results.message)
  }
  console.debug("exit")
  return results
}
