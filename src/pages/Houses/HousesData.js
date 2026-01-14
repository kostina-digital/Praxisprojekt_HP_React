// Импортируем изображения домов
import GryffindorImg from '../../assets/images/Gryffindor.png'
import HufflepuffImg from '../../assets/images/hufflepuff.png'
import RavenclawImg from '../../assets/images/ravenclaw.png'
import SlytherinImg from '../../assets/images/slytherin.png'

// Данные о домах с импортированными изображениями
const housesData = [
  {
    name: "Gryffindor",
    image: GryffindorImg,
    link: "/houses/gryffindor",
    description: "Gryffindor is the house of the brave, the bold, and the ambitious. Gryffindor students are known for their courage, determination, and loyalty."
  },
  {
    name: "Hufflepuff",
    image: HufflepuffImg,
    link: "/houses/hufflepuff",
    description: "Hufflepuff is the house of the hardworking, the loyal, and the patient. Hufflepuff students are known for their patience, loyalty, and hard work."
  },
  {
    name: "Ravenclaw",
    image: RavenclawImg,
    link: "/houses/ravenclaw",
    description: "Ravenclaw is the house of the smart, the curious, and the wise. Ravenclaw students are known for their intelligence, curiosity, and wisdom."
  },
  {
    name: "Slytherin",
    image: SlytherinImg,
    link: "/houses/slytherin",
    description: "Slytherin is the house of the ambitious, the cunning, and the resourceful. Slytherin students are known for their ambition, cunning, and resourcefulness."
  }
]

export default housesData
