export function formatPrice(value) {
  if (!value && value !== 0) return 'Consulte'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPriceShort(value) {
  if (!value && value !== 0) return 'Consulte'
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`
  }
  return formatPrice(value)
}

export function formatArea(value) {
  if (!value) return null
  return `${value.toLocaleString('pt-BR')} m²`
}
