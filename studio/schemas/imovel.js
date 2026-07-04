import { defineField, defineType } from 'sanity'

export const imovelSchema = defineType({
  name: 'imovel',
  title: 'Imóvel',
  type: 'document',

  preview: {
    select: {
      title: 'titulo',
      subtitle: 'cidade',
      media: 'fotos.0',
      tipo: 'tipo',
      preco: 'preco',
    },
    prepare({ title, cidade, media, tipo, preco }) {
      const priceFormatted = preco
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(preco)
        : ''
      return {
        title,
        subtitle: `${tipo} · ${cidade} · ${priceFormatted}`,
        media,
      }
    },
  },

  fields: [
    defineField({
      name: 'titulo',
      title: 'Título do imóvel',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).error('Título deve ter pelo menos 10 caracteres'),
    }),

    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: '🏠 Casa', value: 'Casa' },
          { title: '🏢 Apartamento', value: 'Apartamento' },
          { title: '🌳 Chácara', value: 'Chácara' },
          { title: '📐 Terreno', value: 'Terreno' },
          { title: '🏪 Comercial', value: 'Comercial' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'preco',
      title: 'Preço (R$)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'destaque',
      title: 'Imóvel em destaque na Home?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'fotos',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Descrição da foto',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma foto'),
    }),

    // ─── Localização ─────────────────────────────────────────────────
    defineField({
      name: 'cidade',
      title: 'Cidade',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bairro',
      title: 'Bairro / Região',
      type: 'string',
    }),

    defineField({
      name: 'estado',
      title: 'Estado (sigla)',
      type: 'string',
      initialValue: 'SP',
      validation: (Rule) => Rule.max(2),
    }),

    defineField({
      name: 'coordenadas',
      title: 'Coordenadas (para o mapa)',
      type: 'object',
      description: 'Abra o Google Maps, clique no local e copie as coordenadas',
      fields: [
        defineField({ name: 'lat', title: 'Latitude (ex: -23.1175)', type: 'number' }),
        defineField({ name: 'lng', title: 'Longitude (ex: -46.5530)', type: 'number' }),
      ],
    }),

    // ─── Características ─────────────────────────────────────────────
    defineField({
      name: 'quartos',
      title: 'Quartos',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'banheiros',
      title: 'Banheiros',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'vagas',
      title: 'Vagas de Garagem',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'areaUtil',
      title: 'Área Útil (m²)',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'areaTotal',
      title: 'Área Total (m²)',
      type: 'number',
      initialValue: 0,
    }),

    // ─── Descrição ───────────────────────────────────────────────────
    defineField({
      name: 'descricao',
      title: 'Descrição completa',
      type: 'text',
      rows: 5,
    }),
  ],
})
