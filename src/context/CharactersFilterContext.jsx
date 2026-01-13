import { createContext, useContext, useState, useCallback } from 'react'

const CharactersFilterContext = createContext(null)

export function CharactersFilterProvider({ children }) {
  const [charactersStyle, setCharactersStyle] = useState('allCharacters')

  const handleCharactersStyleChange = useCallback((style) => {
    setCharactersStyle(style)
  }, [])

  return (
    <CharactersFilterContext.Provider value={{ charactersStyle, handleCharactersStyleChange }}>
      {children}
    </CharactersFilterContext.Provider>
  )
}

export function useCharactersFilter() {
  const context = useContext(CharactersFilterContext)
  if (!context) {
    throw new Error('useCharactersFilter must be used within CharactersFilterProvider')
  }
  return context
}

