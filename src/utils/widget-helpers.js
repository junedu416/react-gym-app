import moment from 'moment';

const isMoreRecent = (a, b) => {
    // if return  1 order is [b, a]
    // if return -1 order is [a, b]
    // if return 0 order is [a, b]
    if(moment(a).isAfter(moment(b))){
        return 1
    } else {
        return -1
    }
}


export const sortFromMostRecentToOldest = (list, dateAttribute) => {
  const sortedList = list.sort((prev, next) => isMoreRecent(prev[dateAttribute], next[dateAttribute]))
  return sortedList
}

export const sortFromOlderstToMostRecent = (list, dateAttribute) => {
    const sortedList = list.sort((prev, next) => isMoreRecent(next[dateAttribute], prev[dateAttribute]))
    return sortedList
}

export const filterToToday = (list, dateAttribute) => {
    const filteredList = list.filter((item) => moment().isSame(item[dateAttribute], 'day'))
    return filteredList
}
