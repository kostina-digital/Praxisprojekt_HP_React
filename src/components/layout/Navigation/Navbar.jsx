import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useCharactersFilter } from '../../../context/CharactersFilterContext'
import { auth } from '../../../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Navbar({ isMobile = false, onLinkClick = null }) {
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [userName, setUserName] = useState(null)
  const navRef = useRef(null)
  const { handleCharactersStyleChange } = useCharactersFilter()
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

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
    <nav ref={navRef} className={`flex items-center ${isMobile ? 'flex-col w-full py-4' : 'justify-between gap-4'}`}>
      <ul className={`flex items-center ${isMobile ? 'flex-col w-full gap-2' : 'justify-center gap-4'}`}>
        <li className={`flex items-center ${isMobile ? 'w-full' : ''}`}>
          <Link 
            to="/" 
            className={`transition-all ${isActive('/') ? 'text-[#646cff]' : 'text-[#0B1C2D]'} hover:drop-shadow-[0_0_8px_#646cffaa] ${isMobile ? 'block w-full px-4 py-2' : ''}`}
            onClick={onLinkClick}
          >
            Home
          </Link>
        </li>
        <li className={`relative flex items-center ${isMobile ? 'w-full flex-col' : ''}`}>
          <button
            onClick={() => handleDropdownToggle('characters')}
            className={`flex items-center gap-1 transition-all bg-transparent border-none p-0 m-0 ${isActive('/characters') ? 'text-[#646cff]' : 'text-[#0B1C2D]'} hover:drop-shadow-[0_0_8px_#646cffaa] ${isMobile ? 'w-full px-4 py-2 text-left' : ''}`}
          >
            Characters
            <span className={`transform transition-transform ${openDropdown === 'characters' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openDropdown === 'characters' && (
            <ul className={`${isMobile ? 'w-full mt-2' : 'absolute top-full left-0 mt-1'} bg-white shadow-lg rounded-md py-2 ${isMobile ? '' : 'min-w-[200px]'} z-10`}>
              <li>
                <Link 
                  to="/characters" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/characters') && location.pathname === '/characters' ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    handleCharactersStyleChange('allCharacters')
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  All Characters
                </Link>
              </li>
              <li>
                <Link 
                  to="/characters/staff" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/characters/staff') ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    handleCharactersStyleChange('onlyStaff')
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link 
                  to="/characters/students" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/characters/students') ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    handleCharactersStyleChange('onlyStudents')
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  Students
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`relative flex items-center ${isMobile ? 'w-full flex-col' : ''}`}>
          <button
            onClick={() => handleDropdownToggle('houses')}
            className={`flex items-center gap-1 transition-all bg-transparent border-none p-0 m-0 ${isActive('/houses') ? 'text-[#646cff]' : 'text-[#0B1C2D]'} hover:drop-shadow-[0_0_8px_#646cffaa] ${isMobile ? 'w-full px-4 py-2 text-left' : ''}`}
          >
            Houses
            <span className={`transform transition-transform ${openDropdown === 'houses' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openDropdown === 'houses' && (
            <ul className={`${isMobile ? 'w-full mt-2' : 'absolute top-full left-0 mt-1'} bg-white shadow-lg rounded-md py-2 ${isMobile ? '' : 'min-w-[200px]'} z-10`}>
              <li>
                <Link 
                  to="/houses/gryffindor" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/houses/gryffindor') ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  Gryffindor
                </Link>
              </li>
              <li>
                <Link 
                  to="/houses/hufflepuff" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/houses/hufflepuff') ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  Hufflepuff
                </Link>
              </li>
              <li>
                <Link 
                  to="/houses/ravenclaw" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/houses/ravenclaw') ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  Ravenclaw
                </Link>
              </li>
              <li>
                <Link 
                  to="/houses/slytherin" 
                  className={`block px-4 py-2 transition-all hover:drop-shadow-[0_0_8px_#646cffaa] ${isActive('/houses/slytherin') ? 'text-[#646cff]' : 'text-[#0B1C2D]'}`}
                  onClick={() => {
                    handleDropdownClose()
                    if (onLinkClick) onLinkClick()
                  }}
                >
                  Slytherin
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`flex items-center ${isMobile ? 'w-full' : ''}`}>
          <Link 
            to="/forum" 
            className={`transition-all ${isActive('/forum') ? 'text-[#646cff]' : 'text-[#0B1C2D]'} hover:drop-shadow-[0_0_8px_#646cffaa] ${isMobile ? 'block w-full px-4 py-2' : ''}`}
            onClick={onLinkClick}
          >
            Forum
          </Link>
        </li>
      </ul>
      <div className={`flex items-center gap-2 ${isMobile ? 'w-full justify-center mt-4 pt-4 border-t border-gray-200' : ''}`}>
        {currentUser ? (
          <Link 
            to="/profile" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group ${isMobile ? 'w-full justify-center' : ''}`}
            onClick={onLinkClick}
          >
            <div className="relative">
              <AccountCircleIcon 
                sx={{ 
                  fontSize: isMobile ? 28 : 32, 
                  color: '#0B1C2D',
                  transition: 'transform 0.2s, filter 0.2s'
                }}
                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#646cffaa]"
              />
            </div>
            <span className={`${isMobile ? 'text-base' : 'text-sm'} font-semibold text-[#0B1C2D] group-hover:drop-shadow-[0_0_8px_#646cffaa] transition-all`}>{userName}</span>
          </Link>
        ) : (
          <Link 
            to="/sign-in" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group ${isMobile ? 'w-full justify-center' : ''}`}
            onClick={onLinkClick}
          >
            <AccountCircleIcon 
              sx={{ 
                fontSize: isMobile ? 28 : 32, 
                color: '#0B1C2D',
                transition: 'transform 0.2s, filter 0.2s'
              }}
              className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#646cffaa]"
            />
            {isMobile && <span className="text-base font-semibold text-[#0B1C2D]">Sign In</span>}
          </Link>
        )}
      </div>
    </nav>
  )
}