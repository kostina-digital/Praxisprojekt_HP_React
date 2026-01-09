import { Link } from 'react-router-dom'
import LogoContainer from '../Header/LogoContainer.jsx'

export default function Footer() {
  return (
    <footer className='flex items-center justify-between'>
      <LogoContainer />
      <p>&copy; 2025 Hogwarts Paradise</p>
      <div className='flex items-center justify-center gap-4'>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
    </footer>
  )
}

