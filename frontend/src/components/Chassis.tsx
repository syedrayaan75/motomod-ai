import { useState } from 'react';
import { BIKES_DATABASE, type BikeSpec } from '../data/mockData';

// BIKE_IMAGES MAP WITH CORRECTED LOCAL FILENAMES
const BIKE_IMAGES: Record<string, string | null> = {
  // Royal Enfield
  "Hunter 350": "/bikes/hunter350.jpg",
  "Classic 350": "/bikes/classic350.jpg",
  "Bullet 350": "/bikes/bullet350.jpg",
  "Meteor 350": "/bikes/meteor350.jpg",
  "Continental GT 650": "/bikes/gt650.jpg",
  "Interceptor 650": "/bikes/interceptor650.jpg",
  "Himalayan 452": "/bikes/himalayan452.jpg",
  "Himalayan": "/bikes/himalayan.jpg",
  "Guerrilla 450": null,
  "Shotgun 650": null,
  "Super Meteor 650": "/bikes/supermeteo650.jpg",

  // KTM
  "Duke 390": "/bikes/duke390.jpg",
  "Duke 250": "/bikes/duke250.jpg",
  "Duke 200": "/bikes/duke200.jpg",
  "RC 390": "/bikes/rc390.jpg",
  "RC 200": "/bikes/rc200.jpg",
  "390 Adventure": "/bikes/adv390.jpg",
  "250 Adventure": "/bikes/adventure250.jpg",

  // Honda
  "CB300R": "/bikes/cb300r.jpg",
  "CB350 H'ness": "/bikes/cb350_hness.jpg",
  "CB350RS": "/bikes/cb350rs.jpg",
  "CBR650R": "/bikes/cbr650r.jpg",
  "NX500": "/bikes/nx500.jpg",

  // Bajaj
  "Dominar 400": "/bikes/dominar400.jpg",
  "Pulsar NS400Z": "/bikes/pulsarns400z.jpg",
  "Pulsar NS200": "/bikes/pulsar_ns200.jpg",
  "Pulsar N250": "/bikes/pulsar_n250.jpg",

  // Yamaha
  "MT-15 V2": "/bikes/mt15.jpg",
  "R15 V4": "/bikes/r15_v4.jpg",
  "MT-03": "/bikes/mt03.jpg",

  // TVS
  "Apache RR 310": "/bikes/apache_rr310.jpg",
  "Apache RTR 310": "/bikes/apache_rtr310.jpg",
  "Ronin 225": "/bikes/ronin225.jpg",

  // Kawasaki
  "Ninja 400": "/bikes/ninja400.jpg",
  "Z900": "/bikes/z900.jpg",
  "Ninja ZX-4RR": "/bikes/zx4rr.jpg",

  // BMW
  "G 310 R": "/bikes/g310r.jpg",
  "G 310 GS": "/bikes/g310gs.jpg",
  "S 1000 RR": "/bikes/s1000rr.jpg",

  // Triumph
  "Speed 400": "/bikes/speed400.jpg",
  "Scrambler 400X": null,
  "Street Triple 765 R": null,

  // Harley-Davidson
  "X440": null,
  "Nightster 975": null
};

