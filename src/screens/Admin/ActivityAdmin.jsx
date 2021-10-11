import * as Icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import FormTiny from '../../components/Form/FormTiny'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import './ActivityAdmin.css'

const iconList = Object.keys(Icons)
  .filter(key => key !== 'fas' && key !== 'prefix')
  .map(icon => Icons[icon])

library.add(...iconList)

const ActivityAdmin = () => {
  const [activities, setActivities] = useState([])
  const [pole, setPole] = useState([])
  const [adminInput, setAdminInput] = useState({ pole: '1' })
  const [confirmTiny, setConfirmTiny] = useState(false)
  const [selectActivity, setSelectActivity] = useState('1')
  const [image, setImage] = useState()
  const [file, setFile] = useState()

  const recupData = async () => {
    const results = await axios.get(`http://localhost:4000/activities`)
    setActivities(results.data)
    // setLoading(false)
  }

  useEffect(() => {
    recupData()
  }, [])

  useEffect(() => {
    const getPole = async () => {
      const results = await axios.get(`http://localhost:4000/pole`)
      setPole(results.data)
      // setLoading(false)
    }
    getPole()
  }, [])

  const submitData = async e => {
    e.preventDefault()
    const newPost = { ...adminInput }
    if (image) {
      const fd = new FormData()
      const filename = Date.now() + image.name
      fd.append('activity_img', image, filename)

      console.log('coucou filename', filename, fd)
      newPost.activity_img = filename
      try {
        await axios.post('http://localhost:4000/upload', fd)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.post('http://localhost:4000/activities', newPost)
      // window.location.replace('http://localhost:4000/activities' + res.data._id)
    } catch (err) {
      console.log(err)
    }

    // if (confirmTiny === true) {
    //   axios
    //     .post('http://localhost:4000/activities', adminInput)
    //     .then(response => {
    //       console.log(response)
    //       alert('Activité créée')
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    //   setConfirmTiny(false)
    // } else {
    //   alert('Confirmer avant de publier')
    // }
  }

  const deleteActivity = async selectActivity => {
    console.log(('id', selectActivity))
    const id = selectActivity
    axios
      .delete(`${process.env.REACT_APP_URL_API}/activities/${id}`)
      .then(resToBack => {
        recupData()
        console.log('res delete', resToBack)
        alert('Activité supprimée')
      })
      .catch(error => {
        if (error) {
          console.log('logErrDelet', error.response)
          alert(error.response.data.message)
        }
      })
  }

  const onChangeHandler = useCallback(({ target: { name, value } }) =>
    setAdminInput(state => ({ ...state, [name]: value }), [])
  )
  // const onChangeHandler2 = (e) => {
  //     setAdminInput({...adminInput, [e.target.name]: e.target.value })
  // }

  const setData = texte => {
    setAdminInput({ ...adminInput, activity_desc: texte })
  }

  console.log('coucou admininput', adminInput)
  console.log('coucou image', image)

  return (
    <div>
      {/* ------------ drop menu activies Start------------------ */}
      <div className='activityDroplist'>
        <h3 className='activityTitle'>Activités mises en ligne</h3>
        <select
          onChange={e =>
            console.log(e.target.value) || setSelectActivity(e.target.value)
          }
          placeholder='Activités mises en ligne'
          style={{
            width: '50%',
            margin: '20px',
            border: 'solid 1px black',
            background: '#CED4DA'
          }}
        >
          {activities.map(activity => (
            <option value={activity.id}>{activity.activity_title}</option>
          ))}
        </select>
        <div className='droplistButton'>
          <button
            style={{
              background: '#868E96',
              border: 'solid 1px black',
              margin: '10px'
            }}
          >
            Modifier
          </button>
          <button
            onClick={() => deleteActivity(selectActivity)}
            style={{
              background: '#868E96',
              border: 'solid 1px black',
              margin: '10px'
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
      {/* ------------ drop menu activies End------------------ */}
      {/* ------------ form add activies Start------------------ */}
      <div className='activityContainer'>
        <h3 className='activityTitleForm'>Nouvelle activité</h3>
        <div className='activityFormWrapper'>
          <div className='activityItems'>
            <div className='activityCross'>
              <button>
                <FontAwesomeIcon icon='plus' style={{ color: 'black' }} />
              </button>
              {/* -----select Pole Start-----  */}
              {/* -------------------FORM---------------------  */}
              <form encType='multipart/form-data'>
                {/* <div className='activityForm'> */}
                {/* <div className='activityCross'> */}
                <select
                  placeholder='Les poles'
                  onChange={e =>
                    setAdminInput({ ...adminInput, pole: e.target.value })
                  }
                  style={{
                    width: '25%',
                    margin: '15px',
                    border: 'solid 1px black',
                    background: '#CED4DA'
                  }}
                >
                  {pole.map(pole => (
                    <option name={pole.pole_title} value={pole.id}>
                      {pole.pole_title}
                    </option>
                  ))}
                </select>
                {/* -----select Pole End-----  */}
                {/* <button
                  style={{
                    background: '#CED4DA',
                    border: 'solid 1px black'
                  }}
                >
                  <FontAwesomeIcon icon='times' style={{ color: 'black' }} />
                </button> */}
                {/* </div> */}
                <input
                  focus
                  type='text'
                  placeholder={`Titre de l'activité`}
                  key='activity_title'
                  name='activity_title'
                  style={{
                    margin: '10px',
                    border: 'solid 1px black',
                    background: '#CED4DA'
                  }}
                  onChange={onChangeHandler}
                  value={adminInput.activity_title}
                />
                {/* ------------------------------------------FILE----------------------------------------------  */}
                <input
                  type='file'
                  focus
                  placeholder={`URL de l'image`}
                  key='activity_img'
                  name='activity_img'
                  accept='jpg'
                  style={{
                    margin: '10px',
                    border: 'solid 1px black',
                    background: '#CED4DA'
                  }}
                  onChange={e => {
                    setImage(e.target.files[0])
                  }}
                />
              </form>
              <FormTiny setData={setData} setConfirmTiny={setConfirmTiny} />
              <input
                focus
                placeholder={`Prix de l'activité`}
                style={{
                  margin: '10px',
                  border: 'solid 1px black',
                  background: '#CED4DA'
                }}
                key='field5'
                name='field5'
                onChange={onChangeHandler}
                value={adminInput.field5}
              />
              {/* <div className='activityButton'> */}
              <p style={{ color: 'white' }}>
                Penser à confirmer avant de publier
              </p>
              <button
                // type='submit'
                disabled={!confirmTiny}
                onClick={submitData}
                style={{
                  cursor: 'pointer',
                  background: '#868E96',
                  border: 'solid 1px black'
                }}
              >
                Publier
              </button>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityAdmin
