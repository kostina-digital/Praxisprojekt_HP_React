import { useState } from 'react'
import quizData from './quizData.json'
import quizBG from '../../assets/images/quizBG.png'
import QuizQuestions from './QuizQuestions.jsx'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false)

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  if (quizStarted) {
    return (
      <div className="min-h-screen py-8">
        <QuizQuestions />
      </div>
    )
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-start my-8">Quiz</h1>
      <div className="flex flex-col items-center bg-cover bg-center justify-center h-96 hover:scale-105 transition-all duration-300" style={{ backgroundImage: `url(${quizBG})` }}>
        <h3
          className="text-6xl text-center font-bold italic pt-16"
          style={{
            color: '#fff',
            fontFamily: `'Cormorant Garamond', 'Times New Roman', serif`,
            textShadow: `
              0 0 12px #555, 
              0 2px 4px #888, 
              0 8px 24px #666, 
              0 0 2px #fff
            `
          }}
        >
          Which House Do You Belong To?
        </h3>
        <Box sx={{ mt: 4 }}>
          
        </Box>
      </div>
      <Button
            variant="contained"
            size="large"
            onClick={handleStartQuiz}
            sx={{
              bgcolor: '#1976d2',
              fontSize: '1.5rem',
              px: 4,
              py: 2,
              '&:hover': {
                bgcolor: '#1565c0'
              }
            }}
          >
            Start Quiz
          </Button>
    </>
  )
}