export function Chassis({
  startBuild,
  selectedBike
}: {
  startBuild: (bike: BikeSpec) => void;
  selectedBike?: BikeSpec | any | null;
}) {
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [modalBike, setModalBike] = useState<BikeSpec | null>(null);

  const brands = [
    'ALL',
    'Royal Enfield',
    'KTM',
    'Honda',
    'Bajaj',
    'Yamaha',
    'TVS',
    'Kawasaki',
    'BMW',
    'Triumph',
    'Harley-Davidson'
  ];

  const getBrandCount = (brand: string) => {
    if (brand === 'ALL') return BIKES_DATABASE.length;
    return BIKES_DATABASE.filter(b => b.brand === brand).length;
  };

  const filteredBikes = selectedBrand === 'ALL'
    ? BIKES_DATABASE
    : BIKES_DATABASE.filter(b => b.brand === selectedBrand);

  return (
    <div className="section-container active">
      <div className="chassis-header">
        <h2 className="title-cyan">CHASSIS & MOTORCYCLE CATALOG</h2>
        <p className="subtitle-gray">Browse verified Indian market motorcycles. Select a chassis to initialize custom AI modification.</p>

        {/* Floating Brand Filter Pills (No outer box) */}
        <div className="navy-filter-container">
          {brands.map(brand => {
            const isAll = brand === 'ALL';
            const count = getBrandCount(brand);
            const isActive = selectedBrand === brand;

            return (
              <button
                key={brand}
                className={`navy-filter-pill ${isAll ? 'all-pill' : ''} ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand)}
              >
                <span className="pill-brand-text">{brand}</span>
                {isAll ? (
                  <span className="pill-badge-circle">{count}</span>
                ) : (
                  <sup className="pill-count-sup">{count}</sup>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DEEP NAVY 3-COLUMN SHOWCASE GRID */}
      <div className="chassis-deep-grid">
        {filteredBikes.map(bike => {
          const isSelected = selectedBike?.id === bike.id;
          const imgSrc = BIKE_IMAGES[(bike as any).name] ?? BIKE_IMAGES[bike.model] ?? null;

          return (
            <div
              key={bike.id}
              className={`navy-bike-card ${isSelected ? 'selected' : ''}`}
            >
              {/* Top Row: Brand Label & Price Badge */}
              <div className="navy-card-header">
                <div>
                  <span className="navy-brand-label">{bike.brand}</span>
                  <h3 className="navy-bike-name">{bike.model}</h3>
                </div>
                <div className="navy-price-badge">{bike.priceExShowroom}</div>
              </div>

              {/* Local Public Motorcycle Photo Box */}
              <div className="navy-img-container">
                {imgSrc ? (
                  <>
                    <img
                      src={imgSrc}
                      alt={`${bike.brand} ${bike.model}`}
                      className="navy-bike-img"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div className="styled-bike-placeholder" style={{ display: 'none' }}>
                      <div className="placeholder-icon">🏍️</div>
                      <div className="placeholder-brand">{bike.brand}</div>
                      <div className="placeholder-model">{bike.model}</div>
                    </div>
                  </>
                ) : (
                  <div className="styled-bike-placeholder">
                    <div className="placeholder-icon">🏍️</div>
                    <div className="placeholder-brand">{bike.brand}</div>
                    <div className="placeholder-model">{bike.model}</div>
                  </div>
                )}

                {/* Style Category Badge */}
                {bike.bestFor && (
                  <span className="navy-style-badge">
                    {bike.bestFor}
                  </span>
                )}
              </div>

              {/* 2-Column Specs Grid */}
              <div className="navy-specs-grid">
                {bike.engineCc ? (
                  <div className="navy-spec-cell">
                    <span className="spec-lbl">Displacement</span>
                    <span className="spec-val">{bike.engineCc} cc</span>
                  </div>
                ) : null}

                {bike.powerBhp ? (
                  <div className="navy-spec-cell">
                    <span className="spec-lbl">Max Power</span>
                    <span className="spec-val">{bike.powerBhp} bhp</span>
                  </div>
                ) : null}

                {bike.torqueNm ? (
                  <div className="navy-spec-cell">
                    <span className="spec-lbl">Max Torque</span>
                    <span className="spec-val">{bike.torqueNm} Nm</span>
                  </div>
                ) : null}

                {bike.weightKg ? (
                  <div className="navy-spec-cell">
                    <span className="spec-lbl">Kerb Weight</span>
                    <span className="spec-val">{bike.weightKg} kg</span>
                  </div>
                ) : null}

                {bike.stockFuelEconomyKmL ? (
                  <div className="navy-spec-cell">
                    <span className="spec-lbl">Avg Mileage</span>
                    <span className="spec-val">{bike.stockFuelEconomyKmL} km/l</span>
                  </div>
                ) : null}

                {bike.seatHeightMm ? (
                  <div className="navy-spec-cell">
                    <span className="spec-lbl">Seat Height</span>
                    <span className="spec-val">{bike.seatHeightMm} mm</span>
                  </div>
                ) : null}
              </div>

              {/* Buttons: Full Width Stack */}
              <div className="navy-btn-stack">
                <button
                  className="btn-navy-outline"
                  onClick={() => setModalBike(bike)}
                >
                  FULL SPECS
                </button>
                <button
                  className={`btn-navy-gradient ${isSelected ? 'active' : ''}`}
                  onClick={() => startBuild(bike)}
                >
                  {isSelected ? '✓ CHASSIS SELECTED' : 'SELECT CHASSIS'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL SPECS MODAL */}
      {modalBike && (
        <div className="modal-overlay" onClick={() => setModalBike(null)}>
          <div className="modal-content-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="navy-brand-label">{modalBike.brand}</span>
                <h3 className="navy-bike-name">{modalBike.model}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setModalBike(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-price-tag">{modalBike.priceExShowroom}</div>
              <div className="modal-deep-grid">
                <div className="deep-row"><strong>Transmission:</strong> {modalBike.deepDive.transmission}</div>
                <div className="deep-row"><strong>Chassis Frame:</strong> {modalBike.deepDive.chassis}</div>
                <div className="deep-row"><strong>Braking Setup:</strong> {modalBike.deepDive.braking}</div>
                <div className="deep-row"><strong>Stock Tyres:</strong> {modalBike.deepDive.tyres}</div>
                <div className="deep-row"><strong>Electricals & Display:</strong> {modalBike.deepDive.electricals}</div>
              </div>
              <div className="tags-list">
                {modalBike.deepDive.compatibilityTags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-navy-gradient"
                onClick={() => {
                  startBuild(modalBike);
                  setModalBike(null);
                }}
              >
                SELECT {modalBike.model.toUpperCase()} CHASSIS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
