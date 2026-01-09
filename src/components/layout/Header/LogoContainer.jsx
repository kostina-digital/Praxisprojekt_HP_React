import LogoImg from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function LogoContainer() {
  return (
    <Link to="/">
    <div className='flex items-center justify-center'>
      <img src={LogoImg} alt="Logo" className=' w-20vw h-auto logo' />
      <p className='text-2xl font-bold'>Hogwarts Paradise</p>
    </div>
    </Link>
  )
}