import Gallery from '../components/common/Gallery.jsx'
import galleryImages from '../components/common/galleryImages.js'
import HouseCard from './Houses/HouseCard.jsx'
import CharactersCard from './Characters/CharactersCard.jsx'
import QuizSection from './QuizPage/QuizSection.jsx'
import ForumSection from './ForumPage/ForumSection.jsx'
import HeroSection from './HeroSection/HeroSection.jsx'

export default function Home() {
  return (
    <div className="flex flex-col gap-8 mt-6 mb-6">
    <HeroSection />
    
    <section>
    <h2 className="h2_style">Gallery</h2>
    <h3 className="h3_style">Click on a image and enjoy the full screen experience.</h3>
    <Gallery images={galleryImages} />
    </section>
    
    <section>
    <h2 className="h2_style">Houses</h2>
    <h3 className="h3_style">Click on a house to learn more about it.</h3>
    <HouseCard /> 
    </section>

    <section>
    <h2 className="h2_style my-4">Quiz</h2>
    <h3 className="h3_style my-4">Take the quiz to find out which house you belong to.</h3>
    <QuizSection />
    </section>

    <section>
    <h2 className="h2_style">Featured Characters</h2>
    <h3 className="h3_style">Click on a character to learn more about them.</h3>
    <CharactersCard />
    </section>

      <section>
        <h2 className="h2_style">Forum</h2>
        <h3 className="h3_style">Join the forum to discuss the Harry Potter universe.</h3>
        <ForumSection />
      </section>
    </div>
  )
}