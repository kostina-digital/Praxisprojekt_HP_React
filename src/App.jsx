import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Characters from './pages/Characters/Characters.jsx'
import Books from './pages/Books/Books.jsx'
import Houses from './pages/Houses/Houses.jsx'
import SignIn from './pages/SignInPage/SignInSide'
import SignUp from './pages/SignUp/SignUp'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import './App.css'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { CharactersFilterProvider } from './context/CharactersFilterContext.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import ContactUs from './pages/ContactUs.jsx'
import HousePage from './pages/Houses/HousePage.jsx'

export default function App() {
  // const [theme, setTheme] = useState('light');
  return (
      // <ThemeContext.Provider value={{ theme, setTheme }}>
        <BrowserRouter>
          <CharactersFilterProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/characters/staff" element={<Characters />} />
                <Route path="/characters/students" element={<Characters />} />
                <Route path="/books" element={<Books />} />
                <Route path="/houses" element={<Houses />} />
                <Route path="/houses/:houseName" element={<HousePage />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/terms-of-service' element={<TermsOfService />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </MainLayout>
          </CharactersFilterProvider>
        </BrowserRouter>
      // </ThemeContext.Provider>
  )
}
