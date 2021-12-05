
// combines date and time into one new Date
const combineDateAndTime = (date, time) => {
    // date = Date(), time = "hh:mm"
    // 1. separate time into "hh" and "mm"
    const dateString = date.toLocaleDateString();
    const dateAndTimeString = dateString + " " + time
    const newDate = new Date(dateAndTimeString)
    return newDate.toLocaleString()
}

module.exports = {
    combineDateAndTime
}