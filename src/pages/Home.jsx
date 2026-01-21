import Gallery from '../components/common/Gallery.jsx'
import galleryImages from '../components/common/galleryImages.js'
import HouseCard from './Houses/HouseCard.jsx'
import CharactersCard from './Characters/CharactersCard.jsx'
import QuizSection from './QuizPage/QuizSection.jsx'
import ForumSection from './ForumPage/ForumSection.jsx'
import CTAButton from '../components/common/CTAButton.jsx'
import HeroSection from './HeroSection/HeroSection.jsx'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 mt-6 mb-6">
    <HeroSection />
    <Gallery images={galleryImages} />
    <HouseCard /> 
    <QuizSection />
    <CharactersCard />
    <ForumSection />
    </div>
  )
}