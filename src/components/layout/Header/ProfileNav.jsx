import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function ProfileNav({ currentUser, userName }) {
    return (
        <>
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
                  color: '#0B1C2D',
                  transition: 'transform 0.2s, filter 0.2s'
                }}
                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#646cffaa]"
              />
            </div>
            <span className="text-sm font-semibold text-[#0B1C2D] group-hover:drop-shadow-[0_0_8px_#646cffaa] transition-all">{userName}</span>
          </Link>
        ) : (
          <Link 
            to="/sign-in" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          >
            <AccountCircleIcon 
              sx={{ 
                fontSize: 32, 
                color: '#0B1C2D',
                transition: 'transform 0.2s, filter 0.2s'
              }}
              className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#646cffaa]"
            />
          </Link>
        )}
      </div>
      </>
    )
}