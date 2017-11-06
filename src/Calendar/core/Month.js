import {
  // clone,
  daysOrders,
  monthOrders,
  daysMin,
  days,
  Date2,
} from './utils'

export default class Month {
  /*
  ** @param data {Date}
  */
  constructor(date) {
    this.initialMondayWeek()

    const first = new Date2(date.getFullYear(), date.getMonth(), 1)
    const last = new Date2(date.getFullYear(), date.getMonth() + 1, 0)

    this.c = {
      days: daysOrders,
      months: monthOrders,
      daysMin: daysMin,
      now: {
        date: date,
        day: this.getDay(date),
        name: days[this.getDay(date) - 1],
        time: date.getTime(),
      },
      firstDay: {
        date: first,
        day: this.getDay(first),
        name: days[this.getDay(first) - 1],
        time: first.getTime(),
      },
      lastDay: {
        date: last,
        day: this.getDay(last),
        name: days[this.getDay(last)],
        time: last.getTime(),
      },
      month: [],
      numberDays: 0,
    }

    this.init()
  }

  init() {
    this.c.numberDays = this.daysInMonth(this.c.now.date)
    this.createMonth()
    this.createMonthVisual()
  }

  initialMondayWeek() {

  }
  getDay(date) {
    return date.getDay() === 0 ? 7 : date.getDay()
  }
  createDay(date, i) {
    return {
      number: i + 1,
      date: date,
      time: date.getTime(),
      day: this.getDay(date),
      name: days[this.getDay(date)],
    }
  }
  createMonth() {
    let a = this.c.firstDay.date
    for (let i = 0; i <= this.c.numberDays + 1; i++) {
      const date = new Date2(a)
      const day = this.createDay(date, i)
      this.c.month.push(day)
      a = this.addDay(a)
    }
  }

  addDay(date) {
    const d = new Date2(date)
    return d.setDate(d.getDate() + 1)
  }

  daysInMonth(now) {
    return new Date2(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  orderByDate(array, param, param2) {
    return array.sort((a, b) => {
      // Compare the 2 keys
      if (new Date2(a.c[param]).getTime() < new Date2(b.c[param]).getTime()) return -1;
      if (new Date2(a.c[param]).getTime() > new Date2(b.c[param]).getTime()) return 1;
      if (new Date2(a.c[param2]).getTime() < new Date2(b.c[param2]).getTime()) return -1;
      if (new Date2(a.c[param2]).getTime() > new Date2(b.c[param2]).getTime()) return 1;
      return 0;
    });
  }
  appendEventListToMonth(list) {
    const l = this.orderByDate(list, 'start', 'end').map(e => ({
      ...e,
      start: this.createDay(e.c.start, -1),
      end: this.createDay(e.c.end, -1),
    }))

    // console.log(l);
    const _test = l.map(e => ({s: e.start.time, e: e.end.time }))
    // console.log(test);
    const track = []

    // calcular el elemento con el tiempo mas nuevo
    const f1 = l[0].start.time
    // calcula el final del ultimo evento y le resta el f1
    const e1 = l[l.length - 1].end.time - f1

    // achico los numeros y dejo en 0 el element con el start menor
    const test = _test.map(e => (
      {
        s: e.s - f1,
        e: e.e - f1,
      }))

    const add = (_i, arr, out, cb) => {

      if (arr.length > _i) {

        let isAdd = true
        const elm = arr[_i]
        out.forEach( e => {

          // compara que evento a agregar no tope con otro
          if (
            (e.s <= elm.s && e.e >= elm.s) ||
            (e.s <= elm.e && e.e >= elm.e)
          ) {
            isAdd = false
          }
        })

        if (isAdd) {
          out.push({
            ...elm,
            percentS: (elm.s*100)/e1,
            percentE: (elm.e*100)/e1,
          })
        }

        let a = arr
        if (isAdd) {
          // si el evento se agrega. lo quito de la lista para optimizar el
          // recorrido, ya que es innecesario recorrer los ya agregados
          a.splice(_i, 1)
        }

        // vuelvo a ejecutar la agregacion hasta que a queda se recorra
        // todo el array inicial
        // cuando se vuelva a ejecutar la funcion add, lo hara con arreglos
        // mas pequeños ya que splice los elimina si se pudieron agregar
        add(_i + 1, a, out, cb)
      } else {
        cb(out, arr)
      }

    }

    const end = []

    // funcion recursiva para agregar a nuevos arreglos los elementos que no
    // se cruzan entre si
    // gracias a esta funcion se crean los carriless
    const run = ar => {
      if (ar.length > 0) {
        add(0, ar, [], (e, arr) => {

          ar = arr
          end.push(e);
        })
        run(ar)
      }
    }

    run(test)
    console.log(end, e1)
    return end
  }

  createMonthVisual() {
    const c = this.c
    const numberDays = c.numberDays + 1
    const days = []

    const _d = []
    for (let i = 1; i <= this.c.firstDay.day; i++) {
      _d.push(i)
    }
    const d = _d.reverse()

    let h = 0
    for (let i = 1; i < c.firstDay.day; i++) {
      const first = c.firstDay.date
      const date = new Date2(new Date2(first).setDate(new Date(first).getDate() - d[h] + 1))

      days.push({
        n: i,
        currentDay: false,
        currentMonth: false,
        day: this.createDay(date, new Date(date).getDate() - 1),
      })
      h++
    }

    let j = 0
    for (let i = c.firstDay.day; i <= numberDays - 2 + c.firstDay.day ; i++) {
      days.push({
        n: i,
        currentDay: this.c.now.day === i,
        currentMonth: true,
        day: c.month[j]
      })
      j++
    }

    let k = 1
    const ds = days.length
    let n = ds + 1
    for (let i = 0; i < 42 - ds; i++) {
      const last = c.lastDay.date
      const date = new Date2(new Date2(last).setDate(new Date(last).getDate() + k))
      days.push({
        n: n,
        currentDay: false,
        currentMonth: false,
        day: this.createDay(date, k - 1),
      })
      k++
      n++
    }
    this.c.calendar = days
  }

  orderRail() {

  }
}

/*

var l =
1 - 3
6 - 8
2 - 5
5 - 9
1 - 4
var group = [
  track
  track
  track
]


eNuevo
i >=

f <=

t t t
1   1
  2
3
    4
  5 5
6

8
    9

  |t |t |t |
1 |1 |  |  |
2 |  |2 |  |
3 |3 |  |  |
4 |  |  |  |
5 |  |5 |5 |
6 |6 |  |  |
7 |  |  |  |
8 |8 |  |  |
9 |  |  |9 |
0 |  |  |  |


entra
prueba arr 1
  if si existe un e.s o e.e entre el elmento agregado
  si existe

*/
