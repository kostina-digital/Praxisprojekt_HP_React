import { useState } from 'react'
import QuizQuestions from './QuizQuestions.jsx'
import StartQuizSection from './StasrtQuizSection.jsx'

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false)

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  if (quizStarted) {
    return (
      <>
        <StartQuizSection handleStartQuiz={handleStartQuiz} />
        <QuizQuestions />
      </>
    )
  }

  return (
    <StartQuizSection handleStartQuiz={handleStartQuiz} />
  )
}