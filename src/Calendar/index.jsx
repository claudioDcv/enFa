import React, { Component } from 'react'
// import moment from 'moment'

import './core/Scheduler'

import Month from './core/Month'
import Day from './core/Day'
import { getSetStyleProp } from './core/dom'

import { capitalizeFirstLetter, Date2 } from './core/utils'

import './Calendar.css';


class Calendar extends Component {
  constructor(props) {
    super(props)
    // moment.isDate(props.initialDate)
    this.state = {
      month: new Month(new Date2()).c,
      showMonth: true,
      showDay: false,
      showYear: false,
      day: null,
      titleDay: '',
      calendarHeight: 0,
    }

    this.node = null
    this.showDay = this.showDay.bind(this)
    this.showNowMonth = this.showNowMonth.bind(this)
    this.showPrevMonth = this.showPrevMonth.bind(this)
    this.showNextMonth = this.showNextMonth.bind(this)
    this.showCurrentMonth = this.showCurrentMonth.bind(this)
  }

  componentDidMount() {
    if(this.node) {
      this.setState({
        calendarHeight: getSetStyleProp(this.node, 'offsetHeight'),
      })
    }
  }
  createHeaderVisual() {
    return (
      <div>
        <div className="year-cont">
          {this.state.month.now.date.getFullYear()}
        </div>
        <div>
          <button className="btn btn-month" onClick={
            () => this.showCurrentMonth(this.state.month)
          }>
            {capitalizeFirstLetter(this.state.month.months[this.state.month.now.date.getMonth()])}
          </button>
          <button className="btn-icon" onClick={() => this.showPrevMonth(this.state.month)}>
            <i className="arrow-left icon" />
          </button>
          <button className="btn-icon" onClick={() => this.showNowMonth(new Date2())}>
            <i className="target icon" />
          </button>
          <button className="btn-icon" onClick={() => this.showNextMonth(this.state.month)}>
            <i className="arrow-right icon" />
          </button>
          {this.state.showDay && (<div className="header-element">{this.state.titleDay}</div>)}
        </div>
      </div>
    )
  }

  createMonthHeaderVisual() {
    return this.state.month.days.map(e => (
      <div key={e} className="header-day">
        <div className="info">
          {capitalizeFirstLetter(e)}
        </div>
      </div>
    ))
  }

  createMonthVisual() {
    return this.state.month.calendar.map(e => (
      <div key={e.n} className="day">
        <div
          onClick={() => this.showDay(e)}
          className={`info${
            e.currentMonth ? ' current-month' : ''}${
              e.currentDay ? ' current-day' : ''}`}
        >
          {e.day && e.day.number}
        </div>
      </div>
    ))
  }

  createDaysVisual() {
    return this.state.day.hours.map(e => (
      <div className="hour" key={e.hour}>{e.hour}</div>
    ))
  }

  showDay(date) {
    this.setState({
      showMonth: false,
      showDay: true,
      titleDay: date.day.name,
      month: new Month(date.day.date).c,
      day: new Day(date.day.date).c,
    })
  }

  showNowMonth(date) {
    this.setState({
      showMonth: true,
      showDay: false,
      month: new Month(date).c,
    })
  }

  showCurrentMonth(month) {
    this.setState({
      showMonth: true,
      showDay: false,
      month: new Month(month.now.date).c,
    })
  }

  showPrevMonth(month) {
    const d = new Date2(month.now.date).setMonth(new Date2(month.now.date).getMonth() - 1)
    this.setState({
      showMonth: true,
      showDay: false,
      month: new Month(new Date2(d)).c,
    })
  }

  showNextMonth(month) {
    const d = new Date2(month.now.date).setMonth(new Date2(month.now.date).getMonth() + 1)
    this.setState({
      showMonth: true,
      showDay: false,
      month: new Month(new Date2(d)).c,
    })
  }

  render() {
    return (
      <div className="calendar" ref={ e => this.node = e}>
        <div className="header header-year">
          {this.createHeaderVisual()}
        </div>
        {this.state.showMonth && this.node && (
          <div className="month-cont">
            <div className="month-wrap">
              <div className="header header-month">
              {this.createMonthHeaderVisual()}
            </div>
          </div>
          <div className="month" style={{
            height: `${this.state.calendarHeight - 35 - 30}px`,
          }}>
            {this.createMonthVisual()}
          </div>
        </div>)}

        {this.state.showDay && (
          <div className="day-cont" style={{
            height: `${this.state.calendarHeight - 35}px`,
          }}>
            {this.createDaysVisual()}
          </div>
        )}
      </div>
    ) 
  }
}

export default Calendar
