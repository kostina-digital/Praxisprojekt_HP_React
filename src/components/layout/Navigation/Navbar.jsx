import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null)
  const navRef = useRef(null)

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
    <nav ref={navRef}>
      <ul className="flex items-center justify-center gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="relative">
          <button
            onClick={() => handleDropdownToggle('characters')}
            className="flex items-center gap-1"
          >
            Characters
            <span className={`transform transition-transform ${openDropdown === 'characters' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openDropdown === 'characters' && (
            <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10 border border-gray-200">
              <li>
                <Link 
                  to="/characters" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  All Characters
                </Link>
              </li>
              <li>
                <Link 
                  to="/characters/staff" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link 
                  to="/characters/students" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
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
          <button
            onClick={() => handleDropdownToggle('houses')}
            className="flex items-center gap-1"
          >
            Houses
            <span className={`transform transition-transform ${openDropdown === 'houses' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openDropdown === 'houses' && (
            <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-[200px] z-10 border border-gray-200">
              <li>
                <Link 
                  to="/houses/griffindor" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleDropdownClose}
                >
                  Griffindor
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
    </nav>
  )
}