import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ImoveisProvider } from './contexts/ImoveisContext'
import Home from './pages/Home'
import Busca from './pages/Busca'
import DetalheImovel from './pages/DetalheImovel'
import Admin from './pages/Admin'
import CadastrarImovel from './pages/CadastrarImovel'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import WhatsAppButton from './components/WhatsAppButton'
import CookieConsent from './components/CookieConsent'
import { usePageTracking } from './hooks/usePageTracking'

function TrackingLayer() {
  usePageTracking()
  return null
}

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <>
      <TrackingLayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/imovel/:id" element={<DetalheImovel />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cadastrar-imovel" element={<CadastrarImovel />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      </Routes>
      {!isAdmin && <WhatsAppButton />}
      <CookieConsent />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ImoveisProvider>
        <AppRoutes />
      </ImoveisProvider>
    </BrowserRouter>
  )
}
