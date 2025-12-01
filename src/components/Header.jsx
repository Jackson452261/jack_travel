import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollTop > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close menu on route change
    setIsMenuOpen(false)
    document.body.classList.remove('lock')
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.classList.toggle('lock')
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.classList.remove('lock')
  }

  return (
    <header className={`header ${isScrolled ? 'active' : ''}`}>
      <div className="header__container">
        <div className="header__body">
          <div className="header__logo logo">
            <Link className="logo__link" to="/">
              <img 
                src="/favicon.svg" 
                alt="Jack旅遊 Logo" 
                width="32" 
                height="32" 
                loading="eager"
              />
            </Link>
          </div>
          <button 
            className="header__burger" 
            type="button" 
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <nav className={`header__menu menu ${isMenuOpen ? 'active' : ''}`}>
            <button 
              className="menu__close" 
              type="button" 
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <ul className="menu__list">
              <li className="menu__item">
                <Link 
                  className={`menu__link ${location.pathname === '/' ? 'active' : ''}`} 
                  to="/"
                  onClick={closeMenu}
                >
                  首頁
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
