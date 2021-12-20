import { createNewEvent } from "../src/services/eventsServices";
import { rest } from "msw";
import { setupServer } from 'msw/node';
// import gymApi from '../src/config/api';

const serverUrl = 'http://localhost:3000';

// set up a mock server when test sends a http request to backend api
const server = setupServer(
    rest.post(`${serverUrl}/events`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
                name: "testing event",
                category: "Competition",
                description: "description of competition",
                startTime: "2021-12-20T04:06:58.000Z",
                endTime: "2021-12-20T09:21:58.000Z",
                spotsAvailable: 100,
                eventImage: null,
                registeredUsers: [],
                _id: "001"
            }));
    })
)

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

    // test('that it handles failures', async() => {
    //     server.use(
    //         rest.post(`${serverUrl}/events`, (req, res, ctx) => {
    //             return res(ctx.status(422));
    //         })
    //     )
    //     await expect(() => {
    //         createNewEvent({fail: "fail"})
    //     }).rejects.toThrow("Request failed with status code 422")
        
    // })
})