import quizBG from '../../assets/images/quizBG.png'
import InfoSection from '../../components/common/InfoSection.jsx'

export default function QuizSection() {
  return (
    <>
    <h2 className="h2_style">Quiz</h2>
    <h3 className="h3_style">Take the quiz to find out which house you belong to.</h3>
    <InfoSection
      imgSrc={quizBG}
      title="Which House Do You Belong To?"
      href="/quiz"
      buttonText="Take the Quiz"
    />  
    </>
  )
}