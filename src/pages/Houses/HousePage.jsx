import { useParams, Navigate } from "react-router-dom";
import housesData from "./HousesData.js";
import HouseCard from "./HouseCard.jsx";

export default function HousePage() {
  const { houseName } = useParams();

  // Находим дом по имени из URL (приводим к lowercase для сравнения)
  const house = housesData.find(
    (h) => h.name.toLowerCase() === houseName?.toLowerCase()
  );

  // Если дом не найден, перенаправляем на страницу 404
  if (!house) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="flex items-center gap-4 p-8">
      <div className="w-1/4 h-auto flex flex-col items-center">
        <HouseCard house={house} className="w-auto h-1/4" />
      </div>
      <div className="w-3/4 h-64 flex flex-col items-center">
        <h1 className="text-4xl font-bold">{house.name}</h1>
        <img
          src={house.image}
          alt={house.name}
          className="w-96 h-96 object-contain"
        />
        <p className="max-w-2xl text-center text-lg">{house.description}</p>
      </div>
    </div>
  );
}
