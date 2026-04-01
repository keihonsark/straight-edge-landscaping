import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import About from '../components/About'
import StatsCounter from '../components/StatsCounter'
import Services from '../components/Services'
import AllServices from '../components/AllServices'
import BeforeAfter from '../components/BeforeAfter'
import EstimatorBanner from '../components/EstimatorBanner'
import PhotoStrip from '../components/PhotoStrip'
import Reviews from '../components/Reviews'
import QuizBanner from '../components/QuizBanner'
import TrustBadges from '../components/TrustBadges'
import CtaBanner from '../components/CtaBanner'
import ServiceAreas from '../components/ServiceAreas'
import BlogPreview from '../components/BlogPreview'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import useFadeUp from '../hooks/useFadeUp'

export default function Home() {
  useFadeUp()

  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <StatsCounter />
      <Services />
      <AllServices />
      <BeforeAfter />
      <EstimatorBanner />
      <PhotoStrip />
      <Reviews />
      <QuizBanner />
      <TrustBadges />
      <CtaBanner />
      <ServiceAreas />
      <BlogPreview />
      <Contact />
      <Footer />
    </>
  )
}
