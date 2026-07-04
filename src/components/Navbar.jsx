import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppButton'

const WA_NUMBER = '5511920105933'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navLinkClass = ({ isActive }) =>
    `font-montserrat text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-verde-floresta' : 'text-grafite hover:text-verde-floresta'
    }`

  return (
    <nav
      className={`sticky top-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1.5 group">
            <span className="font-cinzel text-xl font-bold text-verde-floresta group-hover:text-verde-escuro transition-colors">
              FABIO SENA
            </span>
            <span className="font-cinzel text-lg font-semibold text-dourado">IMÓVEIS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/busca" className={navLinkClass}>
              Imóveis
            </NavLink>
            <a
              href="/#sobre"
              className="font-montserrat text-sm font-medium text-grafite hover:text-verde-floresta transition-colors duration-200"
            >
              Sobre
            </a>
            <a
              href="/#contato"
              className="font-montserrat text-sm font-medium text-grafite hover:text-verde-floresta transition-colors duration-200"
            >
              Contato
            </a>
          </div>

          {/* WhatsApp button */}
          <div className="hidden md:flex">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Olá Fabio! Gostaria de conhecer imóveis disponíveis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold font-montserrat transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon size={16} />
              <span>Falar com Fabio</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-grafite hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-5 space-y-4 shadow-lg">
          <NavLink to="/" className="block font-montserrat text-sm font-medium text-grafite hover:text-verde-floresta" end>
            Home
          </NavLink>
          <NavLink to="/busca" className="block font-montserrat text-sm font-medium text-grafite hover:text-verde-floresta">
            Imóveis
          </NavLink>
          <a href="/#sobre" className="block font-montserrat text-sm font-medium text-grafite hover:text-verde-floresta">
            Sobre
          </a>
          <a href="/#contato" className="block font-montserrat text-sm font-medium text-grafite hover:text-verde-floresta">
            Contato
          </a>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Olá Fabio! Gostaria de conhecer imóveis disponíveis.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold font-montserrat"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon size={16} />
            <span>(11) 92010-5933</span>
          </a>
        </div>
      )}
    </nav>
  )
}
