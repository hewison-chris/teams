"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bars_1 = require("./bars");
describe("test Bars class", () => {
    it("should construct Bars", () => {
        const b = new bars_1.Bars(3);
        expect(b.bars[0].name).toBe("A");
        expect(b.bars[1].name).toBe("B");
        expect(b.bars[2].name).toBe("C");
    });
});
