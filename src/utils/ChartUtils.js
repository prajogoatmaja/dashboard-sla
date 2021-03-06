import moment from "moment";

export function processRawToChart(data) {
  let allTime = []

  data.map((datum) => {
    if (datum.completedAt) {
      if (moment(datum.completedAt) - moment(datum.orderedAt) <= 600000) {
        allTime[moment(datum.orderedAt).format('YYYY-MM-DD')] = {
          duration: allTime[moment(datum.orderedAt).format('YYYY-MM-DD')] ? allTime[moment(datum.orderedAt).format('YYYY-MM-DD')]['duration'] +  moment(datum.completedAt) - moment(datum.orderedAt) : moment(datum.completedAt) - moment(datum.orderedAt),
          count: allTime[moment(datum.orderedAt).format('YYYY-MM-DD')] ? allTime[moment(datum.orderedAt).format('YYYY-MM-DD')]['count'] + 1 : 1
        }
      }
    }
  })

  const timeAverage = Object.keys(allTime).map((date) => ({
    date: date,
    averageTime: allTime[date]['duration'] / allTime[date]['count'] / 1000,
    orderCount: allTime[date]['count']
  }));

  const sortedTimeAverage = timeAverage.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return sortedTimeAverage
}

export function processRawToFeaturedInfo(data) {
  let allTime = {}

  data.map((datum) => {
    if (datum.completedAt) {
      if (moment(datum.completedAt) - moment(datum.orderedAt) <= 600000) {
        allTime = {
          duration: allTime.duration ? allTime.duration +  moment(datum.completedAt) - moment(datum.orderedAt) : moment(datum.completedAt) - moment(datum.orderedAt),
          count: allTime.count ? allTime.count + 1 : 1
        }
      }
    }
  })

  return {
    averageTime: allTime.duration / allTime.count / 1000,
    orderCount: allTime.count
  }
}

export function processRawToTimeHist(data) {
  let allTime = {}
  data.map((datum) => (
    allTime[moment(datum.orderedAt).startOf('hour').format('HH:mm:ss')] = allTime[moment(datum.orderedAt).startOf('hour').format('HH:mm:ss')] ? allTime[moment(datum.orderedAt).startOf('hour').format('HH:mm:ss')] + 1 : 1
  ))
  return allTime
}