import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './LawnEstimator.css'

const ZONE_LABELS = ['Front yard', 'Back yard', 'Side yard', 'Zone 4', 'Zone 5', 'Zone 6', 'Zone 7', 'Zone 8']

function getRecommendation(sqft) {
  if (sqft < 3000) return { plan: 'Basic Maintenance', price: `$${Math.round(sqft * 0.05)}–$${Math.round(sqft * 0.08)}` }
  if (sqft < 6000) return { plan: 'Standard Package', price: `$${Math.round(sqft * 0.05)}–$${Math.round(sqft * 0.08)}` }
  if (sqft < 10000) return { plan: 'Premium Package', price: `$${Math.round(sqft * 0.05)}–$${Math.round(sqft * 0.08)}` }
  return { plan: 'Custom Quote', price: 'Contact us' }
}

export default function LawnEstimator() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const drawingManager = useRef(null)
  const polygonsRef = useRef([])
  const autocompleteRef = useRef(null)
  const searchInputRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [zones, setZones] = useState([])
  const [mapReady, setMapReady] = useState(false)

  const totalSqft = zones.reduce((sum, z) => sum + z.sqft, 0)
  const result = zones.length > 0 ? { sqft: totalSqft, ...getRecommendation(totalSqft) } : null

  // Wait for Google Maps to fully load via callback
  useEffect(() => {
    if (window.__gmapsReady && window.google && window.google.maps && window.google.maps.places) {
      setMapReady(true)
      return
    }
    const check = setInterval(() => {
      if (window.__gmapsReady && window.google && window.google.maps && window.google.maps.places && window.google.maps.drawing) {
        clearInterval(check)
        setMapReady(true)
      }
    }, 150)
    return () => clearInterval(check)
  }, [])

  const recalcAll = useCallback(() => {
    const updated = polygonsRef.current.map((p, i) => {
      const area = google.maps.geometry.spherical.computeArea(p.getPath())
      return { label: ZONE_LABELS[i] || `Zone ${i + 1}`, sqft: Math.round(area * 10.7639) }
    })
    setZones(updated)
  }, [])

  // Initialize map once ready
  useEffect(() => {
    if (!mapReady || !mapRef.current || mapInstance.current) return

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 36.7468, lng: -119.7726 },
      zoom: 15,
      mapTypeId: 'satellite',
      tilt: 0,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })
    mapInstance.current = map

    const dm = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: false,
      polygonOptions: {
        fillColor: '#7ab800',
        fillOpacity: 0.35,
        strokeColor: '#a0d400',
        strokeWeight: 2,
        editable: true,
      },
    })
    dm.setMap(map)
    drawingManager.current = dm

    google.maps.event.addListener(dm, 'polygoncomplete', (polygon) => {
      polygonsRef.current.push(polygon)
      dm.setDrawingMode(null)
      setDrawing(false)
      recalcAll()

      google.maps.event.addListener(polygon.getPath(), 'set_at', recalcAll)
      google.maps.event.addListener(polygon.getPath(), 'insert_at', recalcAll)
    })

    if (searchInputRef.current) {
      const ac = new google.maps.places.Autocomplete(searchInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      })
      ac.bindTo('bounds', map)
      ac.addListener('place_changed', () => {
        const place = ac.getPlace()
        if (place.geometry && place.geometry.location) {
          map.setCenter(place.geometry.location)
          map.setZoom(20)
        }
      })
      autocompleteRef.current = ac
    }
  }, [mapReady, recalcAll])

  const startDrawing = () => {
    setDrawing(true)
    if (drawingManager.current) {
      drawingManager.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
    }
  }

  const resetAll = () => {
    polygonsRef.current.forEach((p) => p.setMap(null))
    polygonsRef.current = []
    if (drawingManager.current) {
      drawingManager.current.setDrawingMode(null)
    }
    setZones([])
    setDrawing(false)
  }

  return (
    <>
      <Navbar />

      <section className="le-hero">
        <div className="container">
          <h1 className="le-hero__title">Lawn Size Estimator</h1>
          <p className="le-hero__sub">Draw your lawn on the map and get an instant size estimate with pricing.</p>
          <div className="le-steps">
            <div className="le-step">
              <span className="le-step__num">1</span>
              <span className="le-step__text">Enter your address</span>
            </div>
            <div className="le-step">
              <span className="le-step__num">2</span>
              <span className="le-step__text">Draw your lawn</span>
            </div>
            <div className="le-step">
              <span className="le-step__num">3</span>
              <span className="le-step__text">Get your estimate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="le-tool">
        <div className="container">
          <div className="le-controls">
            <div className="le-search">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Enter your address..."
                className="le-search__input"
              />
            </div>
            <div className="le-actions">
              {!drawing && (
                <button className="le-btn le-btn--draw" onClick={startDrawing} disabled={!mapReady}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>
                  {zones.length === 0 ? 'Draw My Lawn' : 'Add Another Zone'}
                </button>
              )}
              {drawing && (
                <button className="le-btn le-btn--reset" onClick={() => { setDrawing(false); drawingManager.current?.setDrawingMode(null) }}>Cancel</button>
              )}
              {zones.length > 0 && !drawing && (
                <button className="le-btn le-btn--reset" onClick={resetAll}>Reset All</button>
              )}
            </div>
          </div>

          {drawing && (
            <div className="le-hint">
              Click points around your {zones.length === 0 ? 'lawn' : 'next zone'} to draw its outline. Click the starting point to close the shape.
            </div>
          )}

          <div ref={mapRef} className="le-map" />

          {result && (
            <div className="le-result">
              <div className="le-result__card">
                <div className="le-result__header">Your Lawn Estimate</div>

                {zones.length > 1 && (
                  <div className="le-result__zones">
                    {zones.map((z, i) => (
                      <div key={i} className="le-result__zone">
                        <span className="le-result__zone-label">{z.label}:</span>
                        <span className="le-result__zone-sqft">{z.sqft.toLocaleString()} sq ft</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="le-result__sqft">
                  {zones.length > 1 && <span className="le-result__total-label">Total: </span>}
                  {result.sqft.toLocaleString()} sq ft
                </div>

                <div className="le-result__plan">
                  <span className="le-result__plan-label">Recommended:</span>
                  <span className="le-result__plan-name">{result.plan}</span>
                </div>
                {result.plan !== 'Custom Quote' ? (
                  <div className="le-result__price">
                    <span className="le-result__price-label">Estimated range:</span>
                    <span className="le-result__price-value">{result.price}</span>
                    <span className="le-result__price-note">per service visit</span>
                  </div>
                ) : (
                  <div className="le-result__price">
                    <span className="le-result__price-value">Large property — contact us for custom pricing</span>
                  </div>
                )}
                <Link to="/estimate" className="le-result__cta">Get My Exact Quote →</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
