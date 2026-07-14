import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart2, Users, Eye, TrendingUp, ExternalLink,
  LogOut, Lock, Home, AlertCircle, CheckCircle2,
  ArrowLeft, Settings
} from 'lucide-react'
import { getLocalAnalytics } from '../hooks/usePageTracking'

const ADMIN_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || ''

async function checkPassword(input) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  return hash === ADMIN_HASH
}
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const WA_NUMBER = '5511999999999'

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const ok = await checkPassword(password)
    if (ok) {
      onLogin()
    } else {
      setError('Senha incorreta. Tente novamente.')
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0D2B1F 0%, #1F4D3A 100%)' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
            <Lock className="w-8 h-8 text-dourado" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-white">Área Restrita</h1>
          <p className="font-montserrat text-white/60 text-sm mt-2">Fabio Sena Imóveis — Painel Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="mb-5">
            <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Senha de acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Digite a senha"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:border-verde-floresta transition-colors"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-red-500 text-xs font-montserrat flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-verde-floresta text-white py-3 rounded-xl font-semibold font-montserrat text-sm hover:bg-verde-escuro transition-colors disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link to="/" className="font-montserrat text-xs text-gray-400 hover:text-verde-floresta transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Voltar ao site
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color = 'text-verde-floresta' }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <p className={`font-cinzel text-3xl font-bold ${color} mb-1`}>{value}</p>
      <p className="font-montserrat text-sm font-semibold text-grafite">{label}</p>
      {sub && <p className="font-montserrat text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

// ─── Mini bar chart ───────────────────────────────────────────────────────────
function MiniBarChart({ data }) {
  const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b)).slice(-14)
  const max = Math.max(...entries.map(([, v]) => v), 1)

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-24 text-gray-300 text-sm font-montserrat">
        Sem dados ainda
      </div>
    )
  }

  return (
    <div className="flex items-end gap-1 h-24">
      {entries.map(([date, count]) => {
        const height = Math.max((count / max) * 100, 4)
        const label = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
        return (
          <div key={date} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full">
              <div
                className="w-full bg-verde-floresta rounded-t-sm opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ height: `${height * 0.85}px` }}
                title={`${label}: ${count} visitas`}
              />
            </div>
            <span className="text-[9px] text-gray-400 font-montserrat hidden sm:block">{label.slice(0, 5)}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    setAnalytics(getLocalAnalytics())
  }, [])

  if (!analytics) return null

  const today = new Date().toISOString().split('T')[0]
  const todayViews = analytics.daily[today] || 0
  const totalViews = analytics.total || 0

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const yesterdayViews = analytics.daily[yesterday] || 0

  const pageEntries = Object.entries(analytics.pages || {}).sort(([, a], [, b]) => b - a)

  const last7 = Object.entries(analytics.daily || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .reduce((sum, [, v]) => sum + v, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-verde-floresta text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-xl font-bold">Painel Administrativo</h1>
            <p className="font-montserrat text-white/60 text-xs">Fabio Sena Imóveis</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-montserrat transition-colors"
            >
              <Home className="w-4 h-4" /> Ver site
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-montserrat px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* GA4 Banner */}
        {!GA_ID ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-montserrat text-sm font-semibold text-amber-800 mb-1">
                Google Analytics não configurado
              </p>
              <p className="font-montserrat text-xs text-amber-700 mb-3">
                Os dados abaixo são contagem local (apenas deste navegador). Para analytics completos e multi-dispositivo, configure o Google Analytics 4 gratuitamente.
              </p>
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold font-montserrat text-amber-700 hover:text-amber-900"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Criar conta Google Analytics →
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-montserrat text-sm font-semibold text-green-800">Google Analytics ativo</p>
              <p className="font-montserrat text-xs text-green-600">ID: {GA_ID}</p>
            </div>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-semibold font-montserrat px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Abrir Analytics
            </a>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Eye}
            label="Visualizações hoje"
            value={todayViews}
            sub={yesterdayViews > 0 ? `${yesterdayViews} ontem` : 'Primeiro acesso'}
            color="text-verde-floresta"
          />
          <StatCard
            icon={BarChart2}
            label="Últimos 7 dias"
            value={last7}
            sub="visitas acumuladas"
            color="text-dourado"
          />
          <StatCard
            icon={TrendingUp}
            label="Total registrado"
            value={totalViews}
            sub="neste navegador"
            color="text-verde-floresta"
          />
          <StatCard
            icon={Users}
            label="Páginas únicas"
            value={pageEntries.length}
            sub="com visitas"
            color="text-dourado"
          />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-cinzel text-base font-semibold text-grafite">Visitas nos últimos 14 dias</h2>
              <p className="font-montserrat text-xs text-gray-400 mt-0.5">Contagem local deste navegador</p>
            </div>
          </div>
          <MiniBarChart data={analytics.daily || {}} />
        </div>

        {/* Top pages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-cinzel text-base font-semibold text-grafite mb-5">Páginas mais acessadas</h2>
          {pageEntries.length === 0 ? (
            <p className="text-center font-montserrat text-sm text-gray-400 py-8">
              Nenhum dado ainda — navegue pelo site para começar a registrar
            </p>
          ) : (
            <div className="space-y-3">
              {pageEntries.map(([page, count], idx) => {
                const maxCount = pageEntries[0][1]
                return (
                  <div key={page} className="flex items-center gap-3">
                    <span className="font-montserrat text-xs text-gray-400 w-4 text-right">{idx + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-montserrat text-sm font-medium text-grafite">{page}</span>
                        <span className="font-montserrat text-xs font-bold text-verde-floresta">{count}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-verde-floresta rounded-full"
                          style={{ width: `${(count / maxCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`https://sanity.io/manage/project/xe1cflcq`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-verde-floresta/30 hover:shadow-md transition-all group flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-verde-floresta/10 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-verde-floresta" />
            </div>
            <div>
              <p className="font-montserrat text-sm font-semibold text-grafite group-hover:text-verde-floresta transition-colors">Gerenciar Imóveis</p>
              <p className="font-montserrat text-xs text-gray-400">Abrir Sanity Studio</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 ml-auto" />
          </a>

          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl p-5 shadow-sm border border-transparent hover:shadow-md transition-all group flex items-center gap-4"
            style={{ backgroundColor: '#25D36615', borderColor: '#25D36630' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#25D36620' }}>
              <ExternalLink className="w-5 h-5" style={{ color: '#25D366' }} />
            </div>
            <div>
              <p className="font-montserrat text-sm font-semibold text-grafite">WhatsApp</p>
              <p className="font-montserrat text-xs text-gray-400">Abrir conversa</p>
            </div>
          </a>
        </div>

        <p className="text-center font-montserrat text-xs text-gray-300 pb-4">
          Fabio Sena Imóveis · Painel Administrativo · {new Date().getFullYear()}
        </p>
      </main>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('fs_admin') === 'true') setAuthed(true)
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('fs_admin', 'true')
    setAuthed(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('fs_admin')
    setAuthed(false)
  }

  if (!authed) return <LoginPage onLogin={handleLogin} />
  return <Dashboard onLogout={handleLogout} />
}
