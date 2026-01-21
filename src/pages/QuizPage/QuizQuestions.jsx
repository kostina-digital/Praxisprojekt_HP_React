import { useState, useEffect } from 'react'
import quizData from './quizData.json'
import CTAButton from '../../components/common/CTAButton.jsx'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import GryffindorImg from '../../assets/images/GryffindorHero.png'
import HufflepuffImg from '../../assets/images/HufflepuffHero.png'
import RavenclawImg from '../../assets/images/RavenclawHero.png'
import SlytherinImg from '../../assets/images/SlytherinHero.png'
import QuizResultsSection from '../../components/common/QuizResultsSection.jsx'
import { auth } from '../../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { saveQuizResult } from '../../firebase/quiz.js'

const houseImages = {
  courage: GryffindorImg,
  wisdom: RavenclawImg,
  loyalty: HufflepuffImg,
  ambition: SlytherinImg
}

export default function QuizQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  // Get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Current user UID:', user.uid)
        console.log('Current user email:', user.email)
      }
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  const questions = quizData.quiz.questions
  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerChange = (event) => {
    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === event.target.value
    )
    setAnswers({
      ...answers,
      [currentQuestion.id]: selectedOption.house
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateResult()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateResult = async () => {
    const houseCounts = {
      courage: 0,
      wisdom: 0,
      loyalty: 0,
      ambition: 0
    }

    Object.values(answers).forEach((house) => {
      if (houseCounts.hasOwnProperty(house)) {
        houseCounts[house]++
      }
    })

    const maxHouse = Object.keys(houseCounts).reduce((a, b) =>
      houseCounts[a] > houseCounts[b] ? a : b
    )

    // Save only the house name for Firebase
    setResult({ houseName: maxHouse })
    setShowResult(true)

    // Save result to Firebase if user is logged in
    if (currentUser && currentUser.uid) {
      try {
        console.log('Saving quiz result for user:', currentUser.uid, 'house:', maxHouse)
        await saveQuizResult(currentUser.uid, maxHouse)
        console.log('Quiz result saved to Firebase successfully for user:', currentUser.uid)
      } catch (error) {
        console.error('Failed to save quiz result:', error)
        // Don't block result display even if save failed
      }
    } else {
      console.log('User not logged in, skipping save to Firebase')
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResult(false)
    setResult(null)
  }

  const selectedAnswer = answers[currentQuestion.id]
    ? currentQuestion.options.find(
        (opt) => opt.house === answers[currentQuestion.id]
      )?.id
    : ''

  if (showResult && result) {
    return (
      <QuizResultsSection houseName={result.houseName} handleRestart={handleRestart} />
    )
  }

  return (
    <Box className="flex flex-col items-center gap-4 p-8 max-w-3xl mx-auto">
      <Card sx={{ width: '100%', p: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="h6" component="h3" sx={{ mb: 3, mt: 2 }}>
            {currentQuestion.text}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={selectedAnswer}
              onChange={handleAnswerChange}
            >
              {currentQuestion.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.text}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: currentQuestionIndex === 0 ? 'flex-end' : 'space-between', mt: 4, gap: 2 }}>
            {currentQuestionIndex > 0 && (
              <CTAButton
                text="Previous"
                onClick={handlePrevious}
              />
            )}
            <CTAButton
              text={currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              onClick={handleNext}
              isDisabled={!selectedAnswer}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}