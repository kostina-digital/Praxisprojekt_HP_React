import { useParams, Navigate } from "react-router-dom";
import housesData from "../HousesData.js";
import HousePageHero from "./HousePageHero.jsx";
import HouseCardSideMenu from "../HouseCardSideMenu.jsx";
import HouseCharactersCard from "../HouseCharactersCard.jsx";
import QuizSection from "../../QuizPage/QuizSection.jsx";
export default function HousePage() {
  const { houseName } = useParams();

  // Find house by name from URL (convert to lowercase for comparison)
  const house = housesData.find(
    (h) => h.name.toLowerCase() === houseName?.toLowerCase()
  );

  // If house not found, redirect to 404 page
  if (!house) {
    return <Navigate to="/not-found" replace />;
  }

  // Filter houses: exclude current house
  const otherHouses = housesData.filter(
    (h) => h.name.toLowerCase() !== house?.name.toLowerCase()
  );

  return (
    <>
      <HousePageHero house={house} />
      <div className="flex items-center gap-4 my-8">
        <div className="w-1/4 h-auto flex flex-col items-start justify-start">
          <HouseCardSideMenu houses={otherHouses} className="w-1/4 h-auto" />
        </div>
        <div className="w-3/4 flex flex-col gap-8">
          <div className="flex flex-col items-between gap-4">
            <h1 className="text-4xl text-center underline leading-tight font-bold">{house.emoji} {house.name}</h1>
            <p className="w-full text-lg text-justify">{house.description}</p>
          </div>
          <HouseCharactersCard house={house.name.toLowerCase()} />
        </div>
      </div>
      <QuizSection />

    </>
  )
}
