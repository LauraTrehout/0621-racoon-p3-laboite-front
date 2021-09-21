import { Link } from 'react-router-dom'

import { FaFacebook, FaInstagram } from 'react-icons/fa'

import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerSocial'>
        <FaFacebook />
        <FaInstagram />
      </div>
      <div className='footerLink'>
        <Link to=''>Nous soutenir</Link>
        <div className='footerSeparator'></div>
        <Link to=''>L’Association et ses partenaires</Link>
        <div className='footerSeparator'></div>
        <Link to='/contact'>Nous trouver</Link>
        <div className='footerSeparator'></div>
        <Link to=''>On parle de nous</Link>
      </div>
    </footer>
  )
}

export default Footer
