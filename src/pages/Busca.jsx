import { useState, useRef, useEffect } from 'react'
import { MapPin, List, Map, X, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import SearchForm from '../components/SearchForm'
import MapView from '../components/MapView'
import { useSearch } from '../hooks/useSearch'
import { formatPrice, formatArea } from '../utils/formatters'
import { Link } from 'react-router-dom'
import { Bed, Maximize2, Bath } from 'lucide-react'

const TYPE_COLORS = {
  Casa: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Apartamento: 'bg-blue-100 text-blue-700 border-blue-200',
  Terreno: 'bg-amber-100 text-amber-700 border-amber-200',
  Chácara: 'bg-teal-100 text-teal-700 border-teal-200',
  Comercial: 'bg-purple-100 text-purple-700 border-purple-200',
}

function MiniCard({ imovel, highlighted, onClick }) {
  const typeColor = TYPE_COLORS[imovel.tipo] || 'bg-gray-100 text-gray-700 border-gray-200'
  return (
    <div
      className={`flex gap-3 p-3 bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        highlighted
          ? 'border-dourado shadow-md bg-dourado/5'
          : 'border-transparent hover:border-verde-floresta/20'
      }`}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={imovel.fotos[0]}
          alt={imovel.titulo}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${imovel.id}/200/200` }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`text-[10px] font-semibold font-montserrat px-1.5 py-0.5 rounded border ${typeColor}`}>
            {imovel.tipo}
          </span>
        </div>
        <p className="font-bold font-cinzel text-dourado text-sm leading-tight">
          {formatPrice(imovel.preco)}
        </p>
        <p className="font-montserrat text-xs font-semibold text-grafite leading-tight mt-0.5 line-clamp-1">
          {imovel.titulo}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
          <p className="font-montserrat text-[10px] text-gray-400 truncate">
            {imovel.bairro}, {imovel.cidade}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-500 font-montserrat">
          {imovel.quartos > 0 && (
            <span className="flex items-center gap-0.5">
              <Bed className="w-2.5 h-2.5" /> {imovel.quartos}q
            </span>
          )}
          {imovel.banheiros > 0 && (
            <span className="flex items-center gap-0.5">
              <Bath className="w-2.5 h-2.5" /> {imovel.banheiros}b
            </span>
          )}
          {(imovel.areaUtil > 0 || imovel.areaTotal > 0) && (
            <span className="flex items-center gap-0.5">
              <Maximize2 className="w-2.5 h-2.5" /> {formatArea(imovel.areaUtil || imovel.areaTotal)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Busca() {
  const { results, filters } = useSearch()
  const [highlightedId, setHighlightedId] = useState(null)
  const [selectedImovel, setSelectedImovel] = useState(null)
  const [mobileView, setMobileView] = useState('lista') // 'lista' | 'mapa'
  const [showSearch, setShowSearch] = useState(false)
  const listRef = useRef(null)
  const cardRefs = useRef({})

  const locationLabel =
    filters.cidade || filters.tipo
      ? [filters.cidade, filters.tipo !== 'Todos' ? filters.tipo : ''].filter(Boolean).join(' · ')
      : 'todos os imóveis'

  const handleMarkerClick = (imovel) => {
    setSelectedImovel(imovel)
    setHighlightedId(imovel.id)
    setMobileView('lista')

    setTimeout(() => {
      const card = cardRefs.current[imovel.id]
      if (card && listRef.current) {
        listRef.current.scrollTo({
          top: card.offsetTop - 80,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  const mapCenter =
    results.length > 0
      ? [results[0].coordenadas?.lat ?? -22.9522, results[0].coordenadas?.lng ?? -46.5416]
      : [-22.9522, -46.5416]

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      {/* ─── Compact Search Bar ─────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        {showSearch ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="font-cinzel text-sm font-semibold text-verde-floresta">Refinar busca</span>
              <button
                onClick={() => setShowSearch(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SearchForm compact initialValues={filters} />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <p className="font-montserrat text-sm text-gray-600 truncate">
                <span className="font-semibold text-grafite">{results.length}</span>{' '}
                {results.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                {locationLabel && (
                  <> em <span className="font-semibold text-verde-floresta">{locationLabel}</span></>
                )}
              </p>
              {filters.tipo && filters.tipo !== 'Todos' && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs bg-verde-floresta text-white px-3 py-1 rounded-full font-montserrat">
                  {filters.tipo}
                </span>
              )}
            </div>
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 text-sm font-semibold font-montserrat text-verde-floresta hover:text-dourado transition-colors flex-shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
          </div>
        )}
      </div>

      {/* ─── Mobile Toggle ───────────────────────────────────── */}
      <div className="md:hidden flex bg-white border-b border-gray-200 flex-shrink-0">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold font-montserrat border-b-2 transition-colors ${
            mobileView === 'lista'
              ? 'border-verde-floresta text-verde-floresta'
              : 'border-transparent text-gray-500'
          }`}
          onClick={() => setMobileView('lista')}
        >
          <List className="w-4 h-4" /> Lista
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold font-montserrat border-b-2 transition-colors ${
            mobileView === 'mapa'
              ? 'border-verde-floresta text-verde-floresta'
              : 'border-transparent text-gray-500'
          }`}
          onClick={() => setMobileView('mapa')}
        >
          <Map className="w-4 h-4" /> Mapa
        </button>
      </div>

      {/* ─── Split Layout ────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Lista */}
        <div
          ref={listRef}
          className={`overflow-y-auto bg-gray-50 ${
            mobileView === 'lista' ? 'flex' : 'hidden'
          } md:flex flex-col w-full md:w-2/5 lg:w-[40%]`}
        >
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-cinzel text-lg font-semibold text-grafite mb-2">
                Nenhum imóvel encontrado
              </h3>
              <p className="font-montserrat text-sm text-gray-500 mb-6">
                Tente ajustar os filtros para ver mais resultados.
              </p>
              <button
                onClick={() => setShowSearch(true)}
                className="bg-verde-floresta text-white px-6 py-2.5 rounded-lg text-sm font-semibold font-montserrat hover:bg-verde-escuro transition-colors"
              >
                Ajustar filtros
              </button>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {results.map((imovel) => (
                <div
                  key={imovel.id}
                  ref={(el) => { cardRefs.current[imovel.id] = el }}
                >
                  <Link to={`/imovel/${imovel.id}`} className="block">
                    <MiniCard
                      imovel={imovel}
                      highlighted={highlightedId === imovel.id}
                      onClick={() => {
                        setHighlightedId(imovel.id)
                        setSelectedImovel(imovel)
                        setMobileView('mapa')
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mapa */}
        <div
          className={`${
            mobileView === 'mapa' ? 'flex' : 'hidden'
          } md:flex flex-col w-full md:w-3/5 lg:w-[60%] relative`}
        >
          {/* Map type chip */}
          {filters.tipo && filters.tipo !== 'Todos' && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 bg-white text-grafite text-xs font-semibold font-montserrat px-3 py-1.5 rounded-full shadow-md border border-gray-200">
                {filters.tipo}
              </span>
            </div>
          )}

          <MapView
            imoveis={results}
            center={mapCenter}
            zoom={results.length === 1 ? 14 : 9}
            highlightedId={highlightedId}
            onMarkerClick={handleMarkerClick}
            selectedImovel={selectedImovel}
          />
        </div>
      </div>
    </div>
  )
}
