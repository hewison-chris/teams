import {countDown, schedule} from "./main"


describe("test countdown", () => {
  it("should count down", async () => {
    const c = countDown(2)
    const c2 = await c.next()
    expect(c2.value).toBe("Getting ready: 2")
    expect(c2.done).toBe(false)
    const c1 = await c.next()
    expect(c1.value).toBe("Getting ready: 1")
    expect(c2.done).toBe(false)
    const c0 = await c.next()
    expect(c0.value).toBe("GO")
    expect(c0.done).toBe(true)
  })
})

describe("test schedules", () => {
  it("should return error: not team evey bar", async () => {
    const s = schedule(3, 2, 4)
    const s1 = await s.next()
    expect(s1.value.error).toBe("There needs to be at least one team per bar!")
    expect(s1.done).toBe(true)
  })
  it("should return error: too many teams", async () => {
    const s = schedule(3, 7, 4)
    const s1 = await s.next()
    expect(s1.value.error).toBe("Only a maximum of two teams per bar is supported!")
    expect(s1.done).toBe(true)
  })
  it("should return error: odd number of matches", async () => {
    const s = schedule(3, 3, 3)
    const s1 = await s.next()
    expect(s1.value.error).toBe("Please choose an even number of matches!")
    expect(s1.done).toBe(true)
  })
  it("should return schedule for 4 teams in 3 bars", async () => {
    const s = schedule(3, 4, 4)
    const s1 = await s.next()
    expect(s1.value.bars.count).toBe(3)
    expect(s1.value.teams.count).toBe(4)
    expect(s1.value.completed).toBe(false)
    expect(s1.value.error).toBe("")
    expect(s1.value.message).toBe("")
    expect(s1.done).toBe(false)
    // const s2 = await s.next()
    // expect(s1.value.completed).toBe(true)
    // expect(s1.value.error).toBe("")
    // expect(s1.value.message).toBe("")
    // expect(s1.done).toBe(true)
  })
})
