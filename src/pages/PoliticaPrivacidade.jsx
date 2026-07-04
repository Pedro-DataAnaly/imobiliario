import { Link } from 'react-router-dom'
import { ChevronRight, Shield } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECAO = ({ titulo, children }) => (
  <section className="mb-10">
    <h2 className="font-cinzel text-lg font-semibold text-verde-floresta mb-3">{titulo}</h2>
    <div className="font-montserrat text-sm text-gray-600 leading-relaxed space-y-3">
      {children}
    </div>
  </section>
)

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div
        className="py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #0D2B1F 0%, #1F4D3A 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 font-montserrat text-xs text-white/50 mb-4">
            <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Política de Privacidade</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-dourado/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-dourado" />
            </div>
            <div>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Política de Privacidade
              </h1>
              <p className="font-montserrat text-white/60 text-sm mt-1">
                Última atualização: julho de 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">

          <p className="font-montserrat text-sm text-gray-500 leading-relaxed mb-10">
            Esta Política de Privacidade descreve como o site <strong className="text-grafite">Fabio Sena Imóveis</strong>{' '}
            coleta, usa e protege os dados pessoais dos visitantes, em conformidade com a{' '}
            <strong className="text-grafite">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
          </p>

          <SECAO titulo="1. Quem é o Responsável pelos Dados">
            <p>
              O responsável pelo tratamento dos dados pessoais coletados neste site é:
            </p>
            <ul className="list-none space-y-1 mt-2">
              <li><strong className="text-grafite">Corretor:</strong> Fabio Renato Sena</li>
              <li><strong className="text-grafite">CRECI:</strong> 74.385-F</li>
              <li><strong className="text-grafite">Telefone / WhatsApp:</strong> (11) 92010-5933</li>
              <li><strong className="text-grafite">Região de atuação:</strong> Atibaia, Bragança Paulista, São Paulo e região</li>
            </ul>
          </SECAO>

          <SECAO titulo="2. Quais Dados Coletamos">
            <p>
              <strong className="text-grafite">a) Formulário de Cadastro de Imóvel</strong> — ao preencher o formulário disponível em{' '}
              <Link to="/cadastrar-imovel" className="text-verde-floresta underline hover:text-verde-escuro">
                /cadastrar-imovel
              </Link>
              , coletamos:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Nome completo</li>
              <li>Telefone / WhatsApp</li>
              <li>Endereço de e-mail</li>
              <li>Dados do imóvel (tipo, cidade, preço, descrição)</li>
            </ul>
            <p className="mt-3">
              <strong className="text-grafite">b) Dados de navegação (somente com consentimento)</strong> — se você aceitar os cookies de análise, o Google Analytics 4 coleta de forma anônima:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Tipo de dispositivo e navegador</li>
              <li>País/região de origem (não o endereço exato)</li>
            </ul>
            <p className="mt-3">
              Nenhum dado pessoal identificável (nome, e-mail, telefone) é enviado ao Google Analytics.
            </p>
          </SECAO>

          <SECAO titulo="3. Como Usamos os Dados">
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Entrar em contato com o proprietário para avaliação do imóvel</li>
              <li>Analisar se o imóvel se enquadra no perfil de comercialização</li>
              <li>Melhorar a experiência do site com base em dados agregados de navegação</li>
            </ul>
            <p className="mt-3">
              Os dados <strong className="text-grafite">não serão compartilhados, vendidos ou cedidos</strong> a terceiros,
              exceto aos serviços de infraestrutura descritos abaixo, que atuam como operadores de dados.
            </p>
          </SECAO>

          <SECAO titulo="4. Serviços de Terceiros (Operadores)">
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-grafite mb-1">Web3Forms</p>
                <p>Serviço utilizado para transmitir os dados do formulário ao corretor por e-mail. As submissões ficam retidas nos servidores do Web3Forms por até <strong>30 dias</strong> no plano gratuito.</p>
                <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="text-verde-floresta underline text-xs mt-1 inline-block hover:text-verde-escuro">
                  Política de Privacidade do Web3Forms →
                </a>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-grafite mb-1">Google Analytics 4</p>
                <p>Utilizado para medir o tráfego do site de forma anônima, <strong>somente mediante seu consentimento</strong>. Você pode recusar ou revogar o consentimento a qualquer momento pelo banner de cookies.</p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-verde-floresta underline text-xs mt-1 inline-block hover:text-verde-escuro">
                  Política de Privacidade do Google →
                </a>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-grafite mb-1">Sanity.io</p>
                <p>Plataforma de gerenciamento de conteúdo onde os imóveis são cadastrados. Armazena apenas dados dos imóveis (fotos, descrições, preços) — nenhum dado de clientes.</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-grafite mb-1">OpenStreetMap / Leaflet</p>
                <p>Utilizado para exibir o mapa interativo dos imóveis. Não coleta dados pessoais dos visitantes.</p>
              </div>
            </div>
          </SECAO>

          <SECAO titulo="5. Base Legal para o Tratamento (LGPD)">
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><strong className="text-grafite">Formulário de imóvel:</strong> consentimento expresso (Art. 7º, I da LGPD), obtido mediante checkbox obrigatório</li>
              <li><strong className="text-grafite">Google Analytics:</strong> consentimento expresso, obtido mediante aceitação do banner de cookies</li>
              <li><strong className="text-grafite">Dados do site (imóveis):</strong> legítimo interesse do controlador para prestação de serviço imobiliário</li>
            </ul>
          </SECAO>

          <SECAO titulo="6. Por Quanto Tempo os Dados São Retidos">
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><strong className="text-grafite">Dados do formulário (Web3Forms):</strong> até 30 dias nos servidores do Web3Forms; no e-mail do corretor, pelo tempo necessário para concluir o atendimento</li>
              <li><strong className="text-grafite">Dados do Google Analytics:</strong> 14 meses (configuração padrão do GA4)</li>
            </ul>
          </SECAO>

          <SECAO titulo="7. Seus Direitos como Titular (LGPD, Art. 18)">
            <p>Você tem direito a:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar os dados que temos sobre você</li>
              <li>Solicitar a correção de dados incompletos ou incorretos</li>
              <li>Solicitar a eliminação dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer um desses direitos, entre em contato pelo WhatsApp{' '}
              <a
                href="https://wa.me/5511920105933?text=Olá Fabio! Gostaria de exercer meus direitos LGPD."
                target="_blank"
                rel="noopener noreferrer"
                className="text-verde-floresta underline hover:text-verde-escuro"
              >
                (11) 92010-5933
              </a>
              .
            </p>
          </SECAO>

          <SECAO titulo="8. Cookies">
            <p>
              Utilizamos apenas cookies funcionais essenciais (sem cookies) e, mediante consentimento, cookies analíticos do Google Analytics. Nenhum cookie de publicidade ou rastreamento cross-site é utilizado.
            </p>
            <p>
              Você pode revogar o consentimento de cookies limpando o armazenamento local do navegador ou utilizando o botão abaixo:
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('fs_cookie_consent')
                window.location.reload()
              }}
              className="mt-3 px-5 py-2.5 rounded-xl border-2 border-verde-floresta text-verde-floresta font-montserrat text-sm font-semibold hover:bg-verde-floresta hover:text-white transition-colors"
            >
              Revogar consentimento de cookies
            </button>
          </SECAO>

          <SECAO titulo="9. Segurança">
            <p>
              Adotamos medidas técnicas para proteger os dados transmitidos pelo site, incluindo comunicação via HTTPS e ausência de armazenamento de dados pessoais em nossos servidores. O site é hospedado no Cloudflare Pages, que mantém certificação ISO 27001 e SOC 2.
            </p>
          </SECAO>

          <SECAO titulo="10. Contato e Encarregado de Dados (DPO)">
            <p>
              Para dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em contato:
            </p>
            <ul className="list-none space-y-1 mt-2">
              <li><strong className="text-grafite">WhatsApp:</strong>{' '}
                <a href="https://wa.me/5511920105933" target="_blank" rel="noopener noreferrer" className="text-verde-floresta underline hover:text-verde-escuro">
                  (11) 92010-5933
                </a>
              </li>
            </ul>
          </SECAO>

          <div className="border-t border-gray-100 pt-8 mt-8">
            <p className="font-montserrat text-xs text-gray-400 text-center">
              Esta política pode ser atualizada periodicamente. A data da última revisão está indicada no topo desta página.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
