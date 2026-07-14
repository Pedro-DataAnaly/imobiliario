import { Link } from 'react-router-dom'
import { Shield, Star, Leaf, Heart, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'
import ImovelCard from '../components/ImovelCard'
import LogoTree from '../components/LogoTree'
import { WhatsAppIcon } from '../components/WhatsAppButton'
import { useImoveis } from '../contexts/ImoveisContext'

const WA_NUMBER = '5511999999999'

const FEATURES = [
  {
    icon: Heart,
    title: 'Atendimento Personalizado',
    desc: 'Cada cliente recebe atenção exclusiva. Entendemos suas necessidades e buscamos o imóvel perfeito para você.',
  },
  {
    icon: Star,
    title: 'Imóveis Selecionados',
    desc: 'Curadoria rigorosa de propriedades com qualidade, localização e potencial de valorização comprovados.',
  },
  {
    icon: Shield,
    title: 'Transparência Total',
    desc: 'Todas as informações claras, documentação segura e negociações éticas do início ao fim.',
  },
  {
    icon: Leaf,
    title: 'Compromisso com a Natureza',
    desc: 'Especialistas em imóveis que harmonizam qualidade de vida, natureza e excelente investimento.',
  },
]

function LeafDecoration({ className, size = 120 }) {
  return (
    <svg
      className={`hero-leaf ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="white"
    >
      <path d="M60 10 C20 10, 5 50, 10 90 C40 70, 80 60, 110 20 C90 15, 70 10, 60 10Z" />
      <line x1="60" y1="10" x2="10" y2="90" stroke="white" strokeWidth="2" />
    </svg>
  )
}

export default function Home() {
  const { imoveis } = useImoveis()
  const featured = imoveis.filter((i) => i.destaque)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Foto de fundo */}
        <img
          src="/banner.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay gradiente — escuro à esquerda, transparente à direita */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,35,24,0.93) 0%, rgba(13,43,31,0.82) 35%, rgba(13,43,31,0.45) 60%, rgba(0,0,0,0.1) 100%)',
          }}
        />

        {/* Conteúdo — coluna esquerda */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <div className="max-w-xl">

            {/* Logo */}
            <div className="w-[110px] sm:w-[130px] mb-8 drop-shadow-[0_0_24px_rgba(200,163,77,0.5)]">
              <img src="/arvore.png" alt="Fabio Sena Imóveis" className="w-full h-auto" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-montserrat px-4 py-2 rounded-full mb-7 backdrop-blur-sm border border-white/20">
              <Leaf className="w-3.5 h-3.5" />
              Especialista em imóveis — São Paulo, Atibaia, Bragança Paulista e região
            </div>

            <h1 className="font-cinzel text-4xl sm:text-5  xl md:text-6xl font-bold text-white leading-tight mb-4">
              VIVER BEM.
              <br />
              <span className="text-dourado">INVESTIR MELHOR.</span>
            </h1>

            <p className="font-montserrat text-base sm:text-lg text-white/75 mb-10 leading-relaxed">
              Encontre o imóvel dos seus sonhos com Fabio Sena.
              Casas, apartamentos, chácaras e terrenos selecionados com cuidado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/busca"
                className="flex items-center justify-center gap-2 bg-dourado text-white px-8 py-4 rounded-xl font-semibold font-montserrat text-base hover:bg-dourado-escuro transition-all duration-300 hover:shadow-xl hover:shadow-dourado/30 group"
              >
                Ver todos os imóveis
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Olá Fabio! Gostaria de conhecer imóveis disponíveis.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold font-montserrat text-base hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                <WhatsAppIcon size={18} />
                Falar com Fabio
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs font-montserrat animate-bounce">
          <div className="w-px h-8 bg-white/30" />
          <span>Role para baixo</span>
        </div>
      </section>

      {/* ─── BUSCA ──────────────────────────────────────────── */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-4">
        <SearchForm />
      </section>

      {/* ─── POR QUE ESCOLHER ───────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-verde-floresta mb-4">
            Por que escolher Fabio Sena?
          </h2>
          <p className="font-montserrat text-gray-500 text-lg max-w-2xl mx-auto">
            Mais de uma década conectando famílias ao imóvel ideal com ética, competência e cuidado genuíno.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group text-center p-8 rounded-2xl border-2 border-transparent hover:border-dourado/30 hover:bg-verde-floresta/3 transition-all duration-300 hover:shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-verde-floresta/10 mb-5 group-hover:bg-verde-floresta/20 transition-colors duration-300">
                <Icon className="w-7 h-7 text-dourado" />
              </div>
              <h3 className="font-cinzel text-base font-semibold text-grafite mb-3">{title}</h3>
              <p className="font-montserrat text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── IMÓVEIS EM DESTAQUE ────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cinza-claro/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-verde-floresta mb-3">
                Imóveis em Destaque
              </h2>
              <p className="font-montserrat text-gray-500">
                Propriedades selecionadas com os melhores custo-benefício e potencial de valorização.
              </p>
            </div>
            <Link
              to="/busca"
              className="inline-flex items-center gap-2 text-verde-floresta font-semibold font-montserrat text-sm hover:text-dourado transition-colors whitespace-nowrap group"
            >
              Ver todos
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOBRE ──────────────────────────────────────────── */}
      <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div
                className="w-full h-80 lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #1F4D3A 0%, #0D2B1F 100%)',
                }}
              >
                <img
                  src="https://picsum.photos/seed/fabio-sena-corretor/600/700"
                  alt="Fabio Sena"
                  className="w-full h-full object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 flex items-end p-8">
                  <div>
                    <p className="font-cinzel text-2xl font-bold text-white">Fabio Sena</p>
                    <p className="font-montserrat text-dourado text-sm">Corretor de Imóveis | CRECI 74.385-F</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-dourado rounded-2xl -z-10 opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-verde-floresta rounded-full -z-10 opacity-10" />
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-verde-floresta/10 text-verde-floresta text-xs font-montserrat font-semibold px-4 py-2 rounded-full mb-6">
                <Leaf className="w-3.5 h-3.5" />
                Sobre Fabio Sena
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-grafite mb-6 leading-tight">
                Seu parceiro de confiança no{' '}
                <span className="text-verde-floresta">mercado imobiliário</span>
              </h2>
              <div className="space-y-4 font-montserrat text-gray-600 text-base leading-relaxed">
                <p>
                 Atuando no mercado imobiliário desde 2004, Fábio Sena construiu sua trajetória baseada em confiança, transparência e comprometimento com os objetivos de cada cliente.

                </p>
                <p>
                  Ao longo de mais de duas décadas de experiência, participou de negociações de compra, venda, lançamentos, captação de imóveis e desenvolvimento de projetos imobiliários, sempre buscando oferecer um atendimento personalizado e focado em resultados.

                </p>
                <p>
                  Com amplo conhecimento do mercado e das tendências do setor, Fábio Sena tem como missão ajudar famílias a realizarem o sonho da casa própria, investidores a encontrarem oportunidades rentáveis e proprietários a venderem seus imóveis com segurança e agilidade.
                </p>
                <p>
                  Seu trabalho é pautado pela ética, credibilidade e dedicação, acompanhando cada etapa do processo para garantir tranquilidade e satisfação aos seus clientes.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 my-8">
                {[
                  { num: '20+', label: 'Anos de experiência' },
                  { num: '500+', label: 'Imóveis negociados' },
                  { num: '99%', label: 'Clientes satisfeitos' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-cinzel text-2xl font-bold text-verde-floresta">{num}</p>
                    <p className="font-montserrat text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=Olá Fabio! Gostaria de conversar sobre imóveis.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white px-7 py-4 rounded-xl text-base font-semibold font-montserrat hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg"
                style={{ backgroundColor: '#25D366' }}
              >
                <WhatsAppIcon size={22} />
                Falar com Fabio pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1F4D3A 0%, #163629 100%)' }}
      >
        <LeafDecoration className="top-0 right-0 -rotate-45" size={200} />
        <LeafDecoration className="bottom-0 left-0 rotate-12" size={150} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para encontrar<br />
            <span className="text-dourado">o imóvel dos seus sonhos?</span>
          </h2>
          <p className="font-montserrat text-white/70 text-lg mb-10">
            Fale agora com Fabio e receba atendimento personalizado, gratuito e sem compromisso.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Olá Fabio! Gostaria de conhecer imóveis disponíveis.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white px-10 py-5 rounded-2xl text-lg font-bold font-montserrat hover:opacity-90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ backgroundColor: '#25D366' }}
          >
            <WhatsAppIcon size={26} />
            Falar com Fabio agora
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
