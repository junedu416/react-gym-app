import { isUserRegistered } from "../src/utils/events-helper-functions"

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