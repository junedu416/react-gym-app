// dummy data for events 
// similar data to be pulled from backend later on
import moment from "moment"

export const myEvents = [
    {
        id: 1,
        title: "Intermediate HIIT workout class",
        description: "HIIT workout focusing on abs, arns and hips",
        start_date: new Date("2021-12-15"),
        end_date: new Date("2021-12-15"),
        spots_available: 20,
        category: "Class"
    },
    {
        id: 2,
        title: "Heaviest Lifter Comp",
        description: "Who can lift the heaviest weight this week? Don't push yourself too hard, but try your best!",
        start: moment([2021, 12, 6]),
        end: moment([2021, 12, 13]),
        spots_available: null,
        category: "Competition"
    },
    {
        id: 3,
        title: "Beginner Pilates class",
        description: "Achieve your body goals with integration of stretches and core workout",
        start: moment([2021, 12, 20, 11, 0]),
        end: moment([2021, 12, 15, 11, 45]),
        spots_available: 20,
        category: "Class"
    }
]