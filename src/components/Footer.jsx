import { Link } from 'react-router-dom'
import { WhatsAppIcon } from './WhatsAppButton'

const WA_NUMBER = '5511999999999'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contato" className="bg-verde-escuro text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-cinzel text-2xl font-bold text-white">FABIO SENA</span>
              <br />
              <span className="font-cinzel text-xl font-semibold text-dourado">IMÓVEIS</span>
            </div>
            <p className="font-montserrat text-sm text-gray-300 leading-relaxed mb-6">
              Conectando pessoas ao imóvel dos seus sonhos com transparência, dedicação e profundo conhecimento do mercado regional.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/fabioevanessatibaia?igsh=YmU1OWtiZTI2bWxv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dourado transition-colors duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/share/1G5P4YwttY/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dourado transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://youtube.com/@fabiorenatosenacorretor?si=eVh5gNVhJE0CiNWZ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dourado transition-colors duration-200"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold text-dourado uppercase tracking-widest mb-5">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Todos os Imóveis', to: '/busca' },
                { label: 'Casas', to: '/busca?tipo=Casa' },
                { label: 'Apartamentos', to: '/busca?tipo=Apartamento' },
                { label: 'Chácaras', to: '/busca?tipo=Chácara' },
                { label: 'Terrenos', to: '/busca?tipo=Terreno' },
                { label: 'Cadastrar meu imóvel', to: '/cadastrar-imovel' },
                { label: 'Política de Privacidade', to: '/politica-de-privacidade' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-montserrat text-sm text-gray-300 hover:text-dourado transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold text-dourado uppercase tracking-widest mb-5">
              Nossos Serviços
            </h3>
            <ul className="space-y-2.5 font-montserrat text-sm text-gray-300">
              {[
                'Imóveis Residenciais e de Alto Padrão',
                'Casas em Condomínio',
                'Investimentos Imobiliários',
                'Lançamentos',
                'Primeiro Imóvel',
                'Avaliação de Imóveis',
                'Assessoria Completa do Início ao Fim',
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-dourado mt-0.5">›</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-cinzel text-sm font-semibold text-dourado uppercase tracking-widest mb-5">
              Contato
            </h3>
            <div className="space-y-4 font-montserrat text-sm text-gray-300">
              <p>
                <span className="text-dourado font-medium">CRECI:</span> 74.385-F
              </p>
              <p>São Paulo, Atibaia, Bragança Paulista e região</p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Olá Fabio! Gostaria de conhecer imóveis disponíveis.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity mt-2"
                style={{ backgroundColor: '#25D366' }}
              >
                <WhatsAppIcon size={20} />
                <div>
                  <div className="text-xs opacity-80">WhatsApp</div>
                  <div>(11) 99999-9999</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-montserrat text-xs text-gray-400">
            © 2026 Fabio Sena Imóveis. Todos os direitos reservados.
          </p>
          <p className="font-montserrat text-xs text-gray-500">
            Viver Bem. Investir Melhor.
          </p>
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
            <p className="font-montserrat text-xs text-gray-600">
              Desenvolvido por{' '}
              <span className="text-gray-500 font-medium">Pedro Rodrigues</span>
              {' · '}
              <a
                href="mailto:pedrorsantos021@gmail.com"
                className="text-gray-500 hover:text-gray-400 transition-colors"
              >
                pedrorsantos021@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
