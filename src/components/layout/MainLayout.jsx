import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'

export default function MainLayout({ children }) {
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
