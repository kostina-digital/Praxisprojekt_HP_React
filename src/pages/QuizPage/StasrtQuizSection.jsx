import quizBG from '../../assets/images/quizBG.png'
import Box from '@mui/material/Box'
import CTAButton from '../../components/common/CTAButton.jsx'

export default function StartQuizSection({ handleStartQuiz }) {   

    return (
        <>
        <h1 className="h1_style my-8">Quiz</h1>
        <div className="flex flex-col items-center bg-cover bg-center justify-between h-96 p-8" style={{ backgroundImage: `url(${quizBG})` }}>
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
          {/* The button does not work because the href will cause a navigation before onClick is fired.
              To fix this, we can remove href, and trigger quiz start only via the onClick handler. */}
          <CTAButton text="Start Quiz" onClick={handleStartQuiz} />
        </div>
        </> )
}   