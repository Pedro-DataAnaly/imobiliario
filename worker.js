const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })
}

function parseRow(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    tipo: row.tipo,
    preco: row.preco,
    cidade: row.cidade,
    bairro: row.bairro || '',
    estado: row.estado || 'SP',
    quartos: row.quartos || 0,
    banheiros: row.banheiros || 0,
    vagas: row.vagas || 0,
    areaUtil: row.area_util || 0,
    areaTotal: row.area_total || 0,
    descricao: row.descricao || '',
    coordenadas: row.lat && row.lng ? { lat: row.lat, lng: row.lng } : null,
    destaque: row.destaque === 1 || row.destaque === true,
    fotos: JSON.parse(row.fotos || '[]'),
    video: row.video || null,
    criadoEm: row.created_at,
  }
}

async function isAuthorized(request, env) {
  const auth = request.headers.get('Authorization') || ''
  const token = auth.replace('Bearer ', '').trim()
  return token.length > 0 && token === (env.ADMIN_HASH || '')
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url)
    }

    return env.ASSETS.fetch(request)
  },
}

async function handleApi(request, env, url) {
  const seg = url.pathname.split('/').filter(Boolean)
  const resource = seg[1]
  const id = seg[2]
  const method = request.method

  try {
    // GET /api/imoveis
    if (resource === 'imoveis' && method === 'GET' && !id) {
      const { results } = await env.DB.prepare(
        'SELECT * FROM imoveis ORDER BY created_at DESC'
      ).all()
      return json(results.map(parseRow))
    }

    // GET /api/imoveis/:id
    if (resource === 'imoveis' && method === 'GET' && id) {
      const row = await env.DB.prepare('SELECT * FROM imoveis WHERE id = ?').bind(id).first()
      if (!row) return json({ error: 'Not found' }, 404)
      return json(parseRow(row))
    }

    // GET /api/media/:key — serve file from R2
    if (resource === 'media' && id && method === 'GET') {
      const key = seg.slice(2).join('/')
      const obj = await env.MEDIA.get(key)
      if (!obj) return new Response('Not found', { status: 404 })
      const headers = new Headers(CORS)
      headers.set('Content-Type', obj.httpMetadata?.contentType || 'application/octet-stream')
      headers.set('Cache-Control', 'public, max-age=31536000')
      return new Response(obj.body, { headers })
    }

    // All write operations require auth
    if (!(await isAuthorized(request, env))) {
      return json({ error: 'Não autorizado' }, 401)
    }

    // POST /api/imoveis
    if (resource === 'imoveis' && method === 'POST') {
      const data = await request.json()
      const rowId = crypto.randomUUID()
      await env.DB.prepare(`
        INSERT INTO imoveis (id, titulo, tipo, preco, cidade, bairro, estado,
          quartos, banheiros, vagas, area_util, area_total, descricao,
          lat, lng, destaque, fotos, video)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        rowId, data.titulo, data.tipo, data.preco, data.cidade,
        data.bairro || '', data.estado || 'SP',
        data.quartos || 0, data.banheiros || 0, data.vagas || 0,
        data.areaUtil || 0, data.areaTotal || 0, data.descricao || '',
        data.lat || null, data.lng || null, data.destaque ? 1 : 0,
        JSON.stringify(data.fotos || []), data.video || null
      ).run()
      return json({ id: rowId }, 201)
    }

    // PUT /api/imoveis/:id
    if (resource === 'imoveis' && method === 'PUT' && id) {
      const data = await request.json()
      await env.DB.prepare(`
        UPDATE imoveis SET titulo=?, tipo=?, preco=?, cidade=?, bairro=?, estado=?,
          quartos=?, banheiros=?, vagas=?, area_util=?, area_total=?, descricao=?,
          lat=?, lng=?, destaque=?, fotos=?, video=?, updated_at=CURRENT_TIMESTAMP
        WHERE id=?
      `).bind(
        data.titulo, data.tipo, data.preco, data.cidade,
        data.bairro || '', data.estado || 'SP',
        data.quartos || 0, data.banheiros || 0, data.vagas || 0,
        data.areaUtil || 0, data.areaTotal || 0, data.descricao || '',
        data.lat || null, data.lng || null, data.destaque ? 1 : 0,
        JSON.stringify(data.fotos || []), data.video || null, id
      ).run()
      return json({ success: true })
    }

    // DELETE /api/imoveis/:id
    if (resource === 'imoveis' && method === 'DELETE' && id) {
      await env.DB.prepare('DELETE FROM imoveis WHERE id = ?').bind(id).run()
      return json({ success: true })
    }

    // POST /api/upload — upload file to R2
    if (resource === 'upload' && method === 'POST') {
      const formData = await request.formData()
      const file = formData.get('file')
      if (!file) return json({ error: 'Nenhum arquivo enviado' }, 400)
      const ext = file.name.split('.').pop().toLowerCase()
      const key = `${crypto.randomUUID()}.${ext}`
      await env.MEDIA.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
      })
      return json({ key, url: `/api/media/${key}` })
    }

    // DELETE /api/media/:key
    if (resource === 'media' && method === 'DELETE' && id) {
      const key = seg.slice(2).join('/')
      await env.MEDIA.delete(key)
      return json({ success: true })
    }

    return json({ error: 'Rota não encontrada' }, 404)
  } catch (err) {
    console.error('[Worker Error]', err)
    return json({ error: err.message }, 500)
  }
}
