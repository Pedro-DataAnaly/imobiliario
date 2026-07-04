import { useParams, Link, Navigate } from 'react-router-dom'
import { MapPin, Bed, Bath, Car, Maximize2, ArrowLeft, Share2, Home } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageCarousel from '../components/ImageCarousel'
import ImovelCard from '../components/ImovelCard'
import { WhatsAppIcon } from '../components/WhatsAppButton'
import { formatPrice, formatArea } from '../utils/formatters'
import { useImoveis } from '../contexts/ImoveisContext'

const WA_NUMBER = '5511920105933'

const TYPE_COLORS = {
  Casa: 'bg-emerald-100 text-emerald-700',
  Apartamento: 'bg-blue-100 text-blue-700',
  Terreno: 'bg-amber-100 text-amber-700',
  Chácara: 'bg-teal-100 text-teal-700',
  Comercial: 'bg-purple-100 text-purple-700',
}

function StatBadge({ icon: Icon, value, label }) {
  if (!value) return null
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
      <Icon className="w-5 h-5 text-verde-floresta mb-1.5" />
      <span className="font-bold font-montserrat text-grafite text-lg leading-none">{value}</span>
      <span className="font-montserrat text-xs text-gray-500 mt-1">{label}</span>
    </div>
  )
}

export default function DetalheImovel() {
  const { id } = useParams()
  const { imoveis } = useImoveis()
  const imovel = imoveis.find((i) => String(i.id) === String(id))

  if (!imovel) return <Navigate to="/busca" replace />

  const waText = encodeURIComponent(
    `Olá Fabio! Tenho interesse no imóvel:\n*${imovel.titulo}*\n${imovel.cidade} - ${imovel.estado}\n\nPoderia me dar mais informações?`
  )
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`

  const typeColor = TYPE_COLORS[imovel.tipo] || 'bg-gray-100 text-gray-700'

  const similar = imoveis
    .filter((i) => i.id !== imovel.id && (i.tipo === imovel.tipo || i.cidade === imovel.cidade))
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: imovel.titulo, url: window.location.href })
    } else {
      navigator.clipboard?.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-montserrat text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-verde-floresta transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <Link to="/busca" className="hover:text-verde-floresta transition-colors">Imóveis</Link>
          <span>/</span>
          <span className="text-grafite font-medium truncate max-w-xs">{imovel.titulo}</span>
        </nav>

        {/* Back + share */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/busca"
            className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-gray-500 hover:text-verde-floresta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para busca
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-gray-500 hover:text-verde-floresta transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <ImageCarousel images={imovel.fotos} title={imovel.titulo} />

            {/* Title & Price */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold font-montserrat px-2.5 py-1 rounded-full ${typeColor}`}>
                      {imovel.tipo}
                    </span>
                    {imovel.destaque && (
                      <span className="text-xs font-semibold font-montserrat px-2.5 py-1 rounded-full bg-dourado text-white">
                        Destaque
                      </span>
                    )}
                  </div>
                  <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-grafite leading-tight mb-2">
                    {imovel.titulo}
                  </h1>
                  <div className="flex items-center gap-1.5 text-gray-500 font-montserrat text-sm">
                    <MapPin className="w-4 h-4 text-verde-floresta" />
                    {imovel.bairro}, {imovel.cidade} — {imovel.estado}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-cinzel text-3xl sm:text-4xl font-bold text-dourado">
                    {formatPrice(imovel.preco)}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {imovel.quartos > 0 && (
                <StatBadge
                  icon={Bed}
                  value={imovel.quartos}
                  label={imovel.quartos === 1 ? 'Quarto' : 'Quartos'}
                />
              )}
              {imovel.banheiros > 0 && (
                <StatBadge
                  icon={Bath}
                  value={imovel.banheiros}
                  label={imovel.banheiros === 1 ? 'Banheiro' : 'Banheiros'}
                />
              )}
              {imovel.vagas > 0 && (
                <StatBadge
                  icon={Car}
                  value={imovel.vagas}
                  label={imovel.vagas === 1 ? 'Vaga' : 'Vagas'}
                />
              )}
              {imovel.areaUtil > 0 && (
                <StatBadge
                  icon={Maximize2}
                  value={formatArea(imovel.areaUtil)}
                  label="Área útil"
                />
              )}
              {imovel.areaTotal > 0 && imovel.areaTotal !== imovel.areaUtil && (
                <StatBadge
                  icon={Maximize2}
                  value={formatArea(imovel.areaTotal)}
                  label="Área total"
                />
              )}
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="font-cinzel text-lg font-semibold text-verde-floresta mb-4">
                Sobre o imóvel
              </h2>
              <p className="font-montserrat text-gray-600 leading-relaxed">{imovel.descricao}</p>
            </div>

            {/* Map */}
            {imovel.coordenadas && (
              <div>
                <h2 className="font-cinzel text-lg font-semibold text-verde-floresta mb-4">
                  Localização
                </h2>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 320 }}>
                  <MapContainer
                    center={[imovel.coordenadas.lat, imovel.coordenadas.lng]}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[imovel.coordenadas.lat, imovel.coordenadas.lng]}>
                      <Popup>
                        <div className="font-montserrat text-sm text-center py-1 px-2">
                          <strong>{imovel.titulo}</strong>
                          <br />
                          <span className="text-gray-500">{imovel.bairro}, {imovel.cidade}</span>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* WhatsApp CTA */}
              <div className="bg-verde-floresta rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <WhatsAppIcon size={24} />
                  </div>
                  <div>
                    <p className="font-cinzel font-bold text-base">Fabio Sena</p>
                    <p className="text-white/70 text-xs font-montserrat">CRECI 74.385-F</p>
                  </div>
                </div>

                <p className="font-montserrat text-sm text-white/80 mb-5 leading-relaxed">
                  Interessado neste imóvel? Fale diretamente com Fabio e tire todas as suas dúvidas.
                </p>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-bold font-montserrat text-base hover:opacity-90 transition-all duration-200 hover:scale-[1.02] shadow-lg"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <WhatsAppIcon size={22} />
                  Falar com Fabio sobre este imóvel
                </a>

                <p className="text-center font-montserrat text-xs text-white/50 mt-3">
                  Resposta rápida · Sem compromisso
                </p>
              </div>

              {/* Ficha técnica */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-cinzel text-sm font-semibold text-verde-floresta mb-4 uppercase tracking-wide">
                  Ficha Técnica
                </h3>
                <dl className="space-y-3">
                  {[
                    { label: 'Tipo', value: imovel.tipo },
                    { label: 'Cidade', value: `${imovel.cidade} - ${imovel.estado}` },
                    { label: 'Bairro', value: imovel.bairro },
                    imovel.quartos > 0 && { label: 'Quartos', value: imovel.quartos },
                    imovel.banheiros > 0 && { label: 'Banheiros', value: imovel.banheiros },
                    imovel.vagas > 0 && { label: 'Vagas', value: imovel.vagas },
                    imovel.areaUtil > 0 && { label: 'Área útil', value: formatArea(imovel.areaUtil) },
                    imovel.areaTotal > 0 && { label: 'Área total', value: formatArea(imovel.areaTotal) },
                    { label: 'Preço', value: formatPrice(imovel.preco) },
                  ].filter(Boolean).map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <dt className="font-montserrat text-xs text-gray-500">{label}</dt>
                      <dd className="font-montserrat text-xs font-semibold text-grafite">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-verde-floresta mb-2">
                  Imóveis Similares
                </h2>
                <p className="font-montserrat text-sm text-gray-500">
                  Outras opções que podem te interessar
                </p>
              </div>
              <Link
                to="/busca"
                className="text-sm font-semibold font-montserrat text-verde-floresta hover:text-dourado transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((i) => (
                <ImovelCard key={i.id} imovel={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
