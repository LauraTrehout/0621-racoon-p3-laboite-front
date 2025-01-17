import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'

import AdminCard from '../../../components/Admin/AdminCard'
import AdminFormTeamCreate from '../../../components/Admin/AdminFormTeamCreate'
import AdminFormTeamUpdate from '../../../components/Admin/AdminFormTeamUpdate'
import AdminLeftMenu from '../../../components/Admin/AdminLeftMenu'
import AdminTopDiv from '../../../components/Admin/AdminTopDiv'

import '../Admin.css'

const AdminTeam = () => {
  // List of states
  const [refresh, setRefresh] = useState(false)
  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [team, setTeam] = useState([])
  const [idMemberToUpdate, setIdMemberToUpdate] = useState('')
  const [adminInput, setAdminInput] = useState({})
  const [resMessage, setResMessage] = useState('')
  const [memberImage, setMemberImage] = useState()
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [addAlert, setAddAlert] = useState(false)
  const [updateAlert, setUpdateAlert] = useState(false)

  //----------------------------------------------------------------------------
  // READ all team members from backEnd
  useEffect(() => {
    const getTeam = async () => {
      const results = await axios.get(
        `${process.env.REACT_APP_URL_API}/members`
      )
      setTeam(results.data)
    }
    getTeam()
  }, [refresh])

  // READ a member data from idMemberToUpdate
  useEffect(() => {
    setAdminInput('')
    setResMessage('')
    const getMember = () => {
      axios
        .get(`${process.env.REACT_APP_URL_API}/members/${idMemberToUpdate}`)
        .then(results => setAdminInput(results.data))
    }
    getMember()
  }, [idMemberToUpdate])

  // CREATE a new member
  const postMember = async e => {
    e.preventDefault()
    const newPost = { ...adminInput }
    if (memberImage) {
      const fd = new FormData()
      const filename = Date.now() + memberImage.name
      fd.append('member_img', memberImage, filename)
      newPost.member_img = filename
      try {
        await axios.post(`${process.env.REACT_APP_URL_API}/upload`, fd)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL_API}/members`,
        newPost
      )
      setResMessage(res.data.message)
      setRefresh(!refresh)
      setTimeout(closeForm, 2500)
      setAddAlert(true)
    } catch (err) {
      setResMessage(err.response.data.message)
    }
  }

  // UPDATE a member
  const updateMember = async e => {
    e.preventDefault()
    const newPut = { ...adminInput }
    if (memberImage) {
      const fd = new FormData()
      const filename = Date.now() + memberImage.name
      fd.append('member_img', memberImage, filename)
      newPut.member_img = filename
      try {
        await axios.post(`${process.env.REACT_APP_URL_API}/upload`, fd)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_URL_API}/members/${idMemberToUpdate}`,
        newPut
      )
      setResMessage(res.data.message)
      setRefresh(!refresh)
      setTimeout(closeForm, 2500)
      setUpdateAlert(true)
    } catch (error) {
      setResMessage(error.response.data.message)
    }
  }

  // DELETE a member
  const deleteMember = idMemberToUpdate => {
    const confirmation = confirm('Voulez-vous supprimer ce membre ?')
    if (confirmation) {
      const DeleteData = async () => {
        await axios
          .delete(
            `${process.env.REACT_APP_URL_API}/members/${idMemberToUpdate}`
          )
          .then(resToBack => {
            setResMessage(resToBack.data.message)
            setRefresh(!refresh)
            setTimeout(closeForm, 2500)
            setDeleteAlert(true)
          })
          .catch(error => {
            if (error) {
              setResMessage(error.response.data.message)
            }
          })
      }
      DeleteData()
    }
  }
  //----------------------------------------------------------------------------
  // Functions to display forms
  const showCreateForm = () => {
    setAdminInput({}) // clear inputs
    setCreateForm(true) // open createForm
    setUpdateForm(false) // close updateForm
  }
  const showUpdateForm = e => {
    setCreateForm(false) // close createForm
    setUpdateForm(true) // open updateForm
    setIdMemberToUpdate(e.target.id) // auto-trigger getMember
  }
  const closeForm = () => {
    setCreateForm(false) // close createForm
    setUpdateForm(false) // close updateForm
    setAdminInput({}) // clear inputs
    setIdMemberToUpdate('') // clear selected member
    setMemberImage() // clear image input
    setResMessage('') // clear message
    setAddAlert(false) // reset addAlert
    setDeleteAlert(false) // reset deleteAlert
    setUpdateAlert(false) // reset updateAlert
  }
  //Function to update inputs
  const onChangeHandler = useCallback(({ target: { name, value } }) =>
    setAdminInput(state => ({ ...state, [name]: value }), [])
  )
  //----------------------------------------------------------------------------
  return (
    <div className='adminContainer flex row'>
      <AdminLeftMenu />
      <div className='adminMenuRight flex col'>
        <div className='adminHeader'>
          Bienvenue dans l&apos;espace administration !
        </div>
        <div className='topDiv'>
          <AdminTopDiv elmt={'membres'} addElement={showCreateForm} />
          <div className='bg'>
            <div className='cardContainer flex row aic'>
              {team.length === 0 ? (
                <div className='noCard'>
                  Il n&apos;y a pas encore d&apos;élement à afficher ! Merci de
                  créer un nouvel élément !
                </div>
              ) : (
                team.map(elmt => (
                  <AdminCard
                    key={elmt.member_id}
                    id={elmt.member_id}
                    name={elmt.member_name}
                    updateElement={showUpdateForm}
                    deleteCard={deleteMember}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className='bottomDiv flex col jcc aic'>
          {createForm && (
            <>
              <AdminFormTeamCreate
                closeForm={closeForm}
                onChangeHandler={onChangeHandler}
                postMember={postMember}
                resMessage={resMessage}
                setAdminInput={setAdminInput}
                setMemberImage={setMemberImage}
                addAlert={addAlert}
              />
            </>
          )}
          {updateForm && (
            <>
              <AdminFormTeamUpdate
                adminInput={adminInput}
                closeForm={closeForm}
                deleteMember={deleteMember}
                onChangeHandler={onChangeHandler}
                resMessage={resMessage}
                setAdminInput={setAdminInput}
                setMemberImage={setMemberImage}
                updateMember={updateMember}
                updateAlert={updateAlert}
                idMemberToUpdate={idMemberToUpdate}
              />
            </>
          )}
          <Snackbar
            open={deleteAlert}
            autoHideDuration={4000}
            onClose={() => setDeleteAlert(false)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Alert severity='success'>Membre supprimé avec succès</Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}

export default AdminTeam
