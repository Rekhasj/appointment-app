// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentListDetails, toggleIsStarred} = props
  const {id, newtitle, newtimedate, isStarred} = appointmentListDetails
  // console.log(appointmentListDetails)
  const imageURL = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarred = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="app-list-container">
      <div className="cont">
        <p className="title">{newtitle}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStarred}
        >
          <img src={imageURL} className="star" alt="star" />
        </button>
      </div>

      <p className="date">Date: {newtimedate}</p>
    </li>
  )
}
export default AppointmentItem
