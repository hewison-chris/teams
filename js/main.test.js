"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
describe("test countdown", () => {
    it("should count down", () => __awaiter(void 0, void 0, void 0, function* () {
        const c = (0, main_1.countDown)(2);
        const c2 = yield c.next();
        expect(c2.value).toBe("Getting ready: 2");
        expect(c2.done).toBe(false);
        const c1 = yield c.next();
        expect(c1.value).toBe("Getting ready: 1");
        expect(c2.done).toBe(false);
        const c0 = yield c.next();
        expect(c0.value).toBe("GO");
        expect(c0.done).toBe(true);
    }));
});
describe("test schedules", () => {
    it("should return error: not team evey bar", () => __awaiter(void 0, void 0, void 0, function* () {
        const s = (0, main_1.schedule)(3, 2, 4);
        const s1 = yield s.next();
        expect(s1.value.error).toBe("There needs to be at least one team per bar!");
        expect(s1.done).toBe(true);
    }));
    it("should return error: too many teams", () => __awaiter(void 0, void 0, void 0, function* () {
        const s = (0, main_1.schedule)(3, 7, 4);
        const s1 = yield s.next();
        expect(s1.value.error).toBe("Only a maximum of two teams per bar is supported!");
        expect(s1.done).toBe(true);
    }));
    it("should return error: odd number of matches", () => __awaiter(void 0, void 0, void 0, function* () {
        const s = (0, main_1.schedule)(3, 3, 3);
        const s1 = yield s.next();
        expect(s1.value.error).toBe("Please choose an even number of matches!");
        expect(s1.done).toBe(true);
    }));
    it("should return schedule for 4 teams in 3 bars", () => __awaiter(void 0, void 0, void 0, function* () {
        const s = (0, main_1.schedule)(3, 4, 4);
        const s1 = yield s.next();
        expect(s1.value.bars.count).toBe(3);
        expect(s1.value.teams.count).toBe(4);
        expect(s1.value.completed).toBe(false);
        expect(s1.value.error).toBe("");
        expect(s1.value.message).toBe("");
        expect(s1.done).toBe(false);
        const s2 = yield s.next();
        expect(s1.value.completed).toBe(true);
        expect(s1.value.error).toBe("");
        expect(s1.value.message).toBe("");
        expect(s1.done).toBe(true);
    }));
});
