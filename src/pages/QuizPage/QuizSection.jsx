import quizBG from '../../assets/images/quizBG.png'
import { Link } from 'react-router-dom'

export default function QuizSection() {
  return (
    <div className="flex flex-col items-center bg-cover bg-center h-96 justify-between p-8 hover:scale-105 transition-all duration-300" style={{ backgroundImage: `url(${quizBG})` }}>
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
      <Link
        to="/quiz"
        className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white text-blue-50 font-bold text-2xl"
      >
        Start Quiz Now
      </Link>
    </div>
  )
}