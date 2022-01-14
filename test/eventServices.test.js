import "whatwg-fetch"
import { createNewEvent, getAllEvents } from "../src/services/eventsServices";
import { rest } from "msw";
import { setupServer } from 'msw/node';
import { handlers, serverUrl } from "./mocks/handlers";




// set up a mock server when test sends a http request to backend api
const server = setupServer(...handlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("createNewEvent", () => {
    const eventObj = {
        name: "testing event",
        category: "Competition",
        description: "description of competition",
        startTime: "2021-12-20T04:06:58.000Z",
        endTime: "2021-12-20T09:21:58.000Z",
        spotsAvailable: 100
    }
    test("allows post method to work", async () => {
        const response = await createNewEvent(eventObj)
        expect(response).toBeTruthy();
    })

    test("that it returns the correct event name", async () => {
        const response = await createNewEvent(eventObj)
        expect(response.name).toBe("testing event")
    })

    // test('that it throws and error when request fails', async() => {
    //     server.use(
    //         rest.post(`${serverUrl}/events`, (req, res, ctx) => {
    //             return res(
    //                 ctx.status(422),
    //                 ctx.json({error: "Request failed with status code 422"})
    //             )
    //         })
    //     )
    //     const response = await createNewEvent(eventObj);
    //     expect(() => createNewEvent(eventObj)).toThrow();
    // })
})

describe("getAllEvents", () => {
    test("that it returns an array of events", async() => {
        const response = await getAllEvents();
        expect(typeof response == 'object').toBeTruthy();
    })
    test("that it returns the correct number of events", async() => {
        const response = await getAllEvents();
        expect(response.length).toEqual(3);
    })
})


