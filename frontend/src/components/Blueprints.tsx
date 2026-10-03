import type { ApiBike } from '../api';
import { AlertTriangle } from 'lucide-react';

export function Blueprints({
  bike,
  power,
  weight,
  total: _total
}: {
  bike: ApiBike;
  power: number;
  weight: number;
  total: number;
}) {
  const stockPower = bike.powerBhp;
  const stockWeight = bike.weightKg;
  const powerDiff = (power - stockPower).toFixed(1);
  const weightDiff = (weight - stockWeight).toFixed(1);

  return (
    <div className="know-yourself-section">
      <div className="section-head">
        <div>
          <p className="eyebrow amber">SECTION 06 / 09 · KNOW YOURSELF — BEFORE VS AFTER</p>
          <h2>Side-by-Side Diagnostic Dashboard</h2>
          <p className="subtitle">Select STOCK bike (left) and CUSTOM BUILD (right) to compare all parameters.</p>
        </div>
      </div>

      <div className="side-by-side-grid">
        {/* ORIGINAL STOCK COLUMN */}
        <div className="diag-column stock-column">
          <div className="column-header">
            <span className="column-tag">ORIGINAL STOCK</span>
            <h3>{bike.brand} {bike.model}</h3>
          </div>

          <div className="parameter-group">
            <label>AESTHETIC</label>
            <p>Factory lines, upright geometry, stock fender</p>
          </div>

          <div className="parameter-group">
            <label>ENGINE</label>
            <p>349cc Single EFI (Factory Spec)</p>
          </div>

          <div className="parameter-group">
            <label>MAX POWER</label>
            <p>{stockPower} bhp @ 6100rpm</p>
          </div>

          <div className="parameter-group">
            <label>MAX TORQUE</label>
            <p>27 Nm @ 4000rpm</p>
          </div>

          <div className="parameter-group">
            <label>KERB WEIGHT</label>
            <p>{stockWeight} kg</p>
          </div>

          <div className="parameter-group">
            <label>SEAT HEIGHT</label>
            <p>800 mm</p>
          </div>

          <div className="parameter-group">
            <label>FUEL ECONOMY</label>
            <p>35–38 km/l</p>
          </div>

          <div className="parameter-group">
            <label>EXHAUST</label>
            <p>Stock muffler</p>
          </div>

          <div className="parameter-group">
            <label>HANDLEBAR</label>
            <p>Flat bar — upright</p>
          </div>

          <div className="parameter-group">
            <label>TAIL</label>
            <p>Full stock fender + reflector</p>
          </div>

          <div className="parameter-group">
            <label>BRAKING</label>
            <p>ABS, stock rubber lines</p>
          </div>
        </div>

        {/* MODIFIED BUILD COLUMN */}
        <div className="diag-column modified-column">
          <div className="column-header">
            <span className="column-tag cyan">MODIFIED BUILD</span>
            <h3>Cafe Racer AI Plan</h3>
          </div>

          <div className="parameter-group">
            <label>AESTHETIC</label>
            <p>Clip-ons, tail tidy, low aggressive stance</p>
          </div>

          <div className="parameter-group">
            <label>ENGINE</label>
            <p>349cc — unchanged core</p>
          </div>

          <div className="parameter-group">
            <label>MAX POWER</label>
            <p className="pos">
              {power} bhp <span className="delta-pill">+{powerDiff} bhp (ECU + exhaust)</span>
            </p>
          </div>

          <div className="parameter-group">
            <label>MAX TORQUE</label>
            <p className="pos">
              29.4 Nm <span className="delta-pill">+2.4 Nm (exhaust + remap)</span>
            </p>
          </div>

          <div className="parameter-group">
            <label>KERB WEIGHT</label>
            <p className="pos">
              {weight} kg <span className="delta-pill">{weightDiff} kg (fender elim + pegs)</span>
            </p>
          </div>

          <div className="parameter-group">
            <label>SEAT HEIGHT</label>
            <p>800 mm — unchanged</p>
          </div>

          <div className="parameter-group">
            <label>FUEL ECONOMY</label>
            <p className="neg">
              31–34 km/l <span className="delta-pill neg-pill">−4 km/l (lean AFR)</span>
            </p>
          </div>

          <div className="parameter-group">
            <label>EXHAUST</label>
            <p>Short slip-on — aggressive note</p>
          </div>

          <div className="parameter-group">
            <label>HANDLEBAR</label>
            <p>Clip-ons — cafe position</p>
          </div>

          <div className="parameter-group">
            <label>TAIL</label>
            <p>Fender eliminator + twin LED</p>
          </div>

          <div className="parameter-group">
            <label>BRAKING</label>
            <p>Braided lines — 30% better feel</p>
          </div>
        </div>
      </div>

      {/* TRADE-OFF WARNINGS BANNER */}
      <div className="trade-off-banner">
        <div className="banner-title">
          <AlertTriangle size={18} className="warn-icon" />
          <span>TRADE-OFF WARNINGS (displayed in Know Yourself)</span>
        </div>
        <div className="warning-list">
          <span className="warning-chip">Fuel economy −4 km/l</span>
          <span className="bullet">•</span>
          <span className="warning-chip">Increased engine heat from lean AFR</span>
          <span className="bullet">•</span>
          <span className="warning-chip">ECU remap required after free-flow exhaust install</span>
        </div>
      </div>
    </div>
  );
}
