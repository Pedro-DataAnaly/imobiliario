import { createContext, useContext, useState, useEffect } from 'react'
import { sanityClient, isSanityConfigured, IMOVEIS_QUERY } from '../lib/sanity'
import imoveisLocal from '../data/imoveis.json'

const ImoveisContext = createContext(null)

export function ImoveisProvider({ children }) {
  const [imoveis, setImoveis] = useState(imoveisLocal)
  const [loading, setLoading] = useState(isSanityConfigured)
  const [source, setSource] = useState('local')

  useEffect(() => {
    if (!isSanityConfigured) return

    setLoading(true)
    sanityClient
      .fetch(IMOVEIS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          // Filtra fotos nulas (imóvel sem imagem cadastrada no Sanity)
          const normalized = data.map((i) => ({
            ...i,
            fotos: (i.fotos || []).filter(Boolean),
          }))
          setImoveis(normalized)
          setSource('sanity')
        }
      })
      .catch((err) => {
        console.warn('[Sanity] Falha ao carregar dados, usando JSON local:', err.message)
      })
      .finally(() => setLoading(false))
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
