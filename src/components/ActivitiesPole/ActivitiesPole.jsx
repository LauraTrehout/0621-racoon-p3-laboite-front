import '../../App.css'
import './ActivitiesPole.css'

const ActivitiesPole = ({ activity_desc, activity_img }) => {
  return (
    <section className='activitiesContainer'>
      <div className='bothCreamContainer'>
        <div className='leftCreamContainer'>
          <img className='creamSection' src={activity_img} alt='services' />
        </div>
        <div className='rightCreamContainer'>
          <p className='redLeftAlign'>{activity_desc}</p>
        </div>
      </div>
    </section>
  )
}

export default ActivitiesPole
