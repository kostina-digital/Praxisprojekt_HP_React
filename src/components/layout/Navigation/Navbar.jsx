import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useCharactersFilter } from '../../../context/CharactersFilterContext'
import { auth } from '../../../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [userName, setUserName] = useState(null)
  const navRef = useRef(null)
  const { handleCharactersStyleChange } = useCharactersFilter()

  useEffect(() => {
    // Track authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      if (user) {
        // Get user name from email or displayName
        const name = user.displayName || user.email?.split('@')[0] || 'User'
        setUserName(name)
      } else {
        setUserName(null)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  const handleDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const handleDropdownClose = () => {
    setOpenDropdown(null)
  }

  return (
    <nav ref={navRef} className="flex items-center justify-between">
      <ul className="flex items-center justify-center gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="relative">
          <Link to="/characters">
          <button
            onClick={() => handleDropdownToggle('characters')}
            className="flex items-center gap-1"
          >
            Characters
            <span className={`transform transition-transform ${openDropdown === 'characters' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          </Link>
          {openDropdown === 'characters' && (
            <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10 border border-gray-200">
              <li>
                <Link 
                  to="/characters" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    handleDropdownClose()
                    handleCharactersStyleChange('allCharacters')
                  }}
                >
                  All Characters
                </Link>
              </li>
              <li>
                <Link 
                  to="/characters/staff" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    handleDropdownClose()
                    handleCharactersStyleChange('onlyStaff')
                  }}
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link 
                  to="/characters/students" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    handleDropdownClose()
                    handleCharactersStyleChange('onlyStudents')
                  }}
                >
                  Students
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li className="relative">
          <Link to="/houses">
          <button
            onClick={() => handleDropdownToggle('houses')}
            className="flex items-center gap-1"
          >
            Houses
            <span className={`transform transition-transform ${openDropdown === 'houses' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          </Link>
          {openDropdown === 'houses' && (
            <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10 border border-gray-200">
              <li>
                <Link 
                  to="/houses/gryffindor" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  Gryffindor
                </Link>
              </li>
              <li>
                <Link 
                  to="/houses/hufflepuff" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  Hufflepuff
                </Link>
              </li>
              <li>
                <Link 
                  to="/houses/ravenclaw" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  Ravenclaw
                </Link>
              </li>
              <li>
                <Link 
                  to="/houses/slytherin" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  Slytherin
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="flex items-center gap-2">
        {currentUser ? (
          <Link 
            to="/profile" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          >
            <div className="relative">
              <AccountCircleIcon 
                sx={{ 
                  fontSize: 32, 
                  color: '#3b82f6',
                  transition: 'transform 0.2s'
                }}
                className="group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-semibold text-gray-700">{userName}</span>
          </Link>
        ) : (
          <Link 
            to="/sign-in" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          >
            <AccountCircleIcon 
              sx={{ 
                fontSize: 32, 
                color: '#6b7280',
                transition: 'transform 0.2s'
              }}
              className="group-hover:scale-110 group-hover:text-blue-500"
            />
          </Link>
        )}
      </div>
    </nav>
  )
}