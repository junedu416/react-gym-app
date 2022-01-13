import { getBaseRoute } from "../src/utils/sidebarUtils";

describe("getBaseRoute", () => {
    it("should return the base route for a nested route", () => {
        const route = "/workouts/edit/1";
        expect(getBaseRoute(route)).toBe("/workouts");
    });
    it("should return the base route for a not nested route", () => {
        const route = "/workouts";
        expect(getBaseRoute(route)).toBe("/workouts");
    });
});