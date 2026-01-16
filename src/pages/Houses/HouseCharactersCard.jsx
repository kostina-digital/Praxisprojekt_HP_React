import { Link } from 'react-router-dom'
import { useCharacters } from '../../hooks/useCharacters.js'
import CharacterCard from '../Characters/CharacterCard.jsx'

export default function HouseCharactersCard({ house }) {
  const { characters, loading, error } = useCharacters()
  
  // Filter characters by house
  const houseCharacters = characters.filter(
    (character) =>
      character.house &&
      character.house.toLowerCase() === house?.toLowerCase()
  )
  // Take first 3 characters
  const featuredCharacters = houseCharacters.slice(0, 3)
  
  if (loading) {
    return <div className="text-center py-4">Loading characters...</div>
  }
  
  if (error) {
    return <div className="text-center py-4 text-red-500">Error loading characters</div>
  }
  
  if (featuredCharacters.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Famous Students</h2>
      <div className="flex gap-4 flex-wrap justify-between w-full">
        {featuredCharacters.map((character) => (
          <CharacterCard key={character.id || character.name} character={character} />
        ))}
      </div>
      <div className="flex items-center justify-end">
        <Link 
          to={`/characters?house=${house}`}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          View All Characters →
        </Link>
      </div>
    </div>
  )
}

