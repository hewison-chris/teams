"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_1 = require("./bar");
const team_1 = require("./team");
describe("test bar class", () => {
    it("should construct bar", () => {
        const a = new bar_1.Bar("A");
        expect(a.name).toBe("A");
    });
    it("should add team", () => {
        const a = new bar_1.Bar("A");
        const t = new team_1.Team(a);
        expect(a.teams[0].id()).toBe("A1");
        expect(a.teamCount()).toBe(1);
    });
    it("should add second team", () => {
        const a = new bar_1.Bar("A");
        expect(a.teamCount()).toBe(0);
        const t1 = new team_1.Team(a);
        expect(a.teamCount()).toBe(1);
        const t2 = new team_1.Team(a);
        expect(a.teamCount()).toBe(2);
        expect(a.teams[0].id()).toBe("A1");
        expect(a.teams[1].id()).toBe("A2");
    });
});
