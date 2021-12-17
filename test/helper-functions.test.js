const { combineDateAndTime } = require('../src/utils/helper-functions.js');

describe('CombineDateAndTime', () => {
    test('the function is defined', () => {
        expect(combineDateAndTime).toBeDefined();
    })

    test('returns a new date with date and time combined', () => {
        const date = new Date("2021-12-10")
        expect(combineDateAndTime(date, "13:00")).toEqual("12/10/2021, 1:00:00 pm")
    })
})

