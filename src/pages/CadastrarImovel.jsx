import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle, Send, Home, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''

const TIPOS = ['Casa', 'Apartamento', 'Chácara', 'Terreno', 'Comercial']

const FIELD = ({ label, required, children }) => (
  <div>
    <label className="block font-montserrat text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
)

const INPUT = (props) => (
  <input
    {...props}
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:border-verde-floresta transition-colors"
  />
)

const TEXTAREA = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:border-verde-floresta transition-colors resize-none"
  />
)

const SELECT = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:border-verde-floresta transition-colors bg-white"
  >
    {children}
  </select>
)

export default function CadastrarImovel() {
  const [form, setForm] = useState({
    nome: '', telefone: '', email: '',
    tipo: '', titulo: '', cidade: '', bairro: '',
    preco: '', area: '', quartos: '', banheiros: '', vagas: '',
    descricao: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')   // deve ficar vazio (anti-bot)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Honeypot: se preenchido, é bot — rejeita silenciosamente
    if (honeypot) { setStatus('success'); return }

    setStatus('sending')

    const body = {
      access_key: ACCESS_KEY,
      botcheck: '',
      subject: `Nova solicitação de imóvel — ${form.tipo} em ${form.cidade}`,
      from_name: form.nome,
      nome_proprietario: form.nome,
      telefone: form.telefone,
      email: form.email,
      tipo_imovel: form.tipo,
      titulo: form.titulo,
      cidade: form.cidade,
      bairro: form.bairro,
      preco_pretendido: form.preco,
      area: form.area,
      quartos: form.quartos,
      banheiros: form.banheiros,
      vagas: form.vagas,
      descricao: form.descricao,
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({
          nome: '', telefone: '', email: '',
          tipo: '', titulo: '', cidade: '', bairro: '',
          preco: '', area: '', quartos: '', banheiros: '', vagas: '',
          descricao: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div
        className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #0D2B1F 0%, #1F4D3A 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 font-montserrat text-xs text-white/50 mb-4">
            <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Cadastrar Imóvel</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-dourado/20 flex items-center justify-center">
              <Home className="w-6 h-6 text-dourado" />
            </div>
            <div>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Cadastre seu Imóvel
              </h1>
              <p className="font-montserrat text-white/60 text-sm mt-1">
                Preencha os dados — o Fabio entrará em contato para avaliação.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Sucesso */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="font-cinzel text-xl font-bold text-green-800 mb-2">
              Solicitação enviada!
            </h2>
            <p className="font-montserrat text-green-700 text-sm mb-6">
              Recebemos seus dados. Fabio entrará em contato em breve para avaliar seu imóvel.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-verde-floresta text-white px-6 py-3 rounded-xl font-semibold font-montserrat text-sm hover:bg-verde-escuro transition-colors"
            >
              Voltar ao site
            </Link>
          </div>
        )}

        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            {/* Honeypot anti-bot — invisível para humanos */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
            />

            {/* Dados do Proprietário */}
            <div>
              <h2 className="font-cinzel text-base font-semibold text-grafite mb-5 pb-3 border-b border-gray-100">
                Seus dados de contato
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FIELD label="Nome completo" required>
                  <INPUT
                    type="text" required placeholder="Seu nome"
                    maxLength={100}
                    value={form.nome} onChange={set('nome')}
                  />
                </FIELD>
                <FIELD label="Telefone / WhatsApp" required>
                  <INPUT
                    type="tel" required placeholder="(11) 99999-9999"
                    maxLength={20}
                    value={form.telefone} onChange={set('telefone')}
                  />
                </FIELD>
                <FIELD label="E-mail" required>
                  <INPUT
                    type="email" required placeholder="seu@email.com"
                    maxLength={150}
                    value={form.email} onChange={set('email')}
                    className="sm:col-span-2 w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-montserrat text-sm focus:outline-none focus:border-verde-floresta transition-colors"
                  />
                </FIELD>
              </div>
            </div>

            {/* Dados do Imóvel */}
            <div>
              <h2 className="font-cinzel text-base font-semibold text-grafite mb-5 pb-3 border-b border-gray-100">
                Dados do imóvel
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FIELD label="Tipo de imóvel" required>
                  <SELECT required value={form.tipo} onChange={set('tipo')}>
                    <option value="">Selecione...</option>
                    {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </SELECT>
                </FIELD>
                <FIELD label="Título / Nome do imóvel" required>
                  <INPUT
                    type="text" required placeholder="Ex: Casa com piscina em condomínio"
                    maxLength={150}
                    value={form.titulo} onChange={set('titulo')}
                  />
                </FIELD>
                <FIELD label="Cidade" required>
                  <INPUT
                    type="text" required placeholder="Ex: Atibaia"
                    maxLength={80}
                    value={form.cidade} onChange={set('cidade')}
                  />
                </FIELD>
                <FIELD label="Bairro / Localização">
                  <INPUT
                    type="text" placeholder="Ex: Centro, Condomínio X"
                    maxLength={100}
                    value={form.bairro} onChange={set('bairro')}
                  />
                </FIELD>
                <FIELD label="Preço pretendido (R$)" required>
                  <INPUT
                    type="text" required placeholder="Ex: 850.000"
                    value={form.preco} onChange={set('preco')}
                  />
                </FIELD>
                <FIELD label="Área (m²)">
                  <INPUT
                    type="text" placeholder="Ex: 250"
                    value={form.area} onChange={set('area')}
                  />
                </FIELD>
                <FIELD label="Quartos">
                  <INPUT
                    type="number" min="0" placeholder="0"
                    value={form.quartos} onChange={set('quartos')}
                  />
                </FIELD>
                <FIELD label="Banheiros">
                  <INPUT
                    type="number" min="0" placeholder="0"
                    value={form.banheiros} onChange={set('banheiros')}
                  />
                </FIELD>
                <FIELD label="Vagas de garagem">
                  <INPUT
                    type="number" min="0" placeholder="0"
                    value={form.vagas} onChange={set('vagas')}
                  />
                </FIELD>
              </div>

              <div className="mt-5">
                <FIELD label="Descrição do imóvel">
                  <TEXTAREA
                    placeholder="Descreva o imóvel: características, diferenciais, estado de conservação..."
                    maxLength={2000}
                    value={form.descricao} onChange={set('descricao')}
                  />
                </FIELD>
              </div>
            </div>

            {/* Aviso */}
            <div className="bg-dourado/10 border border-dourado/30 rounded-xl p-4 font-montserrat text-xs text-gray-600">
              Após o envio, Fabio Sena avaliará as informações e entrará em contato pelo telefone ou e-mail fornecido. A publicação do imóvel no site fica sujeita à aprovação.
            </div>

            {/* Consentimento LGPD */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-verde-floresta flex-shrink-0"
              />
              <span className="font-montserrat text-xs text-gray-500 leading-relaxed">
                Concordo com o tratamento dos meus dados pessoais (nome, e-mail e telefone) pelo corretor Fabio Sena para fins de avaliação do imóvel, conforme a{' '}
                <a href="/politica-de-privacidade" className="text-verde-floresta underline hover:text-verde-escuro">
                  Política de Privacidade
                </a>
                . Os dados são transmitidos via Web3Forms e podem ser retidos por até 30 dias.{' '}
                <span className="text-red-400">*</span>
              </span>
            </label>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 font-montserrat text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Erro ao enviar. Verifique sua conexão e tente novamente.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 bg-verde-floresta text-white py-4 rounded-xl font-semibold font-montserrat text-base hover:bg-verde-escuro transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>Enviando...</>
              ) : (
                <><Send className="w-5 h-5" /> Enviar solicitação</>
              )}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  )
}
