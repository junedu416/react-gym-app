import { rest } from 'msw';


export const serverUrl = 'http://localhost:3000';

export const handlers = [
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
    }),

    rest.get(`${serverUrl}/events`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([{
            name: "first event",
            category: "Class",
            _id: "001"
        }, {
            name: "second event",
            category: "Competition",
            _id: "002"
        },{
            name: "third event",
            category: "Class",
            _id: "003"
        }
    ]))
    })

    // rest.get(`${serverUrl}/events/001`, (req, res, ctx) => {
    //     console.log(`request is`, req)
    //     const {id} = req.url.searchParams.get('id')
    //     res(ctx.status(200), ctx.json({
    //         name: "testing event",
    //         category: "Competition",
    //         description: "description of competition",
    //         startTime: "2021-12-20T04:06:58.000Z",
    //         endTime: "2021-12-20T09:21:58.000Z",
    //         spotsAvailable: 100,
    //         eventImage: null,
    //         registeredUsers: [],
    //         _id: id
    //     }))
    // })
]