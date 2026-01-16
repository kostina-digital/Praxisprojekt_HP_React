import housesData from "../HousesData.js";

export default function HousePageHero({ house }) {
    return (
        <div className="flex items-center justify-center">
            <img src={house.heroimage} alt={house.name} className="w-full h-96 object-cover" />
    </div>
  );
}