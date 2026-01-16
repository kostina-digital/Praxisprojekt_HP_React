import { Link } from 'react-router-dom'

export default function HouseCardSideMenu({ houses = [] }) {
  return (
    <div className="flex gap-4 flex-col w-full">
      {houses.map((house) => (
        <Link to={house.link} key={house.name}>
          <div key={house.name} className="flex flex-col items-center border-2 border-royal-blue-500 rounded-md p-2 hover:scale-110 transition-all duration-300">
            <img 
              src={house.image} 
              alt={house.name} 
              className="w-full h-[25vh] max-h-[25vh] object-contain border-2 border-royal-blue-500 rounded-md m-0 p-0" 
            />
          </div>
        </Link>
      ))}
    </div>
  )
}