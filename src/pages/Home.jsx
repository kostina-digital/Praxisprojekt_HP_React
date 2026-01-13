import hero from '../assets/images/hero.png'


export default function Home() {
  return (
    <div className="p-8">
    <img src={hero} alt="Hero" className="w-full h-full object-cover" />
    </div>
  )
}