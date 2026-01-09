import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Characters from './pages/Characters/Characters.jsx'
import Books from './pages/Books/Books.jsx'
import Houses from './pages/Houses/Houses.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import './App.css'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  // const [theme, setTheme] = useState('light');
  return (
      // <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/books" element={<Books />} />
              <Route path="/houses" element={<Houses />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      // </ThemeContext.Provider>
  )
}
