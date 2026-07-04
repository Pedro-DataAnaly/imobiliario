import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const isSanityConfigured = !!projectId && projectId !== 'seu_project_id_aqui'

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null

// GROQ query — transforma os dados do Sanity no mesmo formato do JSON local
export const IMOVEIS_QUERY = `
  *[_type == "imovel"] | order(_createdAt desc) {
    "id": _id,
    titulo,
    tipo,
    preco,
    cidade,
    bairro,
    "estado": coalesce(estado, "SP"),
    "quartos": coalesce(quartos, 0),
    "banheiros": coalesce(banheiros, 0),
    "vagas": coalesce(vagas, 0),
    "areaUtil": coalesce(areaUtil, 0),
    "areaTotal": coalesce(areaTotal, 0),
    descricao,
    "fotos": fotos[].asset->url,
    "destaque": coalesce(destaque, false),
    coordenadas
  }
`
