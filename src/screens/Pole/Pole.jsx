import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

import ActivitiesPole from '../../components/ActivitiesPole/ActivitiesPole'
import BottomCenter from '../../components/BottomCenter/BottomCenter'
import FuncPole from '../../components/FuncPole/FuncPole'
import RibbonTitle from '../../components/RibbonTitle/RibbonTitle'
import TopCenter from './../../components/TopCenter/TopCenter'
import Loader from './../../components/Loader/Loader'

import '../../components/ActivitiesPole/ActivitiesPole.css'
import './Pole.css'

const Pole = () => {
  const [poleData, setPoleData] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
    const recupData = async () => {
      const results = await axios.get(`http://localhost:4000/pole/${id}`)
      setPoleData(results.data)
      setLoading(false)
    }
    recupData()
  }, [id])

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className='banner'>
        <img src={poleData.pole_banner} />
      </div>
      <div>
        <RibbonTitle picto={poleData.pole_picto} title={poleData.pole_title} />
      </div>
      <TopCenter {...poleData} />
      <FuncPole {...poleData} />
      <div className='titleCreamContainer'>
        <div className='titleRedLigns'>
          <h2 className='cream'>Services proposés</h2>
        </div>
        <TopCenter {...poleData} />
        <FuncPole {...poleData} />
        <div className='titleCreamContainer'>
          <div className='titleRedLigns'>
            <h2 className='cream'>Services proposés</h2>
          </div>
        </div>
        <div>
          <div className='box'>
            {/* pour acceder a un tableau de tableau faire un loading */}
            {poleData.activities.map(activity => (
              <ActivitiesPole key={activity.id} {...activity} />
            ))}
          </div>
        </div>
        <BottomCenter />
      </div>
    </>
  )
}

export default Pole
