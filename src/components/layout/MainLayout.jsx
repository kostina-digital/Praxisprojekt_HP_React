import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
// import { useContext } from 'react'
// import ThemeContext from '../contexts/ThemeContext.js'
// import { getThemeStyles } from '../contexts/themeConfig.js'

export default function MainLayout({ children }) {
  // const { theme } = useContext(ThemeContext)
  // const themeStyles = getThemeStyles(theme)
  
  return (
    <>
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  </>
  );
}
