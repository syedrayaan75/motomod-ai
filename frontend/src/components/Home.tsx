import { useState, useEffect } from 'react';
import type { View } from '../App';
import { FEATURED_BUILDS, type FeaturedBuild } from '../data/mockData';
import { Sparkles, ChevronRight, Zap, Cpu, Flame, Disc, Shield, Compass, Wrench } from 'lucide-react';

export function Home({ setView, startBuild: _startBuild }: { setView: (view: View) => void; startBuild: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedBuildModal, setSelectedBuildModal] = useState<FeaturedBuild | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % FEATURED_BUILDS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const brands = [
    { name: 'Royal Enfield', badge: 'RE' },
    { name: 'KTM', badge: 'KTM' },
    { name: 'Honda', badge: 'HONDA' },
    { name: 'Bajaj', badge: 'BAJAJ' },
    { name: 'Yamaha', badge: 'YAMAHA' },
    { name: 'TVS', badge: 'TVS' },
    { name: 'Kawasaki', badge: 'KW' },
    { name: 'BMW', badge: 'BMW' },
    { name: 'Triumph', badge: 'TR' },
    { name: 'Harley-Davidson', badge: 'HD' }
  ];

  const componentsGateway = [
    { id: 'EXHAUST', label: 'Exhaust', icon: Flame, desc: 'Slip-ons & headers' },
    { id: 'BODY', label: 'Body & Styling', icon: Shield, desc: 'Fenders & clip-ons' },
    { id: 'BRAKES', label: 'Brakes', icon: Disc, desc: 'Lines & discs' },
    { id: 'LIGHTS', label: 'Lighting', icon: Zap, desc: 'LED Halos & Tail tidies' },
    { id: 'SUSP.', label: 'Suspension', icon: Compass, desc: 'Gas shocks & forks' },
    { id: 'ENGINE', label: 'Engine & ECU', icon: Cpu, desc: 'Maps & intake' }
  ];

  return (
    <div className="homepage-container">
      {/* UPPER DECK: INSPIRATION CAROUSEL */}
      <section className="upper-deck">
        <div className="deck-header">
          <p className="eyebrow amber">UPPER DECK — INSPIRATION SHOWCASE</p>
          <h2>Featured AI Builds</h2>
        </div>

        <div className="panoramic-carousel">
          <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {FEATURED_BUILDS.map((build, index) => (
              <div key={build.id} className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}>
                <div className="slide-content">
                  <div className="slide-badge">
                    {build.isFeatured && <span className="featured-tag">FEATURED</span>}
                    <span className="style-tag">{build.style}</span>
                  </div>
                  <h3>{build.title}</h3>
                  <p className="base-bike">Chassis: <strong>{build.baseBike}</strong></p>
                  <p className="build-prompt-preview">"{build.prompt}"</p>
                  <div className="price-tag">₹{build.costInr.toLocaleString('en-IN')}</div>
                  <button className="primary open-build-btn" onClick={() => setSelectedBuildModal(build)}>
                    Inspect AI Config <Sparkles size={14} />
                  </button>
                </div>
                <div className="slide-image-wrapper">
                  <img src={build.imageUrl} alt={build.title} />
                  <div className="overlay-gradient" />
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots">
            {FEATURED_BUILDS.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LOWER DECK: NAVIGATION GRID */}
      <section className="lower-deck">
        {/* Track 1: Brand Matrix */}
        <div className="brand-matrix-section">
          <div className="section-title">
            <span className="track-no">TRACK 1</span>
            <h3>BRAND MATRIX</h3>
          </div>
          <div className="brand-grid">
            {brands.map(b => (
              <button 
                key={b.name} 
                className="brand-tile"
                onClick={() => setView('chassis')}
              >
                <div className="brand-badge">{b.badge}</div>
                <span>{b.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Track 2: Component Gateway */}
        <div className="component-gateway-section">
          <div className="section-title">
            <span className="track-no">TRACK 2</span>
            <h3>COMPONENT GATEWAY</h3>
          </div>
          <div className="gateway-grid">
            {componentsGateway.map(comp => {
              const Icon = comp.icon;
              return (
                <button
                  key={comp.id}
                  className="gateway-tile"
                  onClick={() => setView('armory')}
                >
                  <Icon className="gateway-icon" />
                  <h4>{comp.label}</h4>
                  <small>{comp.desc}</small>
                  <div className="jump-link">Explore catalogue <ChevronRight size={12} /></div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUILD CONFIG MODAL */}
      {selectedBuildModal && (
        <div className="build-modal-overlay" onClick={() => setSelectedBuildModal(null)}>
          <div className="build-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="eyebrow amber">{selectedBuildModal.style.toUpperCase()}</span>
                <h2>{selectedBuildModal.title}</h2>
                <p>Base Chassis: <strong>{selectedBuildModal.baseBike}</strong></p>
              </div>
              <button className="close-btn" onClick={() => setSelectedBuildModal(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="prompt-box">
                <label>AI GENERATION PROMPT</label>
                <p>"{selectedBuildModal.prompt}"</p>
              </div>

              <div className="parts-list-box">
                <label>ITEMIZED PARTS LIST</label>
                <ul>
                  {selectedBuildModal.partsList.map((part, i) => (
                    <li key={i}><Wrench size={12} /> {part}</li>
                  ))}
                </ul>
              </div>

              <div className="cost-summary">
                <span>ESTIMATED BUILD COST:</span>
                <strong>₹{selectedBuildModal.costInr.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button className="primary" onClick={() => { setSelectedBuildModal(null); setView('workshop'); }}>
                Load into Custom AI <Sparkles size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
