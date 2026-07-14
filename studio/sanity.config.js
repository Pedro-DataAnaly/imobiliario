import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'fabio-sena-imoveis',
  title: 'Fabio Sena Imóveis',

  // ⚠️  Preencha após criar a conta em sanity.io/manage
  projectId: 'xe1cflcq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Fabio Sena Imóveis')
          .items([
            S.listItem()
              .title('🏠 Imóveis')
              .schemaType('imovel')
              .child(S.documentTypeList('imovel').title('Todos os imóveis')),
            S.divider(),
            S.listItem()
              .title('⭐ Destaques')
              .schemaType('imovel')
              .child(
                S.documentTypeList('imovel')
                  .title('Imóveis em destaque')
                  .filter('_type == "imovel" && destaque == true')
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
