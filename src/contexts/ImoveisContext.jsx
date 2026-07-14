import { createContext, useContext, useState, useEffect } from 'react'
import { sanityClient, isSanityConfigured, IMOVEIS_QUERY } from '../lib/sanity'
import imoveisLocal from '../data/imoveis.json'

const ImoveisContext = createContext(null)

export function ImoveisProvider({ children }) {
  const [imoveis, setImoveis] = useState(imoveisLocal)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('local')

  useEffect(() => {
    async function carregar() {
      // 1. Tenta a API do Worker (Cloudflare D1)
      try {
        const res = await fetch('/api/imoveis')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setImoveis(data)
            setSource('api')
            return
          }
        }
      } catch {
        // Worker não disponível (dev local sem wrangler)
      }

      // 2. Tenta Sanity
      if (isSanityConfigured) {
        try {
          const data = await sanityClient.fetch(IMOVEIS_QUERY)
          if (data && data.length > 0) {
            const normalized = data.map((i) => ({
              ...i,
              fotos: (i.fotos || []).filter(Boolean),
            }))
            setImoveis(normalized)
            setSource('sanity')
            return
          }
        } catch (err) {
          console.warn('[Sanity] Falha ao carregar dados:', err.message)
        }
      }

      // 3. Fallback: JSON local
      setImoveis(imoveisLocal)
      setSource('local')
    }

    carregar().finally(() => setLoading(false))
  }, [])

  return (
    <ImoveisContext.Provider value={{ imoveis, loading, source }}>
      {children}
    </ImoveisContext.Provider>
  )
}

export function useImoveis() {
  const ctx = useContext(ImoveisContext)
  if (!ctx) throw new Error('useImoveis deve ser usado dentro de ImoveisProvider')
  return ctx
}
