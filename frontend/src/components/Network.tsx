import { useState } from 'react';
import { SERVICE_PROVIDERS } from '../data/mockData';
import { Star, MapPin, Phone, Database } from 'lucide-react';

export function Network({ notify }: { notify: (msg: string) => void }) {
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'RATING' | 'PROXIMITY'>('RATING');

  const customShops = SERVICE_PROVIDERS.filter(p => p.providerType === 'Custom Shop');
  const verifiedMechanics = SERVICE_PROVIDERS.filter(p => p.providerType === 'Verified Mechanic');

  return (
    <div className="shops-mechanics-section">
      <div className="section-head">
        <div>
          <p className="eyebrow amber">SECTION 09 / 09 · SHOPS & MECHANICS + DB SCHEMA</p>
          <h2>Local Shop & Verified Mechanic Directory</h2>
        </div>
        <button className="primary schema-btn" onClick={() => setShowSchemaModal(true)}>
          <Database size={14} /> Relational DB Schema
        </button>
      </div>

      {/* SHARED FILTER FIELDS */}
      <div className="shared-filters-bar">
        <span className="filter-label">SHARED FILTER FIELDS:</span>
        <div className="filter-controls">
          <button
            className={`filter-chip ${filterType === 'RATING' ? 'active' : ''}`}
            onClick={() => setFilterType('RATING')}
          >
            Sort by Star Rating (Verified Community Reviews)
          </button>
          <button
            className={`filter-chip ${filterType === 'PROXIMITY' ? 'active' : ''}`}
            onClick={() => setFilterType('PROXIMITY')}
          >
            Sort by Proximity (User GPS Location)
          </button>
        </div>
      </div>

      <div className="directory-split-grid">
        {/* LEFT — CUSTOM SHOPS */}
        <div className="directory-column custom-shops">
          <div className="column-header">
            <span className="eyebrow amber">LEFT — CUSTOM SHOPS</span>
            <h3>Custom Fabrication Shops</h3>
          </div>

          <div className="shops-list">
            {customShops.map(shop => (
              <div key={shop.id} className="shop-card">
                <div className="shop-title-row">
                  <h4>{shop.name}</h4>
                  <div className="rating-badge">
                    <Star size={12} fill="#FFD700" color="#FFD700" />
                    <span>{shop.starRating}</span>
                  </div>
                </div>

                <p className="location-line">
                  <MapPin size={12} /> {shop.location} ({shop.distKm} km away)
                </p>

                <div className="services-list">
                  <label>SPECIALIZED SERVICES:</label>
                  <ul>
                    {shop.specialties.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="shop-actions">
                  <button
                    className="primary quote-btn"
                    onClick={() => notify(`Labor quote request sent to ${shop.name}!`)}
                  >
                    Request Labour Quote
                  </button>
                  <button className="phone-btn" title={shop.phone}>
                    <Phone size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — VERIFIED MECHANICS */}
        <div className="directory-column verified-mechanics">
          <div className="column-header">
            <span className="eyebrow cyan">RIGHT — VERIFIED MECHANICS</span>
            <h3>Verified Mechanics</h3>
          </div>

          <div className="shops-list">
            {verifiedMechanics.map(mech => (
              <div key={mech.id} className="shop-card">
                <div className="shop-title-row">
                  <h4>{mech.name}</h4>
                  <div className="rating-badge">
                    <Star size={12} fill="#FFD700" color="#FFD700" />
                    <span>{mech.starRating}</span>
                  </div>
                </div>

                <p className="location-line">
                  <MapPin size={12} /> {mech.location} ({mech.distKm} km away)
                </p>

                <div className="services-list">
                  <label>INSTALLATION SPECIALTIES:</label>
                  <ul>
                    {mech.specialties.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="shop-actions">
                  <button
                    className="primary quote-btn"
                    onClick={() => notify(`Fitment quote request sent to ${mech.name}!`)}
                  >
                    Request Fitment Quote
                  </button>
                  <button className="phone-btn" title={mech.phone}>
                    <Phone size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RELATIONAL DATABASE SCHEMA MODAL */}
      {showSchemaModal && (
        <div className="schema-modal-overlay" onClick={() => setShowSchemaModal(false)}>
          <div className="schema-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="eyebrow amber">DATABASE SCHEMA</span>
                <h2>Relational Database Schema (6 Tables)</h2>
              </div>
              <button className="close-btn" onClick={() => setShowSchemaModal(false)}>✕</button>
            </div>

            <div className="schema-grid">
              {/* USERS TABLE */}
              <div className="schema-table-card">
                <h4>USERS TABLE</h4>
                <ul>
                  <li><span className="pk">Id (PK)</span></li>
                  <li>FullName</li>
                  <li>Email</li>
                  <li>Phone</li>
                  <li>Age</li>
                  <li>PasswordHash</li>
                  <li>CreatedAt</li>
                </ul>
              </div>

              {/* BIKES TABLE */}
              <div className="schema-table-card">
                <h4>BIKES TABLE</h4>
                <ul>
                  <li><span className="pk">Id (PK)</span></li>
                  <li>Brand</li>
                  <li>Model</li>
                  <li>Engine (cc)</li>
                  <li>Power (bhp)</li>
                  <li>Torque (Nm)</li>
                  <li>Weight (kg)</li>
                  <li>ImageUrl</li>
                </ul>
              </div>

              {/* PARTS TABLE */}
              <div className="schema-table-card">
                <h4>PARTS TABLE</h4>
                <ul>
                  <li><span className="pk">Id (PK)</span></li>
                  <li>Name</li>
                  <li>Description</li>
                  <li>Category</li>
                  <li>Price (INR)</li>
                  <li>Difficulty</li>
                  <li>CompBikesJson</li>
                  <li>PerfImpactJson</li>
                </ul>
              </div>

              {/* MODIFICATION REQUESTS TABLE */}
              <div className="schema-table-card">
                <h4>MODIFICATIONREQUESTS</h4>
                <ul>
                  <li><span className="pk">Id (PK)</span></li>
                  <li><span className="fk">UserId (FK)</span></li>
                  <li>BikeModel</li>
                  <li>Style</li>
                  <li>UserPrompt</li>
                  <li>AIResponse</li>
                  <li>Budget</li>
                  <li>RequestedAt</li>
                </ul>
              </div>

              {/* SAVED PLANS TABLE */}
              <div className="schema-table-card">
                <h4>SAVEDPLANS</h4>
                <ul>
                  <li><span className="pk">Id (PK)</span></li>
                  <li><span className="fk">UserId (FK)</span></li>
                  <li>PlanName</li>
                  <li>BikeModel</li>
                  <li>PartsJson</li>
                  <li>TotalCost</li>
                  <li>SavedAt</li>
                </ul>
              </div>

              {/* SERVICE PROVIDERS TABLE */}
              <div className="schema-table-card">
                <h4>SERVICEPROVIDERS</h4>
                <ul>
                  <li><span className="pk">Id (PK)</span></li>
                  <li>ProviderType</li>
                  <li>Name</li>
                  <li>LocationCoords</li>
                  <li>StarRating</li>
                  <li>SpecializedBikesJson</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
