import {Bars} from "./bars"

describe("test Bars class", () => {
  it("should construct Bars", () => {
    const b = new Bars(3)
    expect(b.bars[0].name).toBe("A")
    expect(b.bars[1].name).toBe("B")
    expect(b.bars[2].name).toBe("C")
  })

})
