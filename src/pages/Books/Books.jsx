import book1 from '../../assets/images/book1.png'
import book2 from '../../assets/images/book2.png'
import book3 from '../../assets/images/book3.png'
import book4 from '../../assets/images/book4.png'
import book5 from '../../assets/images/book5.png'
import book6 from '../../assets/images/book6.png'
import book7 from '../../assets/images/book7.png'

export default function Books() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Books</h1>
      <div className="flex flex-wrap gap-4">
        <img src={book1} alt="Books" className="w-1/2 h-1/2 object-cover" />
        <img src={book2} alt="Books" className="w-1/2 h-1/2 object-cover" />
        <img src={book3} alt="Books" className="w-1/2 h-1/2 object-cover" />
        <img src={book4} alt="Books" className="w-1/2 h-1/2 object-cover" />
        <img src={book5} alt="Books" className="w-1/2 h-1/2 object-cover" />
        <img src={book6} alt="Books" className="w-1/2 h-1/2 object-cover" />
        <img src={book7} alt="Books" className="w-1/2 h-1/2 object-cover" />
      </div>
    </div>
  )
}

