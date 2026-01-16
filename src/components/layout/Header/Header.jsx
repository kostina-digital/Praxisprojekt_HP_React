import { Link } from 'react-router-dom'
import LogoContainer from './LogoContainer.jsx'
import Navbar from '../Navigation/Navbar.jsx'

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-gray-200">
      <LogoContainer />
      <Navbar />
    </header>
  )
}

