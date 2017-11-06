import Month from './Month'

class Event {
  constructor(title, start, end) {
    this.c = {
      title: title,
      start: start,
      end: end,
    }
  }
}

class ListEvent {
  constructor() {
    this.c = {
      list: []
    }
  }
  appendEvent(event) {
    this.c.list.push(event)
  }
  getList() {
    return this.c.list
  }
}

const a = new Month(new Date())
const listEvent = new ListEvent()

const e1 = new Event('Test', new Date('2017-10-10T10:10:10'), new Date('2018-11-10T10:10:10'))
const e2 = new Event('Test', new Date('2017-11-10T22:10:10'), new Date('2018-11-10T10:10:10'))
const e3 = new Event('Test', new Date('2017-10-11T21:10:10'), new Date('2017-11-10T10:10:11'))
const e4 = new Event('Test', new Date('2017-09-10T10:10:10'), new Date('2017-11-10T10:10:10'))
const e5 = new Event('Test', new Date('2017-06-10T10:10:10'), new Date('2017-11-10T10:10:10'))
const e6 = new Event('Test', new Date('2017-06-10T10:10:10'), new Date('2017-11-10T10:10:10'))
const e7 = new Event('Test', new Date('2017-06-10T10:10:10'), new Date('2019-11-10T10:10:10'))

listEvent.appendEvent(e1)
listEvent.appendEvent(e2)
listEvent.appendEvent(e3)
listEvent.appendEvent(e4)
listEvent.appendEvent(e5)
listEvent.appendEvent(e6)
listEvent.appendEvent(e7)
listEvent.appendEvent(new Event(
  'Test',
  new Date('2016-06-10T10:10:10'),
  new Date('2017-11-10T10:10:10')
))
listEvent.appendEvent(new Event(
  'Test',
  new Date('2014-06-10T10:10:10'),
  new Date('2015-11-10T10:10:10')
))
listEvent.appendEvent(new Event(
  'Test',
  new Date('2019-11-10T10:10:10'),
  new Date('2019-12-10T10:10:10')
))
listEvent.appendEvent(new Event(
  'Test',
  new Date('2019-12-10T10:10:10'),
  new Date('2019-12-11T10:10:10')
))
listEvent.appendEvent(new Event(
  'Test',
  new Date('2019-12-10T10:10:10'),
  new Date('2019-12-11T10:10:10')
))
const list = listEvent.getList()

a.appendEventListToMonth(list)
