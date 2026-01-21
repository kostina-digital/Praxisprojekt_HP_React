import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CTAButton from './CTAButton.jsx'
import quizData from '../../pages/QuizPage/quizData.json'
import GryffindorImg from '../../assets/images/GryffindorHero.png'
import HufflepuffImg from '../../assets/images/HufflepuffHero.png'
import RavenclawImg from '../../assets/images/RavenclawHero.png'
import SlytherinImg from '../../assets/images/SlytherinHero.png'

const houseImages = {
  courage: GryffindorImg,
  wisdom: RavenclawImg,
  loyalty: HufflepuffImg,
  ambition: SlytherinImg
}

/**
 * Компонент для отображения результата квиза
 * @param {string} houseName - Название дома (courage, wisdom, loyalty, ambition). Если передан, компонент сам получит данные из quizData
 * @param {object} result - Полный объект результата (опционально, если houseName не передан)
 * @param {function} handleRestart - Функция для перезапуска квиза (опционально)
 * @param {boolean} showRestartButton - Показывать ли кнопку "Take Quiz Again" (по умолчанию true)
 */
export default function QuizResultsSection({ houseName, result, handleRestart, showRestartButton = true }) {
  // Если передан houseName, получаем данные из quizData
  let displayResult = result
  
  if (houseName && !result) {
    const houseData = quizData.quiz.results[houseName]
    if (houseData) {
      displayResult = {
        ...houseData,
        houseImage: houseImages[houseName]
      }
    }
  }
  
  // Если передан result с houseImage, используем его
  if (result && result.houseImage) {
    displayResult = result
  }

  if (!displayResult) {
    return null
  }

  return (
    <Box className="flex flex-col items-center gap-4 p-8 max-w-2xl mx-auto">
      <Card sx={{ width: '100%', p: 4 }}>
        <CardContent>
          <img 
            src={displayResult.houseImage} 
            alt={displayResult.title} 
            style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} 
          />
          <Typography variant="h3" component="h2" gutterBottom align="center">
            {displayResult.title}
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontSize: '1.2rem', mt: 2 }}>
            {displayResult.description}
          </Typography>
          {showRestartButton && handleRestart && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CTAButton
                text="Take Quiz Again"
                onClick={handleRestart}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}