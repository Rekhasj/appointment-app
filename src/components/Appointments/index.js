import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isFilterActive: false}

  onAddContact = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

    const newAppointment = {
      id: v4(),
      newtitle: title,
      newtimedate: newDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(eachList => eachList.isStarred === true)
    }
    return appointmentList
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  render() {
    const {title, date} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    console.log(title)

    return (
      <div className="home-container">
        <div className="card-container">
          <div className="details-container">
            <div className="name-container">
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.onAddContact} className="form-container">
                <label htmlFor="title" className="label-name">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  className="input"
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label-name">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  className="input"
                  onChange={this.onChangeDate}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="separator" />
          <div className="appointment-container">
            <div className="appointment-list-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                className="starred"
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentListDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
