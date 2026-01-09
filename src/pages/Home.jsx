import logo from '../assets/images/logo.png'


export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Home Page</h1>
      <p className="text-lg text-gray-700">Welcome to the Home Page</p>
      <img src={logo} alt="Home Page" className="mt-4" />
    </div>
  )
}