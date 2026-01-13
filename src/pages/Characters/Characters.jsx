import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CharacterCard from './CharacterCard.jsx'
import { useCharacters } from '../../hooks/useCharacters.js'
import { useCharactersFilter } from '../../context/CharactersFilterContext.jsx'

export default function Characters() {
  const location = useLocation()
  const { characters, staff, students, loading, error } = useCharacters()
  const { charactersStyle, handleCharactersStyleChange } = useCharactersFilter()
  const [house, setHouse] = useState('all')
  
  // Определяем тип персонажей на основе URL при первой загрузке
  useEffect(() => {
    if (location.pathname === '/characters/staff') {
      handleCharactersStyleChange('onlyStaff')
    } else if (location.pathname === '/characters/students') {
      handleCharactersStyleChange('onlyStudents')
    } else if (location.pathname === '/characters') {
      handleCharactersStyleChange('allCharacters')
    }
  }, [location.pathname, handleCharactersStyleChange])
  
  const handleHouseChange = (e) => {
    setHouse(e.target.value)
  }

  const handleSelectChange = (e) => {
    handleCharactersStyleChange(e.target.value)
  }

  function getFilteredCharacters() {
    let dataToFilter
   if (charactersStyle === 'onlyStaff') {
      dataToFilter = staff
    } else if (charactersStyle === 'onlyStudents') {
      dataToFilter = students
    } else {
      dataToFilter = characters
    }

    if (house === 'all') {
      return dataToFilter
    }
    return dataToFilter.filter(
      character =>
        character.house &&
        character.house.toLowerCase() === house
    )
  }

  const filteredCharacters = getFilteredCharacters()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading characters: {error.message}</div>
  }

  return (
    <>
    <div className='flex flex-col gap-4'>
      <h1>Characters</h1>
      <select value={house} onChange={handleHouseChange}>
        <option value="all">All</option>
        <option value="gryffindor">Gryffindor</option>
        <option value="hufflepuff">Hufflepuff</option>
        <option value="ravenclaw">Ravenclaw</option>
        <option value="slytherin">Slytherin</option>
      </select>

      <select value={charactersStyle} onChange={handleSelectChange}>
        <option value="allCharacters">All Characters</option>
        <option value="onlyStaff">Only Staff</option>
        <option value="onlyStudents">Only Students</option>
      </select>

      <div className='flex flex-wrap gap-4'>
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id || character.name} character={character} />
        ))}
      </div>
    </div>
    </>
  )
}
