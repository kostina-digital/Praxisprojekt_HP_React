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
      <h1 className="h1_style !text-start mt-8">Quiz</h1>
      <h3 className="h3_style my-8"> Start quiz now and test your knowledge of Harry Potter</h3>
        <StartQuizSection handleStartQuiz={handleStartQuiz} />
        <QuizQuestions />
      </>
    );
  }

  return <StartQuizSection handleStartQuiz={handleStartQuiz} />;
}