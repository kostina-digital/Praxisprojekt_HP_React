import Gallery from '../components/common/Gallery.jsx'
import galleryImages from '../components/common/galleryImages.js'
import HouseCard from './Houses/HouseCard.jsx'
import CharactersCard from './Characters/CharactersCard.jsx'



export default function Home() {
  return (
    <div className="flex flex-col gap-8 mt-6 mb-6">
    <Gallery images={galleryImages} />
    <HouseCard /> 
    <CharactersCard />
    </div>
  )
}