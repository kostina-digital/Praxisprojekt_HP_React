import { Link } from 'react-router-dom'
import { useCharacters } from '../../hooks/useCharacters.js'
import CharacterCard from './CharacterCard.jsx'

export default function CharactersCard() {
  const { characters, loading, error } = useCharacters()
  
  // Show random 4 characters on home page
  // Filter only characters with valid photo (not empty string, not undefined)
  const charactersWithPhoto = characters.filter(
    (c) => c.image && c.image.trim()
  );
  const shuffledCharacters = [...charactersWithPhoto].sort(() => Math.random() - 0.5);
  const featuredCharacters = shuffledCharacters.slice(0, 4);
  
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Characters</h2>
      </div>
      <div className="flex gap-4 flex-wrap justify-between w-full">
        {featuredCharacters.map((character) => (
          <CharacterCard key={character.id || character.name} character={character} />
        ))}
      </div>
      <div className="flex items-center justify-end">
        <Link 
          to="/characters" 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          View All Characters →
        </Link>
      </div>
    </div>
  )
}
