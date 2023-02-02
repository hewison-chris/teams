import {Bar} from "./bar"
import {Team} from "./team"

describe("test bar class", () => {
  it("should construct bar", () => {
    const a = new Bar("A")
    expect(a.name).toBe("A")
  })
  it("should add team", () => {
    const a = new Bar("A")
    const t = new Team(a)
    expect(a.teams[0].id()).toBe("A1")
    expect(a.teamCount()).toBe(1)
  })
  it("should add second team", () => {
    const a = new Bar("A")
    expect(a.teamCount()).toBe(0)
    const t1 = new Team(a)
    expect(a.teamCount()).toBe(1)
    const t2 = new Team(a)
    expect(a.teamCount()).toBe(2)
    expect(a.teams[0].id()).toBe("A1")
    expect(a.teams[1].id()).toBe("A2")
  })
})
