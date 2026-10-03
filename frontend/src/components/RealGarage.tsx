import type { View } from '../App';
import type { SavedBuild } from '../api';
import { PARTS_DATABASE } from '../data/mockData';
import { Trash2, Send, Sliders } from 'lucide-react';

export function RealGarage({
  setView,
  startBuild: _startBuild,
  total,
  builds,
  loadBuild
}: {
  setView: (view: View) => void;
  startBuild: () => void;
  total: number;
  builds: SavedBuild[];
  loadBuild: (id: string) => void;
}) {
  const partsLocker = PARTS_DATABASE.slice(0, 4);

  return (
    <div className="my-garage-section">
      <div className="section-head">
        <div>
          <p className="eyebrow amber">SECTION 08 / 09 · MY GARAGE (CART & INVENTORY)</p>
          <h2>Saved Builds & Parts Locker</h2>
        </div>
      </div>

      <div className="garage-bays-grid">
        {/* BAY 1 — SAVED BUILDS */}
        <div className="garage-bay bay-1">
          <div className="bay-header">
            <span className="eyebrow amber">BAY 1</span>
            <h3>SAVED BUILDS</h3>
          </div>

          <div className="saved-builds-list">
            <div className="build-card-item">
              <div className="build-info">
                <span className="setup-name">SETUP NAME: <strong>Cafe Racer AI Plan</strong></span>
                <span className="chassis-name">Chassis: Royal Enfield Hunter 350</span>

                <div className="parts-summary-box">
                  <label>PARTS LIST INCLUDED:</label>
                  <ul>
                    <li>• Fender Eliminator / Tail Tidy</li>
                    <li>• Clip-On Handlebars</li>
                    <li>• Shorty Slip-On Exhaust</li>
                    <li>• Stage-1 ECU Flash / Fuel Map</li>
                  </ul>
                </div>

                <div className="build-total">
                  <span>TOTAL COST (INR):</span>
                  <strong>₹{total ? total.toLocaleString('en-IN') : '12,450'}</strong>
                </div>
              </div>

              <div className="build-card-actions">
                <button className="shortcut-btn" onClick={() => setView('blueprints')}>
                  <Sliders size={14} /> Know Yourself Link
                </button>
              </div>
            </div>

            {builds.map(b => (
              <div key={b.id} className="build-card-item">
                <div className="build-info">
                  <span className="setup-name">SETUP NAME: <strong>{b.name}</strong></span>
                  <span className="chassis-name">Chassis: {b.bike} ({b.modelYear})</span>
                  <div className="build-total">
                    <span>TOTAL COST (INR):</span>
                    <strong>₹{b.totalCost.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                <button className="primary" onClick={() => loadBuild(b.id)}>
                  Load Build →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BAY 2 — PARTS LOCKER */}
        <div className="garage-bay bay-2">
          <div className="bay-header">
            <span className="eyebrow cyan">BAY 2</span>
            <h3>PARTS LOCKER</h3>
          </div>

          <div className="parts-locker-container">
            <label className="locker-label">PARTS BY CATEGORY (STANDALONE CARTED PARTS):</label>

            <div className="carted-parts-list">
              {partsLocker.map(part => (
                <div key={part.id} className="locker-item">
                  <div className="part-meta">
                    <span className="cat-badge">{part.category}</span>
                    <strong>{part.name}</strong>
                    <small>₹{part.priceInr.toLocaleString('en-IN')}</small>
                  </div>

                  <div className="orbit-controls">
                    <span className="orbit-access-tag">Orbit Access: Ready</span>
                    <button className="remove-btn" title="Remove part">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SEND BLUEPRINT TO LOCAL SHOP CTA */}
            <div className="blueprint-cta-box">
              <p>Routes complete garage inventory to Shops & Mechanics for labor quotes</p>
              <button className="primary send-blueprint-btn" onClick={() => setView('network')}>
                SEND BLUEPRINT TO LOCAL SHOP <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
