import { isUserRegistered, convertTimeToAcceptedFormat } from "../src/utils/events-helper-functions"

describe("isUserRegistered", () => {
    let registeredUsers = ["1111", "2222", "3333"]
    let profile = {
        _id: "1111"
    }
    test("that it returns a boolean", () => {
        const returnValue = isUserRegistered(profile, registeredUsers) 
        expect(typeof returnValue).toBe('boolean')
    })

    test('that it returns true if user is registered', () => {
        const returnValue = isUserRegistered(profile, registeredUsers)
        expect(returnValue).toEqual(true)
    })

    test('that it returns false if user is not registered', () => {
        const returnValue = isUserRegistered({_id: "4444"}, registeredUsers)
        expect(returnValue).toEqual(false)
    })

    test('that it returns false if userId is undefined', () => {
        const returnValue = isUserRegistered(null, registeredUsers)
        expect(returnValue).toEqual(false)
    })

    test('that it returns false if registeredUsers is null', () => {
        const returnValue = isUserRegistered(profile, [])
        expect(returnValue).toEqual(false)
    })
})

describe ('convertTimeToAcceptedFormat', () => {
    const eventObj = {
        startTime:  "2022-01-06T01:00:40.000Z",
        endTime:  "2022-01-06T01:45:40.000Z",
        name: "test event"
    }
    const returnValue = convertTimeToAcceptedFormat(eventObj);

    test('that it returns an object', () => {
        expect(typeof returnValue).toEqual('object')
    })

    test('that it correctly converts startTime and endTime to Date', () => {
        expect(typeof returnValue.startTime).toBe('object')
        expect(typeof returnValue.endTime).toBe('object')
    })

    test('that it does not mutate the other values in the event object', () => {
        expect(returnValue.name).toEqual("test event")
    })

})