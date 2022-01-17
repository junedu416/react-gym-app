//INPUT: data - Response from the backend with checkin stats.
//Function restructures the data in the correct order as mongo does not always return it in the order shown in the schema.
export const getDataInOrder = (data) => {
    return {
      sun: data.dailyStats.Sunday,
      mon: data.dailyStats.Monday,
      tue: data.dailyStats.Tuesday,
      wed: data.dailyStats.Wednesday,
      thur: data.dailyStats.Thursday,
      fri: data.dailyStats.Friday,
      sat: data.dailyStats.Saturday,
    }
  }