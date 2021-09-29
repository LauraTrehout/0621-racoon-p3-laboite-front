import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import NavbarLink from './NavbarLink'
import User from '../../assets/user-icon.png'

import './Navbar.css'

const Navbar = () =>{
const [data, setData] = useState()

useEffect(() => {
axios.get(`http://localhost:4000/pole`).then(res => setData(res.data))
}, [])

data && console.log(data)

return (
<div className='flex navlist'>
    <div>N</div>
    <NavbarLink navTo={'/'} NavTitle={'Le Concept'}/>
    {data &&
    data.map(e => (<NavbarLink key={e.id} navTo={`/pole/${e.id}`} NavTitle={e.pole_name}/>))}
    <NavbarLink navTo={'/partenaires'} NavTitle={'Partenaires'}/>
    <NavbarLink navTo={'/contact'} NavTitle={'Contact'}/>
    <div>
        <NavLink className='flex user-icon' to={'/login'}>
            <img src={User} alt='user' />
        </NavLink>
    </div>
</div>
)
}

export default Navbar