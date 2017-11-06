import {
  // clone,
  // daysOrders,
  // monthOrders,
  // daysMin,
  days,
  Date2,
} from './utils'

export default class Day {
  constructor(date) {
    this.c = {
      now: {
        date: date,
        day: date.getDay(),
        name: days[date.getDay() - 1],
        time: date.getTime(),
        hours: [],
      },
    }
    this.init()
  }
  init() {
    this.generateHours()
  }
  generateHours() {
    const hours = []
    let date = new Date2(this.c.now.time)
    for (let i = 0; i < 24; i++) {
      hours.push({
        date: new Date2(date).getTime(),
        hour: new Date2(date).getHours(),
      })

      date = new Date2(date).setHours(new Date2(date).getHours() + 1)
    }
    this.c.hours = hours
  }
}
