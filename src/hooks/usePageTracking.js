import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const CONSENT_KEY = 'fs_cookie_consent'

function hasConsent() {
  try { return localStorage.getItem(CONSENT_KEY) === 'accepted' } catch { return false }
}

const PAGE_LABELS = {
  '/': 'Home',
  '/busca': 'Busca de Imóveis',
}

function getPageLabel(pathname) {
  if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname]
  if (pathname.startsWith('/imovel/')) return `Imóvel ${pathname.split('/')[2]}`
  return pathname
}

function recordLocalView(pathname) {
  try {
    const key = 'fs_analytics'
    const data = JSON.parse(localStorage.getItem(key) || '{"pages":{},"daily":{}}')
    const today = new Date().toISOString().split('T')[0]
    const label = getPageLabel(pathname)

    // Contagem por página
    data.pages[label] = (data.pages[label] || 0) + 1

    // Contagem diária
    if (!data.daily[today]) data.daily[today] = 0
    data.daily[today]++

    // Total geral
    data.total = (data.total || 0) + 1

    // Mantém só os últimos 30 dias
    const days = Object.keys(data.daily).sort()
    if (days.length > 30) {
      delete data.daily[days[0]]
    }

    localStorage.setItem(key, JSON.stringify(data))
  } catch (_) {}
}

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    // Google Analytics — só envia se o usuário consentiu (LGPD)
    if (GA_ID && hasConsent()) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname })
    }

    // Tracking local (fallback)
    recordLocalView(location.pathname)
  }, [location.pathname])
}

export function getLocalAnalytics() {
  try {
    return JSON.parse(localStorage.getItem('fs_analytics') || '{"pages":{},"daily":{},"total":0}')
  } catch (_) {
    return { pages: {}, daily: {}, total: 0 }
  }
}
