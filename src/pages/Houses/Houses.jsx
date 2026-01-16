
import HouseCard from './HouseCard.jsx'
import Gallery from '../../components/common/Gallery.jsx'
import housesGalleryImages from '../../components/common/housesGalleryImages.js'

export default function Houses() {
  return (
    <>
    <section className="flex flex-col gap-4 mb-8 mt-8">
      <h1>Houses</h1>
      <div className="flex gap-4">
      <HouseCard />
      </div>
      </section>
      <section>
      <h2 className="text-2xl font-bold">Houses Gallery</h2>
      <p className="text-lg text-justify">Have you long been in search of exclusive backgrounds from the Harry Potter universe? Discover and download the finest selections here — entirely free.</p>
      <Gallery images={housesGalleryImages} />
      </section>
    </>
    )
}