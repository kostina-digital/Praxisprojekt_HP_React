import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CharacterCard from './CharacterCard.jsx'
import { useCharacters } from '../../hooks/useCharacters.js'
import { useCharactersFilter } from '../../context/CharactersFilterContext.jsx'
import PaginationComponent from '../../components/common/PaginationComponent.jsx'

export default function Characters() {
  const location = useLocation()
  const { characters, staff, students, loading, error } = useCharacters()
  const { charactersStyle, handleCharactersStyleChange } = useCharactersFilter()
  const [house, setHouse] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12) // Количество элементов на странице
  const [showAll, setShowAll] = useState(false) // Флаг для "показать все"
  
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

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value
    if (value === 'all') {
      setShowAll(true)
      setItemsPerPage(filteredCharacters.length)
    } else {
      setShowAll(false)
      setItemsPerPage(Number(value))
    }
    setCurrentPage(1) // Сбрасываем на первую страницу при изменении количества
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

  // Обновляем itemsPerPage при изменении количества отфильтрованных элементов (если выбрано "все")
  useEffect(() => {
    if (showAll) {
      setItemsPerPage(filteredCharacters.length)
    }
  }, [filteredCharacters.length, showAll])

  // Вычисляем индексы для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCharacters = filteredCharacters.slice(indexOfFirstItem, indexOfLastItem)

  // Сбрасываем на первую страницу при изменении фильтров
  useEffect(() => {
    setCurrentPage(1)
  }, [house, charactersStyle])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

      <select value={showAll ? 'all' : itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value="12">12 per page</option>
        <option value="24">24 per page</option>
        <option value="48">48 per page</option>
        <option value="all">All</option>
      </select>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-wrap gap-4'>
          {currentCharacters.map(character => (
            <CharacterCard key={character.id || character.name} character={character} />
          ))}
        </div>
        <PaginationComponent 
          totalItems={filteredCharacters.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
    </>
  )
}
