import { useState } from 'react';
import type { ApiBike } from '../api';
import type { Part } from '../App';
import { BIKES_DATABASE } from '../data/mockData';
import { Sparkles, Cpu, ShieldCheck, RefreshCw } from 'lucide-react';

export function Workshop({
  bike,
  selected,
  prompt,
  setPrompt,
  buildName,
  setBuildName,
  compile,
  total,
  power,
  weight
}: {
  bike: ApiBike;
  selected: Part[];
  prompt: string;
  setPrompt: (value: string) => void;
  buildName: string;
  setBuildName: (value: string) => void;
  compiled: boolean;
  compile: () => void;
  total: number;
  power: number;
  weight: number;
}) {
  const [selectedStyle, setSelectedStyle] = useState<string>('Cafe racer');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [selectedBaseBikeModel, setSelectedBaseBikeModel] = useState(bike.model);

  const styleKeywords = ['Cafe racer', 'Scrambler', 'Game themed', 'Vinyl wrap', 'Bobber', 'Streetfighter', 'Cyberpunk'];

  const handleAiCompile = () => {
    setIsAiProcessing(true);
    setTimeout(() => {
      setIsAiProcessing(false);
      compile();
    }, 1200);
  };

  const powerDelta = (power - bike.powerBhp).toFixed(1);
  const weightDelta = (weight - bike.weightKg).toFixed(1);

  return (
    <div className="custom-ai-section">
      {/* STEP-BY-STEP COMPILATION FLOW BAR */}
      <div className="ai-compilation-flow">
        <div className="flow-step completed">
          <span className="step-num">01</span>
          <span className="step-label">Select Bike</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step completed">
          <span className="step-num">02</span>
          <span className="step-label">Pick Style</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step active">
          <span className="step-num">03</span>
          <span className="step-label">Write Prompt</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step highlight">
          <span className="step-num">04</span>
          <span className="step-label">■ Compile</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className={`flow-step ${isAiProcessing ? 'active' : ''}`}>
          <span className="step-num">05</span>
          <span className="step-label">AI Processing</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <span className="step-num">06</span>
          <span className="step-label">Parts + Cost</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <span className="step-num">07</span>
          <span className="step-label">Save Plan</span>
        </div>
      </div>

      <div className="custom-ai-split">
        {/* LEFT — VISUAL CONSTRUCTOR */}
        <div className="visual-constructor-panel">
          <div className="panel-header">
            <span className="eyebrow amber">LEFT — VISUAL CONSTRUCTOR</span>
            <h3>Orbit Fitment Node</h3>
          </div>

          <div className="orbit-canvas-container">
            <div className="scanlines" />

            {/* Orbit rings */}
            <div className="orbit-ring outer-ring" />
            <div className="orbit-ring inner-ring" />

            {/* Central Bike Node */}
            <div className="central-bike-node">
              <div className="node-glow" />
              <div className="bike-icon-wrapper">
                <span className="bike-icon">🏍️</span>
                <span className="node-label">{bike.brand} {bike.model}</span>
              </div>
            </div>

            {/* Orbiting Satellite Part Nodes */}
            {selected.length > 0 ? (
              selected.map((part, index) => {
                const angle = (index / selected.length) * 360;
                const radius = 120;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={part.id}
                    className="satellite-node"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    <span className="satellite-icon">⚙️</span>
                    <span className="satellite-title">{part.name}</span>
                  </div>
                );
              })
            ) : (
              <div className="satellite-empty-hint">
                <span>No parts loaded in orbit. Select equipment from Armory.</span>
              </div>
            )}
          </div>

          {/* Compatibility & Net Performance Delta Check */}
          <div className="fitment-delta-card">
            <div className="fitment-status">
              <ShieldCheck className="icon-green" size={16} />
              <span>Part-to-part fitment: <strong>COMPATIBLE</strong></span>
            </div>
            <div className="delta-metrics">
              <div className="delta-stat">
                <label>NET POWER DELTA</label>
                <span className={Number(powerDelta) >= 0 ? 'pos' : 'neg'}>
                  {Number(powerDelta) >= 0 ? `+${powerDelta}` : powerDelta} bhp
                </span>
              </div>
              <div className="delta-stat">
                <label>WEIGHT DELTA</label>
                <span className={Number(weightDelta) <= 0 ? 'pos' : 'neg'}>
                  {Number(weightDelta) <= 0 ? `${weightDelta}` : `+${weightDelta}`} kg
                </span>
              </div>
              <div className="delta-stat">
                <label>PARTS TOTAL</label>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — VISIONARY PROMPT */}
        <div className="visionary-prompt-panel">
          <div className="panel-header">
            <span className="eyebrow cyan">RIGHT — VISIONARY PROMPT</span>
            <h3>Natural Language Builder</h3>
          </div>

          <div className="form-section">
            <label className="field-label">ASSIGN BASE MOTORCYCLE</label>
            <select
              className="bike-select-dropdown"
              value={selectedBaseBikeModel}
              onChange={e => setSelectedBaseBikeModel(e.target.value)}
            >
              {BIKES_DATABASE.map(b => (
                <option key={b.id} value={b.model}>
                  {b.brand} {b.model} ({b.engineCc}cc)
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label className="field-label">BLUEPRINT TITLE</label>
            <input
              type="text"
              className="title-input"
              value={buildName}
              onChange={e => setBuildName(e.target.value)}
              placeholder="e.g. Midnight Protocol Cafe"
            />
          </div>

          <div className="form-section">
            <label className="field-label">FREE-TEXT PROMPT CANVAS</label>
            <textarea
              className="prompt-textarea"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your vision (e.g., Aggressive low stance cafe racer with loud slip-on and clip-ons)..."
            />
          </div>

          <div className="form-section">
            <label className="field-label">STYLE KEYWORDS</label>
            <div className="style-chips">
              {styleKeywords.map(style => (
                <button
                  key={style}
                  className={`chip ${selectedStyle === style ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* AI ENGINE INTEGRATION BADGE */}
          <div className="ai-engine-badge">
            <Cpu size={14} />
            <span>MODEL: <strong>claude-sonnet-4-6 / gemini-3.6-flash</strong></span>
            <small>System prompt: motorcycle modification expert</small>
          </div>

          {/* COMPILE BUTTON */}
          <button
            className="primary compile-btn"
            onClick={handleAiCompile}
            disabled={isAiProcessing}
          >
            {isAiProcessing ? (
              <>
                <RefreshCw className="spin" size={16} /> COMPILING BLUEPRINT...
              </>
            ) : (
              <>
                COMPILE & SAVE BLUEPRINT <Sparkles size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
