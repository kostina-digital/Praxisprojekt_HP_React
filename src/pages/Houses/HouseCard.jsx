import housesData from './HousesData.js'
import { Link } from 'react-router-dom'


export default function HouseCard() {
  return (
    <>
    <h2 className="h2_style">Houses</h2>
    <h3 className="h3_style">Click on a house to learn more about it.</h3>
    <div className="flex gap-4 flex-wrap justify-between w-full">
      {housesData.map((house) => (
        <Link to={house.link} key={house.name}>
          <div key={house.name} className="flex flex-col items-center border-2 border-royal-blue-500 rounded-md p-2 hover:scale-110 transition-all duration-300 gap-2">
            <img src={house.image} alt={house.name} className="w-64 h-auto object-fill border-2 border-royal-blue-500 rounded-md m-0 p-0" />
            <h3 className="h3_style">{house.emoji} {house.name}</h3>
          </div>
        </Link>
      ))}
    </div>
    </>
  )
}