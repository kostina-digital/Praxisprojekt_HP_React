import { useState, useEffect } from 'react'

const URL = 'https://hp-api.onrender.com/api/characters'
const URL_STAFF = 'https://hp-api.onrender.com/api/characters/staff'
const URL_STUDENTS = 'https://hp-api.onrender.com/api/characters/students'

export function useCharacters() {
  const [characters, setCharacters] = useState([])
  const [staff, setStaff] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    Promise.all([
      fetch(URL)
        .then(response => response.json())
        .catch(err => {
          console.error('Error fetching characters:', err)
          return []
        }),
      fetch(URL_STAFF)
        .then(response => response.json())
        .catch(err => {
          console.error('Error fetching staff:', err)
          return []
        }),
      fetch(URL_STUDENTS)
        .then(response => response.json())
        .catch(err => {
          console.error('Error fetching students:', err)
          return []
        })
    ])
      .then(([allCharacters, staffData, studentsData]) => {
        setCharacters(allCharacters)
        setStaff(staffData)
        setStudents(studentsData)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { characters, staff, students, loading, error }
}

