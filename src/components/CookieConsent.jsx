import { useState, useEffect } from 'react'
import ReactGA from 'react-ga4'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const CONSENT_KEY = 'fs_cookie_consent' // 'accepted' | 'declined'

export function initGA() {
  if (GA_ID && typeof window !== 'undefined') {
    ReactGA.initialize(GA_ID)
  }
}

export function useConsent() {
  return typeof window !== 'undefined'
    ? localStorage.getItem(CONSENT_KEY)
    : null
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    } else if (stored === 'accepted') {
      initGA()
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
    initGA()
  }

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-grafite border-t-2 border-dourado/40 shadow-2xl"
      role="dialog"
      aria-label="Consentimento de cookies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-montserrat text-sm text-white/80 flex-1">
          Utilizamos cookies do Google Analytics para medir o tráfego do site de forma anônima.
          Nenhum dado pessoal é enviado ao Google.{' '}
          <a
            href="/politica-de-privacidade"
            className="text-dourado underline hover:text-dourado/80 transition-colors"
          >
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 rounded-lg border border-white/20 text-white/70 font-montserrat text-sm hover:bg-white/10 transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-lg bg-dourado text-white font-montserrat text-sm font-semibold hover:bg-dourado-escuro transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
