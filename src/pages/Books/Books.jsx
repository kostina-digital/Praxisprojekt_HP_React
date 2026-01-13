import BooksImg from './BooksImg.js'
import BooksCarousel from '../../components/common/BooksCarousel.jsx'

export default function Books() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Books</h1>
      <BooksCarousel 
        items={BooksImg}
        itemsToShow={5}
        autoPlay={true}
        slideInterval={5000}
        showNav={true}
      />
    </div>
  )
}

