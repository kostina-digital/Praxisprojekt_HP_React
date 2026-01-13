import hero from '../assets/images/hero.png'
import Gallery from '../components/common/Gallery.jsx'



export default function Home() {
  return (
    <div className="p-8">
    <img src={hero} alt="Hero" className="w-full h-full object-cover" />
    <Gallery />
    </div>
  )
}