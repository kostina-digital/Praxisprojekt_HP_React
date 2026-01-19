import { useState } from 'react'
import quizData from './quizData.json'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function QuizQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState(null)

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

  const calculateResult = () => {
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

    setResult(quizData.quiz.results[maxHouse])
    setShowResult(true)
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
      <Box className="flex flex-col items-center gap-4 p-8 max-w-2xl mx-auto">
        <Card sx={{ width: '100%', p: 4 }}>
          <CardContent>
            <Typography variant="h3" component="h2" gutterBottom align="center">
              {result.title}
            </Typography>
            <Typography variant="body1" align="center" sx={{ fontSize: '1.2rem', mt: 2 }}>
              {result.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button variant="contained" onClick={handleRestart} size="large">
                Take Quiz Again
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}