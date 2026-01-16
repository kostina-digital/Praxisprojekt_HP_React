// Import house images
import GryffindorImg from '../../assets/images/Gryffindor.png'
import HufflepuffImg from '../../assets/images/hufflepuff.png'
import RavenclawImg from '../../assets/images/ravenclaw.png'
import SlytherinImg from '../../assets/images/slytherin.png'
import GryffindorHeroImg from '../../assets/images/GryffindorHero.png'
import HufflepuffHeroImg from '../../assets/images/HufflepuffHero.png'
import RavenclawHeroImg from '../../assets/images/RavenclawHero.png'
import SlytherinHeroImg from '../../assets/images/SlytherinHero.png'

// House data with imported images
const housesData = [
  {
    name: "Gryffindor",
    image: GryffindorImg,
    heroimage: GryffindorHeroImg,
    link: "/houses/gryffindor",
    emoji: "🦁",
    description:'Gryffindor House is known for its courage, bravery, and strong sense of justice. Founded by Godric Gryffindor, this house values daring, determination, and the willingness to stand up for what is right, even when it is difficult or dangerous. Gryffindors are often driven by their hearts and are not afraid to take risks in order to protect others. Students of Gryffindor are typically bold and confident, but they are also loyal and compassionate. They believe deeply in friendship and fairness and often act as leaders among their peers. While their bravery is admired, it can sometimes lead them to be impulsive or reckless, as Gryffindors may jump into action before fully thinking things through. The common room of Gryffindor is located in Gryffindor Tower and is known for its warm, cozy atmosphere. With its red and gold colors, roaring fireplace, and comfortable armchairs, it feels like a place of safety and belonging. Only those who know the correct password can enter, ensuring the privacy of its members. Many of the most famous witches and wizards in history have belonged to Gryffindor, including Harry Potter, Hermione Granger, Ron Weasley, and Albus Dumbledore. These individuals exemplify the house’s values through acts of heroism, intelligence, and moral strength. Gryffindor is the house for those who believe that doing the right thing matters more than personal gain. It suits people who are brave at heart, value loyalty, and are willing to face fear head-on.'
  },
  {
    name: "Hufflepuff",
    image: HufflepuffImg,
    heroimage: HufflepuffHeroImg,
    link: "/houses/hufflepuff",
    emoji: "🦡",
    description: 'Hufflepuff House is known for loyalty, patience, and a strong sense of fairness. Founded by Helga Hufflepuff, the house believes that everyone deserves a chance and values hard work and dedication above natural talent. Hufflepuffs are kind, dependable, and deeply trustworthy. Students in Hufflepuff are often humble and supportive, preferring cooperation over competition. They are willing to put in the effort to achieve their goals and are known for standing by their friends no matter what. While they may not seek attention, Hufflepuffs often form the emotional backbone of their communities. The Hufflepuff common room is located near the kitchens and is filled with warm colors, natural materials, and a welcoming atmosphere. It feels like a safe and peaceful home, reflecting the house’s values of comfort, belonging, and care. Famous Hufflepuffs include Cedric Diggory and Nymphadora Tonks. These characters demonstrate bravery, kindness, and moral strength, proving that Hufflepuff values are just as powerful as those of any other house. Hufflepuff is the ideal house for those who value loyalty, fairness, and kindness. It suits people who believe in teamwork, honesty, and doing their best every day.',
  },
  {
    name: "Ravenclaw",
    image: RavenclawImg,
    heroimage: RavenclawHeroImg,
    link: "/houses/ravenclaw",
    emoji: "🦅",
    description: 'Ravenclaw House values intelligence, creativity, and a love of learning above all else. Founded by Rowena Ravenclaw, the house celebrates curiosity, individuality, and the pursuit of knowledge in all its forms. Ravenclaws are encouraged to think deeply, ask questions, and explore new ideas. Students of Ravenclaw are often analytical and thoughtful, but they are also imaginative and original. They enjoy solving problems, discovering patterns, and expressing themselves through art, logic, or innovation. While Ravenclaws are highly intelligent, they can sometimes be seen as distant or lost in their thoughts. The Ravenclaw common room is located in a tower and offers breathtaking views of the surrounding landscape. Entry requires answering a riddle rather than giving a password, reflecting the house’s belief that wisdom and wit are more important than memorization. The atmosphere is calm, inspiring, and filled with intellectual energy. Notable Ravenclaws include Luna Lovegood and Cho Chang. Luna, in particular, represents the house’s acceptance of uniqueness and open-mindedness, showing that intelligence comes in many forms. Ravenclaw is the perfect house for those who value knowledge, creativity, and independent thinking. It suits people who are curious about the world and enjoy learning simply for the joy of understanding.',
  },
  {
    name: "Slytherin",
    image: SlytherinImg,  
    heroimage: SlytherinHeroImg,
    link: "/houses/slytherin",
    emoji: "🐍",
    description: 'Slytherin House is defined by ambition, determination, and resourcefulness. Founded by Salazar Slytherin, the house values cleverness, leadership, and the ability to achieve one’s goals by any means necessary. Slytherins are often highly focused and know exactly what they want in life. Students sorted into Slytherin are strategic thinkers who plan carefully and act with purpose. They are confident, self-aware, and often natural leaders. While Slytherin has a reputation for producing dark witches and wizards, the house itself does not value evil — it values ambition and success. How those traits are used depends entirely on the individual. The Slytherin common room is located beneath the Black Lake in the dungeons of Hogwarts. Its greenish light, stone walls, and underwater windows create a mysterious and elegant atmosphere. The space reflects the house’s preference for secrecy, tradition, and power. Famous Slytherins include Severus Snape, Draco Malfoy, and many influential witches and wizards in magical history. These characters show the complexity of the house — loyalty, inner conflict, intelligence, and personal growth are all common Slytherin traits. Slytherin is ideal for people who are ambitious, determined, and not afraid to pursue greatness. It suits those who value success, strategy, and self-improvement.',
  }
]

export default housesData
