import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Home, DollarSign, Bed, Search, SlidersHorizontal } from 'lucide-react'

const PRECO_OPTIONS = [
  { label: 'Qualquer valor', value: '' },
  { label: 'Até R$ 300.000', value: '300000' },
  { label: 'Até R$ 500.000', value: '500000' },
  { label: 'Até R$ 800.000', value: '800000' },
  { label: 'Até R$ 1.000.000', value: '1000000' },
  { label: 'Até R$ 2.000.000', value: '2000000' },
  { label: 'Acima de R$ 2.000.000', value: 'acima' },
]

const QUARTOS_OPTIONS = [
  { label: 'Qualquer', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
]

const TIPO_OPTIONS = [
  'Todos',
  'Casa',
  'Apartamento',
  'Terreno',
  'Chácara',
  'Comercial',
]

export default function SearchForm({ compact = false, initialValues = {} }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    cidade: initialValues.cidade || '',
    bairro: initialValues.bairro || '',
    precoMax: initialValues.precoMax || '',
    quartos: initialValues.quartos || '',
    tipo: initialValues.tipo || '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (form.cidade) params.set('cidade', form.cidade)
    if (form.bairro) params.set('bairro', form.bairro)
    if (form.precoMax) params.set('precoMax', form.precoMax)
    if (form.quartos) params.set('quartos', form.quartos)
    if (form.tipo && form.tipo !== 'Todos') params.set('tipo', form.tipo)
    navigate(`/busca?${params.toString()}`)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[160px]">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={form.cidade}
            onChange={set('cidade')}
            placeholder="Cidade"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg font-montserrat focus:outline-none focus:border-verde-floresta focus:ring-1 focus:ring-verde-floresta/20"
          />
        </div>
        <div className="relative flex-1 min-w-[120px]">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={form.tipo}
            onChange={set('tipo')}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg font-montserrat focus:outline-none focus:border-verde-floresta appearance-none bg-white"
          >
            {TIPO_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="relative min-w-[140px]">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={form.precoMax}
            onChange={set('precoMax')}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg font-montserrat focus:outline-none focus:border-verde-floresta appearance-none bg-white"
          >
            {PRECO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-verde-floresta text-white px-5 py-2 rounded-lg text-sm font-semibold font-montserrat hover:bg-verde-escuro transition-colors duration-200 whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-verde-floresta" />
        <h2 className="font-cinzel text-lg font-semibold text-grafite">Encontre seu imóvel ideal</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Cidade */}
        <div className="lg:col-span-1">
          <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Cidade
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-verde-floresta" />
            <input
              type="text"
              value={form.cidade}
              onChange={set('cidade')}
              placeholder="Busque por cidade"
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-montserrat text-grafite placeholder-gray-400 focus:outline-none focus:border-verde-floresta focus:ring-2 focus:ring-verde-floresta/15 transition-all"
            />
          </div>
        </div>

        {/* Bairro */}
        <div className="lg:col-span-1">
          <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Bairro
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-verde-floresta" />
            <input
              type="text"
              value={form.bairro}
              onChange={set('bairro')}
              placeholder="Busque por bairro"
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-montserrat text-grafite placeholder-gray-400 focus:outline-none focus:border-verde-floresta focus:ring-2 focus:ring-verde-floresta/15 transition-all"
            />
          </div>
        </div>

        {/* Valor máximo */}
        <div className="lg:col-span-1">
          <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Valor Máximo
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-verde-floresta" />
            <select
              value={form.precoMax}
              onChange={set('precoMax')}
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-montserrat text-grafite appearance-none bg-white focus:outline-none focus:border-verde-floresta focus:ring-2 focus:ring-verde-floresta/15 transition-all"
            >
              {PRECO_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quartos */}
        <div className="lg:col-span-1">
          <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Quartos
          </label>
          <div className="relative">
            <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-verde-floresta" />
            <select
              value={form.quartos}
              onChange={set('quartos')}
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-montserrat text-grafite appearance-none bg-white focus:outline-none focus:border-verde-floresta focus:ring-2 focus:ring-verde-floresta/15 transition-all"
            >
              {QUARTOS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tipo */}
        <div className="lg:col-span-1">
          <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Tipo
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-verde-floresta" />
            <select
              value={form.tipo}
              onChange={set('tipo')}
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-montserrat text-grafite appearance-none bg-white focus:outline-none focus:border-verde-floresta focus:ring-2 focus:ring-verde-floresta/15 transition-all"
            >
              {TIPO_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 bg-verde-floresta text-white py-4 rounded-xl text-base font-bold font-montserrat hover:bg-dourado transition-all duration-300 hover:shadow-lg hover:shadow-verde-floresta/20 group"
      >
        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Buscar Imóveis
      </button>
    </form>
  )
}
