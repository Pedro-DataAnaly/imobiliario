import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Plus, Pencil, Trash2, Home, Upload, X, ChevronLeft, ChevronRight, ImageIcon, Video, Save, Loader2, CheckCircle2, AlertCircle, Lock } from 'lucide-react'

const ADMIN_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || ''

async function hashPassword(input) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const TIPOS = ['Casa', 'Apartamento', 'Chácara', 'Terreno', 'Comercial']

const FORM_VAZIO = {
  titulo: '', tipo: 'Casa', preco: '', cidade: '', bairro: '', estado: 'SP',
  quartos: 0, banheiros: 0, vagas: 0, areaUtil: 0, areaTotal: 0,
  descricao: '', lat: '', lng: '', destaque: false,
}

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const hash = await hashPassword(senha)
    if (hash === ADMIN_HASH) {
      onLogin(hash)
    } else {
      setErro('Senha incorreta')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="w-12 h-12 bg-verde-floresta rounded-xl flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-cinzel text-xl font-bold text-center text-grafite mb-1">Admin</h1>
        <p className="font-montserrat text-sm text-center text-gray-400 mb-6">Fabio Sena Imóveis</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro('') }}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-verde-floresta"
            required
          />
          {erro && <p className="text-red-500 text-xs font-montserrat text-center">{erro}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-verde-floresta text-white py-3 rounded-xl font-montserrat font-semibold text-sm hover:bg-verde-escuro transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="font-montserrat text-xs text-gray-400 hover:text-verde-floresta transition-colors">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Upload de Fotos ──────────────────────────────────────────────────────────
function PhotoUploader({ fotos, onChange, token }) {
  const [uploading, setUploading] = useState(false)
  const [progresso, setProgresso] = useState({})
  const inputRef = useRef()
  const pastaRef = useRef()
  const dropRef = useRef()

  async function uploadArquivo(file) {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    })
    if (!res.ok) throw new Error('Falha no upload')
    return res.json()
  }

  async function processarArquivos(files) {
    const imagens = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!imagens.length) return
    setUploading(true)
    const novas = []
    for (const file of imagens) {
      setProgresso(p => ({ ...p, [file.name]: 'enviando' }))
      try {
        const result = await uploadArquivo(file)
        novas.push({ url: result.url, key: result.key, nome: file.name })
        setProgresso(p => ({ ...p, [file.name]: 'ok' }))
      } catch {
        setProgresso(p => ({ ...p, [file.name]: 'erro' }))
      }
    }
    onChange([...fotos, ...novas])
    setUploading(false)
    setTimeout(() => setProgresso({}), 2000)
  }

  function onDrop(e) {
    e.preventDefault()
    dropRef.current?.classList.remove('border-verde-floresta', 'bg-verde-floresta/5')
    processarArquivos(e.dataTransfer.files)
  }

  function moverFoto(idx, dir) {
    const arr = [...fotos]
    const novoIdx = idx + dir
    if (novoIdx < 0 || novoIdx >= arr.length) return
    ;[arr[idx], arr[novoIdx]] = [arr[novoIdx], arr[idx]]
    onChange(arr)
  }

  async function removerFoto(idx) {
    const foto = fotos[idx]
    if (foto.key) {
      await fetch(`/api/media/${foto.key}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {})
    }
    onChange(fotos.filter((_, i) => i !== idx))
  }

  const progressoEntries = Object.entries(progresso)

  return (
    <div className="space-y-3">
      <label className="font-montserrat text-sm font-semibold text-grafite">
        Fotos <span className="text-gray-400 font-normal">(a 1ª é a capa)</span>
      </label>

      {/* Drop zone */}
      <div
        ref={dropRef}
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add('border-verde-floresta', 'bg-verde-floresta/5') }}
        onDragLeave={() => dropRef.current?.classList.remove('border-verde-floresta', 'bg-verde-floresta/5')}
        className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center transition-colors"
      >
        <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="font-montserrat text-sm text-gray-400 mb-3">Arraste fotos aqui ou escolha:</p>
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-verde-floresta text-white rounded-lg font-montserrat text-xs font-semibold hover:bg-verde-escuro transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" /> Selecionar fotos
          </button>
          <button
            type="button"
            onClick={() => pastaRef.current?.click()}
            className="px-4 py-2 bg-gray-100 text-grafite rounded-lg font-montserrat text-xs font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" /> Selecionar pasta
          </button>
        </div>
        <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => processarArquivos(e.target.files)} />
        <input ref={pastaRef} type="file" webkitdirectory="" accept="image/*" className="hidden" onChange={e => processarArquivos(e.target.files)} />
      </div>

      {/* Progresso de uploads */}
      {progressoEntries.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
          {progressoEntries.map(([nome, status]) => (
            <div key={nome} className="flex items-center gap-2 font-montserrat text-xs">
              {status === 'enviando' && <Loader2 className="w-3.5 h-3.5 animate-spin text-verde-floresta flex-shrink-0" />}
              {status === 'ok' && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
              {status === 'erro' && <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
              <span className="truncate text-gray-500">{nome}</span>
            </div>
          ))}
        </div>
      )}

      {/* Grid de fotos */}
      {fotos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {fotos.map((foto, idx) => (
            <div key={foto.key || idx} className="relative group aspect-square">
              <img
                src={foto.url}
                alt=""
                className="w-full h-full object-cover rounded-xl"
                onError={e => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23eee" width="100" height="100"/></svg>' }}
              />
              {idx === 0 && (
                <span className="absolute top-1 left-1 bg-dourado text-white text-[9px] font-bold font-montserrat px-1.5 py-0.5 rounded-md">CAPA</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-1">
                <button type="button" onClick={() => moverFoto(idx, -1)} disabled={idx === 0} className="w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-white">
                  <ChevronLeft className="w-4 h-4 text-grafite" />
                </button>
                <button type="button" onClick={() => removerFoto(idx)} className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600">
                  <X className="w-4 h-4 text-white" />
                </button>
                <button type="button" onClick={() => moverFoto(idx, 1)} disabled={idx === fotos.length - 1} className="w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-white">
                  <ChevronRight className="w-4 h-4 text-grafite" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Upload de Vídeo ──────────────────────────────────────────────────────────
function VideoUploader({ video, onChange, token }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const data = await res.json()
      onChange({ url: data.url, key: data.key, nome: file.name })
    } catch {
      alert('Erro ao enviar vídeo. Tente novamente.')
    }
    setUploading(false)
  }

  async function remover() {
    if (video?.key) {
      await fetch(`/api/media/${video.key}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {})
    }
    onChange(null)
  }

  return (
    <div className="space-y-2">
      <label className="font-montserrat text-sm font-semibold text-grafite">Vídeo tour <span className="text-gray-400 font-normal">(1 por imóvel)</span></label>
      {video ? (
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          <Video className="w-5 h-5 text-verde-floresta flex-shrink-0" />
          <span className="font-montserrat text-xs text-grafite truncate flex-1">{video.nome || 'Vídeo enviado'}</span>
          <button type="button" onClick={remover} className="w-7 h-7 bg-red-100 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 font-montserrat text-sm text-gray-400 hover:border-verde-floresta hover:text-verde-floresta transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
          {uploading ? 'Enviando vídeo...' : 'Selecionar vídeo (MP4, MOV)'}
        </button>
      )}
      <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

// ─── Formulário de Imóvel ─────────────────────────────────────────────────────
function ImovelForm({ imovel, token, onSave, onCancel }) {
  const isEdicao = !!imovel?.id
  const [form, setForm] = useState(imovel ? {
    titulo: imovel.titulo, tipo: imovel.tipo, preco: imovel.preco,
    cidade: imovel.cidade, bairro: imovel.bairro, estado: imovel.estado,
    quartos: imovel.quartos, banheiros: imovel.banheiros, vagas: imovel.vagas,
    areaUtil: imovel.areaUtil, areaTotal: imovel.areaTotal, descricao: imovel.descricao,
    lat: imovel.coordenadas?.lat || '', lng: imovel.coordenadas?.lng || '',
    destaque: imovel.destaque,
  } : { ...FORM_VAZIO })
  const [fotos, setFotos] = useState(
    (imovel?.fotos || []).map((url, i) => ({ url, key: url.split('/').pop(), nome: `foto${i + 1}` }))
  )
  const [video, setVideo] = useState(
    imovel?.video ? { url: imovel.video, key: imovel.video.split('/').pop(), nome: 'vídeo' } : null
  )
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  function set(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!fotos.length) { setErro('Adicione pelo menos uma foto.'); return }
    setSalvando(true)
    setErro('')
    try {
      const payload = {
        ...form,
        preco: Number(form.preco),
        quartos: Number(form.quartos),
        banheiros: Number(form.banheiros),
        vagas: Number(form.vagas),
        areaUtil: Number(form.areaUtil),
        areaTotal: Number(form.areaTotal),
        lat: form.lat ? Number(form.lat) : null,
        lng: form.lng ? Number(form.lng) : null,
        fotos: fotos.map(f => f.url),
        video: video?.url || null,
      }
      const url = isEdicao ? `/api/imoveis/${imovel.id}` : '/api/imoveis'
      const method = isEdicao ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      onSave()
    } catch (err) {
      setErro(err.message)
      setSalvando(false)
    }
  }

  const campo = (label, name, type = 'text', opts = {}) => (
    <div>
      <label className="font-montserrat text-xs font-semibold text-gray-500 mb-1 block">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => set(name, e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-verde-floresta"
        {...opts}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-grafite hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-cinzel font-bold text-grafite">{isEdicao ? 'Editar Imóvel' : 'Novo Imóvel'}</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={salvando}
            className="flex items-center gap-2 bg-verde-floresta text-white px-5 py-2.5 rounded-xl font-montserrat text-sm font-semibold hover:bg-verde-escuro transition-colors disabled:opacity-60"
          >
            {salvando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-montserrat text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {erro}
          </div>
        )}

        {/* Informações básicas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="font-cinzel text-sm font-semibold text-verde-floresta">Informações Básicas</h2>
          {campo('Título do imóvel *', 'titulo', 'text', { required: true, placeholder: 'Ex: Casa com piscina em condomínio' })}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-montserrat text-xs font-semibold text-gray-500 mb-1 block">Tipo *</label>
              <select
                value={form.tipo}
                onChange={e => set('tipo', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-verde-floresta bg-white"
              >
                {TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            {campo('Preço (R$) *', 'preco', 'number', { required: true, min: 0, placeholder: '850000' })}
          </div>
          <div className="flex items-center gap-3 bg-dourado/10 rounded-xl px-4 py-3">
            <input
              type="checkbox"
              id="destaque"
              checked={form.destaque}
              onChange={e => set('destaque', e.target.checked)}
              className="w-4 h-4 accent-dourado"
            />
            <label htmlFor="destaque" className="font-montserrat text-sm text-grafite cursor-pointer">
              ⭐ Exibir em destaque na página inicial
            </label>
          </div>
        </div>

        {/* Localização */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="font-cinzel text-sm font-semibold text-verde-floresta">Localização</h2>
          <div className="grid grid-cols-2 gap-3">
            {campo('Cidade *', 'cidade', 'text', { required: true, placeholder: 'Atibaia' })}
            {campo('Bairro / Região', 'bairro', 'text', { placeholder: 'Centro' })}
          </div>
          {campo('Estado', 'estado', 'text', { maxLength: 2, placeholder: 'SP' })}
          <div className="grid grid-cols-2 gap-3">
            {campo('Latitude (mapa)', 'lat', 'text', { placeholder: '-23.1175' })}
            {campo('Longitude (mapa)', 'lng', 'text', { placeholder: '-46.5530' })}
          </div>
          <p className="font-montserrat text-xs text-gray-400">
            💡 Para obter as coordenadas: abra o Google Maps, clique com botão direito no imóvel e copie os números.
          </p>
        </div>

        {/* Características */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="font-cinzel text-sm font-semibold text-verde-floresta">Características</h2>
          <div className="grid grid-cols-3 gap-3">
            {campo('Quartos', 'quartos', 'number', { min: 0 })}
            {campo('Banheiros', 'banheiros', 'number', { min: 0 })}
            {campo('Vagas', 'vagas', 'number', { min: 0 })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {campo('Área Útil (m²)', 'areaUtil', 'number', { min: 0 })}
            {campo('Área Total (m²)', 'areaTotal', 'number', { min: 0 })}
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h2 className="font-cinzel text-sm font-semibold text-verde-floresta">Descrição</h2>
          <textarea
            value={form.descricao}
            onChange={e => set('descricao', e.target.value)}
            rows={5}
            placeholder="Descreva o imóvel: diferenciais, infraestrutura, localização..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-verde-floresta resize-none"
          />
        </div>

        {/* Fotos */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <PhotoUploader fotos={fotos} onChange={setFotos} token={token} />
        </div>

        {/* Vídeo */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <VideoUploader video={video} onChange={setVideo} token={token} />
        </div>

        <div className="pb-8">
          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-verde-floresta text-white py-4 rounded-xl font-montserrat font-bold text-sm hover:bg-verde-escuro transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {salvando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {salvando ? 'Salvando...' : isEdicao ? 'Salvar alterações' : 'Publicar imóvel'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Card de Imóvel ───────────────────────────────────────────────────────────
function ImovelCard({ imovel, onEdit, onDelete }) {
  const [confirmando, setConfirmando] = useState(false)

  function handleDelete() {
    if (!confirmando) { setConfirmando(true); return }
    onDelete(imovel.id)
  }

  const preco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(imovel.preco)

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-gray-100">
        {imovel.fotos?.[0] ? (
          <img src={imovel.fotos[0]} alt={imovel.titulo} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-gray-300" /></div>
        )}
        {imovel.destaque && (
          <span className="absolute top-2 left-2 bg-dourado text-white text-[10px] font-bold font-montserrat px-2 py-1 rounded-lg">⭐ DESTAQUE</span>
        )}
        {imovel.video && (
          <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-montserrat px-2 py-1 rounded-lg flex items-center gap-1">
            <Video className="w-3 h-3" /> Vídeo
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="font-montserrat text-[11px] font-semibold text-verde-floresta bg-verde-floresta/10 px-2 py-0.5 rounded-full">{imovel.tipo}</span>
          <span className="font-cinzel text-sm font-bold text-dourado">{preco}</span>
        </div>
        <h3 className="font-montserrat text-sm font-semibold text-grafite line-clamp-2 mt-1.5 mb-0.5">{imovel.titulo}</h3>
        <p className="font-montserrat text-xs text-gray-400">{imovel.bairro ? `${imovel.bairro}, ` : ''}{imovel.cidade}</p>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={() => onEdit(imovel)}
            className="flex-1 flex items-center justify-center gap-1.5 text-verde-floresta border border-verde-floresta/30 hover:bg-verde-floresta hover:text-white rounded-xl py-2 font-montserrat text-xs font-semibold transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Editar
          </button>
          <button
            onClick={handleDelete}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 font-montserrat text-xs font-semibold transition-colors border ${
              confirmando
                ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                : 'text-red-400 border-red-200 hover:bg-red-50'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {confirmando ? 'Confirmar exclusão' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ token, onLogout }) {
  const [imoveis, setImoveis] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('lista') // 'lista' | 'form'
  const [editando, setEditando] = useState(null)
  const [erro, setErro] = useState('')

  async function carregar() {
    setLoading(true)
    setErro('')
    try {
      const res = await fetch('/api/imoveis')
      if (!res.ok) throw new Error('Erro ao carregar')
      setImoveis(await res.json())
    } catch {
      setErro('Não foi possível carregar os imóveis. Verifique se o site está publicado no Cloudflare.')
    }
    setLoading(false)
  }

  useEffect(() => { carregar() }, [])

  async function excluir(id) {
    await fetch(`/api/imoveis/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    carregar()
  }

  function novoImovel() { setEditando(null); setView('form') }
  function editarImovel(imovel) { setEditando(imovel); setView('form') }
  function aposSalvar() { setView('lista'); carregar() }

  if (view === 'form') {
    return <ImovelForm imovel={editando} token={token} onSave={aposSalvar} onCancel={() => setView('lista')} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-grafite hover:bg-gray-100 rounded-xl transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-cinzel font-bold text-grafite text-sm">Admin</h1>
              <p className="font-montserrat text-xs text-gray-400">Fabio Sena Imóveis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={novoImovel}
              className="flex items-center gap-2 bg-verde-floresta text-white px-4 py-2.5 rounded-xl font-montserrat text-sm font-semibold hover:bg-verde-escuro transition-colors"
            >
              <Plus className="w-4 h-4" /> Novo imóvel
            </button>
            <button onClick={onLogout} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total de imóveis', valor: imoveis.length },
            { label: 'Em destaque', valor: imoveis.filter(i => i.destaque).length },
            { label: 'Com vídeo', valor: imoveis.filter(i => i.video).length },
            { label: 'Fotos enviadas', valor: imoveis.reduce((s, i) => s + (i.fotos?.length || 0), 0) },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="font-montserrat text-2xl font-bold text-verde-floresta">{stat.valor}</p>
              <p className="font-montserrat text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Erro */}
        {erro && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 font-montserrat text-sm text-amber-700 flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {erro}
          </div>
        )}

        {/* Lista */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-verde-floresta" />
          </div>
        ) : imoveis.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-cinzel font-semibold text-grafite mb-2">Nenhum imóvel cadastrado</h3>
            <p className="font-montserrat text-sm text-gray-400 mb-6">Comece adicionando o primeiro imóvel.</p>
            <button onClick={novoImovel} className="bg-verde-floresta text-white px-6 py-3 rounded-xl font-montserrat font-semibold text-sm hover:bg-verde-escuro transition-colors">
              + Adicionar imóvel
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {imoveis.map(imovel => (
              <ImovelCard key={imovel.id} imovel={imovel} onEdit={editarImovel} onDelete={excluir} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Export principal ─────────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(null)

  return token
    ? <Dashboard token={token} onLogout={() => setToken(null)} />
    : <Login onLogin={setToken} />
}
