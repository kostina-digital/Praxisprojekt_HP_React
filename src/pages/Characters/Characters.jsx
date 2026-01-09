import { useState, useEffect } from 'react'
import CharacterCard from './CharacterCard.jsx'

const URL = 'https://hp-api.onrender.com/api/characters'
const URL_STAFF = 'https://hp-api.onrender.com/api/characters/staff'
const URL_STUDENTS = 'https://hp-api.onrender.com/api/characters/students'

export default function Characters() {
  const [characters, setCharacters] = useState([])
  const [staff, setStaff] = useState([])
  const [students, setStudents] = useState([])
  const [house, setHouse] = useState('all')
  const [charactersStyle, setCharactersStyle] = useState('allCharacters')

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.error(error))

    fetch(URL_STAFF)
      .then(response => response.json())
      .then(data => setStaff(data))
      .catch(error => console.error(error))

    fetch(URL_STUDENTS)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error(error))
  }, [])

  const handleHouseChange = (e) => {
    setHouse(e.target.value)
  }

  const handleCharactersStyleChange = (e) => {
    setCharactersStyle(e.target.value)
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

      <select value={charactersStyle} onChange={handleCharactersStyleChange}>
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
