import quizBG from '../../assets/images/quizBG.png'
import InfoSection from '../../components/common/InfoSection.jsx'

export default function QuizSection() {
  return (
    <InfoSection
      imgSrc={quizBG}
      title="Which House Do You Belong To?"
      href="/quiz"
      buttonText="Take the Quiz"
    />
  )
}