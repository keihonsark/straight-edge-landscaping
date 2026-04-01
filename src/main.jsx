import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import config from './config'
import Home from './pages/Home'
import Estimate from './pages/Estimate'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import LawnMaintenance from './pages/services/LawnMaintenance'
import SodInstallation from './pages/services/SodInstallation'
import TreeServices from './pages/services/TreeServices'
import IrrigationSystems from './pages/services/IrrigationSystems'
import MulchRiverRock from './pages/services/MulchRiverRock'
import LandscapingHardscape from './pages/services/LandscapingHardscape'
import LawnEstimator from './pages/LawnEstimator'
import LawnHealthQuiz from './pages/LawnHealthQuiz'
import FloatingCallButton from './components/FloatingCallButton'
import ChatWidget from './components/ChatWidget'
import ScrollToTop from './components/ScrollToTop'

document.title = config.seo.title
document.querySelector('meta[name="description"]')?.setAttribute('content', config.seo.description)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <FloatingCallButton />
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/services/lawn-maintenance" element={<LawnMaintenance />} />
        <Route path="/services/sod-installation" element={<SodInstallation />} />
        <Route path="/services/tree-services" element={<TreeServices />} />
        <Route path="/services/irrigation-systems" element={<IrrigationSystems />} />
        <Route path="/services/mulch-river-rock" element={<MulchRiverRock />} />
        <Route path="/services/landscaping-hardscape" element={<LandscapingHardscape />} />
        <Route path="/lawn-estimator" element={<LawnEstimator />} />
        <Route path="/lawn-health-quiz" element={<LawnHealthQuiz />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
