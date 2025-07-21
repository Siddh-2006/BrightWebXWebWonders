import { useState, useEffect } from 'react'
import { FaTrophy, FaHome, FaBroadcastTower, FaNewspaper, FaFutbol, FaInfoCircle, FaUser, FaSignInAlt, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navLinks = [
    { id: '', icon: <FaHome />, text: 'Home' },
    { id: 'LiveScores/', icon: <FaBroadcastTower />, text: 'Live' },
    { id: 'news', icon: <FaNewspaper />, text: 'News' },
    { id: 'sports', icon: <FaFutbol />, text: 'Sports' },
    { id: 'about', icon: <FaInfoCircle />, text: 'About' },
    { id: 'Profiles', icon: <FaUser />, text: 'Profile' }
  ]

  return (
    <nav className={`fixed top-0 w-full text-white z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 shadow-lg' : ' bg-gray-900/90'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <FaTrophy className="text-orange-500" />
          <span>SportsHub</span>
        </div>

        <ul className={`hidden md:flex items-center gap-8 ${isMenuOpen ? 'flex' : 'hidden'}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a 
                href={`/${link.id}`} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                onClick={closeMenu}
              >
                {link.icon}
                <span>{link.text}</span>
              </a>
            </li>
          ))}
          <li>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-lg transition-all">
              <FaSignInAlt />
              <span>Login</span>
            </button>
          </li>
        </ul>

        <button 
          className="md:hidden flex cursor-pointer flex-col gap-1.5 z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile menu */}
        <div className={`fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 pt-24 px-6 transition-all duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`/${link.id}`} 
                  className="flex items-center gap-3 text-xl px-6 py-3 rounded-lg hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                  onClick={closeMenu}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </a>
              </li>
            ))}
            <li className="mt-4">
              <button className="flex items-center gap-3 text-xl px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-lg transition-all">
                <FaSignInAlt />
                <span>Login</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar