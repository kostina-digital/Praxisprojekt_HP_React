import notFoundImg from '../assets/images/404.jpg'

export default function NotFoundPage() {
  return (
    <div>
      <img src={notFoundImg} alt="Not Found" />
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}