import { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { Link } from 'react-router-dom'
import { formatPrice, formatArea } from '../utils/formatters'
import { Bed, Maximize2 } from 'lucide-react'

function createClusterIcon(cluster) {
  const count = cluster.getChildCount()
  return L.divIcon({
    html: `<div class="cluster-icon">${count}</div>`,
    className: '',
    iconSize: L.point(44, 44),
  })
}

function createPriceIcon(imovel, highlighted) {
  const short = formatPrice(imovel.preco)
    .replace('R$ ', 'R$ ')
    .replace(/\.000\.000/, 'M')
    .replace(/\.000$/, 'k')

  const cls = highlighted ? 'price-marker highlighted' : 'price-marker'
  return L.divIcon({
    html: `<div class="${cls}">${short}</div>`,
    className: 'price-marker-wrapper',
    iconSize: [null, null],
    iconAnchor: [40, 32],
    popupAnchor: [0, -35],
  })
}

function FlyToSelected({ imovel }) {
  const map = useMap()
  useEffect(() => {
    if (imovel && imovel.coordenadas) {
      map.flyTo([imovel.coordenadas.lat, imovel.coordenadas.lng], 14, { duration: 0.8 })
    }
  }, [imovel, map])
  return null
}

function PopupCard({ imovel }) {
  return (
    <div className="font-montserrat w-52">
      <img
        src={imovel.fotos[0]}
        alt={imovel.titulo}
        className="w-full h-28 object-cover"
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${imovel.id}/400/300` }}
      />
      <div className="p-3">
        <p className="text-xs font-bold text-dourado mb-0.5">{formatPrice(imovel.preco)}</p>
        <p className="text-xs font-semibold text-grafite leading-tight line-clamp-2 mb-1.5">{imovel.titulo}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          {imovel.quartos > 0 && (
            <span className="flex items-center gap-0.5">
              <Bed className="w-3 h-3" /> {imovel.quartos}
            </span>
          )}
          {(imovel.areaUtil > 0 || imovel.areaTotal > 0) && (
            <span className="flex items-center gap-0.5">
              <Maximize2 className="w-3 h-3" /> {formatArea(imovel.areaUtil || imovel.areaTotal)}
            </span>
          )}
        </div>
        <Link
          to={`/imovel/${imovel.id}`}
          className="block text-center bg-verde-floresta text-white text-xs py-1.5 rounded-lg font-semibold hover:bg-verde-escuro transition-colors"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}

export default function MapView({
  imoveis = [],
  center = [-22.9522, -46.5416],
  zoom = 8,
  highlightedId = null,
  onMarkerClick,
  selectedImovel = null,
}) {
  const markerRefs = useRef({})

  const handleMarkerClick = (imovel) => {
    if (onMarkerClick) onMarkerClick(imovel)
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedImovel && <FlyToSelected imovel={selectedImovel} />}

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterIcon}
        maxClusterRadius={60}
        showCoverageOnHover={false}
        spiderfyOnMaxZoom
      >
        {imoveis.map((imovel) => {
          if (!imovel.coordenadas) return null
          const highlighted = highlightedId === imovel.id
          return (
            <Marker
              key={imovel.id}
              position={[imovel.coordenadas.lat, imovel.coordenadas.lng]}
              icon={createPriceIcon(imovel, highlighted)}
              ref={(ref) => { markerRefs.current[imovel.id] = ref }}
              eventHandlers={{
                click: () => handleMarkerClick(imovel),
              }}
            >
              <Popup>
                <PopupCard imovel={imovel} />
              </Popup>
            </Marker>
          )
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
