import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>Harry Potter App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/characters">Characters</Link>
        <Link to="/books">Books</Link>
        <Link to="/houses">Houses</Link>
      </nav>
    </header>
  )
}

