import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useImoveis } from '../contexts/ImoveisContext'

const PRECO_MAP = {
  '300000': 300000,
  '500000': 500000,
  '800000': 800000,
  '1000000': 1000000,
  '2000000': 2000000,
  'acima': Infinity,
}

export function useSearch() {
  const [searchParams] = useSearchParams()
  const { imoveis, loading } = useImoveis()

  const filters = {
    cidade: searchParams.get('cidade') || '',
    bairro: searchParams.get('bairro') || '',
    precoMax: searchParams.get('precoMax') || '',
    quartos: searchParams.get('quartos') || '',
    tipo: searchParams.get('tipo') || '',
  }

  const results = useMemo(() => {
    return imoveis.filter((imovel) => {
      if (filters.cidade) {
        const q = filters.cidade.toLowerCase().trim()
        if (
          !imovel.cidade.toLowerCase().includes(q) &&
          !(imovel.bairro || '').toLowerCase().includes(q) &&
          !(imovel.estado || '').toLowerCase().includes(q)
        ) return false
      }

      if (filters.bairro) {
        const q = filters.bairro.toLowerCase().trim()
        if (!(imovel.bairro || '').toLowerCase().includes(q)) return false
      }

      if (filters.precoMax && filters.precoMax !== 'acima') {
        const max = PRECO_MAP[filters.precoMax]
        if (max && imovel.preco > max) return false
      }

      if (filters.quartos) {
        const min = parseInt(filters.quartos)
        if ((imovel.quartos || 0) < min) return false
      }

      if (filters.tipo && filters.tipo !== 'Todos') {
        if (imovel.tipo !== filters.tipo) return false
      }

      return true
    })
  }, [imoveis, filters.cidade, filters.bairro, filters.precoMax, filters.quartos, filters.tipo])

  return { results, filters, loading }
}
