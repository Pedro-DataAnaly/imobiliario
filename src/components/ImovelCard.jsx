import { Link } from 'react-router-dom'
import { Bed, Bath, Car, Maximize2, MapPin } from 'lucide-react'
import { formatPrice, formatArea } from '../utils/formatters'

const TYPE_COLORS = {
  Casa: 'bg-emerald-100 text-emerald-700',
  Apartamento: 'bg-blue-100 text-blue-700',
  Terreno: 'bg-amber-100 text-amber-700',
  Chácara: 'bg-teal-100 text-teal-700',
  Comercial: 'bg-purple-100 text-purple-700',
}

export default function ImovelCard({ imovel, highlighted = false, onClick }) {
  const typeColor = TYPE_COLORS[imovel.tipo] || 'bg-gray-100 text-gray-700'

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden card-hover cursor-pointer border-2 transition-all duration-300 ${
        highlighted ? 'border-dourado shadow-xl' : 'border-transparent shadow-md hover:border-verde-floresta/20'
      }`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={imovel.fotos[0]}
          alt={imovel.titulo}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${imovel.id}/800/600`
          }}
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold font-montserrat px-2.5 py-1 rounded-full ${typeColor}`}>
          {imovel.tipo}
        </span>
        {imovel.destaque && (
          <span className="absolute top-3 right-3 text-xs font-semibold font-montserrat px-2.5 py-1 rounded-full bg-dourado text-white">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-2xl font-bold font-cinzel text-dourado mb-1">
          {formatPrice(imovel.preco)}
        </p>

        <h3 className="font-semibold font-montserrat text-grafite text-sm leading-tight mb-2 line-clamp-2">
          {imovel.titulo}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-xs font-montserrat mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{imovel.bairro}, {imovel.cidade} - {imovel.estado}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 font-montserrat mb-4 flex-wrap">
          {imovel.quartos > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {imovel.quartos} {imovel.quartos === 1 ? 'Quarto' : 'Quartos'}
            </span>
          )}
          {imovel.banheiros > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {imovel.banheiros} {imovel.banheiros === 1 ? 'Banheiro' : 'Banheiros'}
            </span>
          )}
          {imovel.vagas > 0 && (
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              {imovel.vagas} {imovel.vagas === 1 ? 'Vaga' : 'Vagas'}
            </span>
          )}
          {(imovel.areaUtil > 0 || imovel.areaTotal > 0) && (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" />
              {formatArea(imovel.areaUtil || imovel.areaTotal)}
            </span>
          )}
        </div>

        <Link
          to={`/imovel/${imovel.id}`}
          className="block w-full text-center bg-verde-floresta text-white py-2.5 rounded-lg text-sm font-semibold font-montserrat hover:bg-verde-escuro transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}
