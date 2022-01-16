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