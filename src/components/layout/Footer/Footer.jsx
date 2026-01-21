import { Link } from 'react-router-dom'
import LogoContainer from '../Header/LogoContainer.jsx'

export default function Footer() {
  return (
    <footer className='flex flex-col md:flex-row items-center justify-between border-t-2 border-gray-200 p-4 gap-4'>
      <LogoContainer />
      <p className='text-sm md:text-base text-center'>&copy; 2025 Hogwarts Paradise</p>
      <div className='flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-base'>
        <Link to="/privacy-policy" className='hover:text-[#646cff] transition-colors'>Privacy Policy</Link>
        <Link to="/terms-of-service" className='hover:text-[#646cff] transition-colors'>Terms of Service</Link>
        <Link to="/contact-us" className='hover:text-[#646cff] transition-colors'>Contact Us</Link>
      </div>
    </footer>
  )
}

