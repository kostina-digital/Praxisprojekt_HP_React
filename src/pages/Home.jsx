import Gallery from '../components/common/Gallery.jsx'
import galleryImages from '../components/common/galleryImages.js'



export default function Home() {
  return (
    <div className="p-8">
    <Gallery images={galleryImages} />
    </div>
  )
}