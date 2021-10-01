import { useState } from 'react'

import AdminCard from '../../components/Admin/AdminCard'
import AdminForm from '../../components/Admin/AdminForm'
import AdminLinkBtn from '../../components/Admin/AdminLinkBtn'
import TeamAdmin from './TeamAdmin'

import './Admin.css'

const AdminPole = () => {
  // List of fields from backEnd
  const adminFieldList = [
    { id: 1, name: 'Pôles', picto: 'A', route: 'pole' },
    { id: 2, name: 'Activités', picto: 'B', route: 'activity' },
    { id: 3, name: 'Membres', picto: 'C', route: 'team' }
  ]
  // List of poles from backEnd
  let team = ['Sylvie Vannier', 'Thierry Petonnet', 'Hélène Ferreira']
  const [elementList, setElementList] = useState(team)

  // Variable to check if form is open
  const [isOpenForm, setIsOpenForm] = useState(false)

  // Function to add a new element to list
  const addElement = () => {
    setElementList(elementList.concat('Nouveau'))
    // console.log(elementList)
  }
  // Function to remove an element from list
  const removeElement = () => {
    setElementList(elementList.pop())
    console.log(elementList)
    // console.log(elementList)
  }

  // Function to display form
  const displayForm = e => {
    let myClass = e.target.className
    console.log('class', myClass)

    // if (myClass.includes('id')) {
    //   let charIdStart = myClass.indexOf('id')
    //   let myClassTrunc = myClass.slice(0, charIdStart)
    //   let charIdEnd = myClassTrunc.indexOf(' ')

    //   console.log('hey', myClassTrunc)
    // }

    setIsOpenForm(true)
    localStorage.setItem('IsOpenForm', true)
    // console.log(isOpenForm, JSON.parse(localStorage.getItem('isOpenForm')))
    // console.log('Form visible: ', isVisibleForm)
  }

  return (
    <div className='adminContainer flex row'>
      <div className='adminMenuLeft flex col'>
        <div className='dashboard'>Dashboard</div>
        {adminFieldList.map((btn, index) => (
          <AdminLinkBtn
            key={index}
            name={btn.name}
            picto={btn.picto}
            id={btn.id}
            route={btn.route}
          />
        ))}
      </div>
      <div className='adminMenuRight flex col'>
        <div className='adminHeader'>
          Bienvenue dans l&apos;espace administration !
        </div>
        <div className='topDiv'>
          <div className='topDivTitle'>
            <p>Listes des membres déjà en ligne</p>
            <div className='addButton flex row jcc aic' onClick={addElement}>
              <div>Nouvel élément</div>
              <div className='plusBtn flex jcc aic'>+</div>
            </div>
          </div>
          <div className='bg'>
            <div className='cardContainer flex row aic'>
              {elementList.length === 0 ? (
                <div className='noCard'>
                  Il n&apos;y a pas encore d&apos;élement à afficher ! Merci de
                  créer un nouvel élément !
                </div>
              ) : (
                elementList.map((elmt, index) => (
                  <AdminCard
                    key={index}
                    elmt={elmt}
                    id={index + 1}
                    displayForm={displayForm}
                    removeElement={removeElement}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className='bottomDiv flex col jcc aic'>
          {isOpenForm && (
            <>
              <AdminForm displayForm={displayForm} />
              <TeamAdmin />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPole
