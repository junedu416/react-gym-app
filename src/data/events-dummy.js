// dummy data for events 
// similar data to be pulled from backend later on
export const events = [
    {
        title: "David's Personal Training",
        category: "Personal Training",
        description: "Let's build muscles together",
        spotsAvailable: '1',
        startTime: "2022-01-01T01:00:16.000Z",
        endTime: "2022-01-07T03:06:16.000Z"
    },
    //Example Single day and Multi Day Event - Daniel
    {
        title: "Yoga class by Mia",
        category: "Class",
        description: "1 hour intermediate yoga class",
        spotsAvailable: "20",
        startTime: new Date("2021-12-10 13:00"),
        endTime: new Date("2021-12-10 14:00")
    },
    {
        title: "Weight Lift comp",
        category: "Competition",
        description: "Who can lift the heaviest weight at Average Joes?",
        spotsAvailable: "50",
        startTime: new Date("2021-12-07 09:00"),
        endTime: new Date("2021-12-08 15:00")
    },
    {
        title: "Distance comp",
        category: "Competition",
        description: "Who can run the longest distance in total over 5 days?",
        spotsAvailable: "100",
        startTime: new Date("2021-12-10 09:00"),
        endTime: new Date("2021-12-15 15:00")
    }
]
