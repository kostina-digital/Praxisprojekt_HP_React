import LogoImg from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function LogoContainer() {
  return (
    <Link to="/">
    <div className='flex items-center justify-center gap-2 md:gap-4'>
      <img src={LogoImg} alt="Logo" className='w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain logo' />
      <p className='text-sm md:text-lg lg:text-2xl font-bold text-[#0B1C2D]'>Hogwarts Paradise</p>
    </div>
    </Link>
  )
}