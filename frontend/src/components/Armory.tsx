import { useState } from 'react';
import type { ApiPart } from '../api';
import type { Part } from '../App';
import { PARTS_DATABASE, type PartSpec } from '../data/mockData';
import { Search, Plus, Check } from 'lucide-react';

export function Armory({
  selected,
  onAdd,
  liveParts: _liveParts,
  category,
  setCategory
}: {
  selected: Part[];
  onAdd: (part: Part) => void;
  liveParts: ApiPart[];
  category: string;
  setCategory: (cat: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBikeFilter, setSelectedBikeFilter] = useState('Hunter 350');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('All');

  const categories = ['All', 'BODY', 'ENGINE', 'EXHAUST', 'LIGHTS', 'BRAKES', 'SUSP.'];

  const partBrands = [
    'All',
    'Akrapovič',
    'Yoshimura',
    'Red Rooster Performance',
    'Powertronic',
    'BMC Filters',
    'Öhlins',
    'YSS Suspension',
    'Brembo',
    'AutoLogue Design',
    'HEL Performance',
    'Motogadget',
    'Woodcraft'
  ];

  const filteredParts = PARTS_DATABASE.filter(part => {
    const matchesCategory = category === 'All' || category === 'All components' || part.category === category;
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          part.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFitment = selectedBikeFilter === 'All' || 
                           part.compatibleBikes.includes('Universal') || 
                           part.compatibleBikes.includes(selectedBikeFilter);
    const matchesBrand = selectedBrandFilter === 'All' || part.brand.toLowerCase() === selectedBrandFilter.toLowerCase();
    return matchesCategory && matchesSearch && matchesFitment && matchesBrand;
  });

  const getDifficultyBadge = (diff: PartSpec['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return <span className="diff-badge easy">● Easy</span>;
      case 'Medium':
        return <span className="diff-badge medium">●● Medium</span>;
      case 'Hard / Expert':
        return <span className="diff-badge hard">●●● Hard / Expert</span>;
      default:
        return null;
    }
  };

  const isPartSelected = (partId: number) => {
    return selected.some(p => p.id === partId);
  };

  return (
    <div className="equipment-catalogue-section">
      <div className="section-head">
        <div>
          <p className="eyebrow amber">SECTION 05 / 09 · EQUIPMENT — PARTS CATALOGUE (10+ BRAND EDITION)</p>
          <h2>Parts Catalogue & Fitment Lock</h2>
        </div>
      </div>

      {/* TOP CONTROLS: SEARCH, FITMENT LOCK, BRAND & CATEGORY SORT */}
      <div className="catalogue-controls-grid">
        {/* 01 Global Search */}
        <div className="control-card">
          <span className="card-num">01</span>
          <h4>Global Search</h4>
          <div className="search-input-wrapper">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search by part or brand..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 02 Fitment Lock */}
        <div className="control-card">
          <span className="card-num">02</span>
          <h4>Fitment Lock (Bike Model)</h4>
          <select
            className="fitment-select"
            value={selectedBikeFilter}
            onChange={e => setSelectedBikeFilter(e.target.value)}
          >
            <option value="Hunter 350">Royal Enfield Hunter 350</option>
            <option value="Classic 350">Royal Enfield Classic 350</option>
            <option value="Continental GT 650">Royal Enfield Continental GT 650</option>
            <option value="Duke 390">KTM Duke 390</option>
            <option value="RC 390">KTM RC 390</option>
            <option value="CB300R">Honda CB300R</option>
            <option value="CB350 H'ness">Honda CB350 H'ness</option>
            <option value="Dominar 400">Bajaj Dominar 400</option>
            <option value="NS400Z">Bajaj Pulsar NS400Z</option>
            <option value="MT-15 V2">Yamaha MT-15 V2</option>
            <option value="R15 V4">Yamaha R15 V4</option>
            <option value="Apache RR 310">TVS Apache RR 310</option>
            <option value="Ronin 225">TVS Ronin 225</option>
            <option value="Ninja 400">Kawasaki Ninja 400</option>
            <option value="Z900">Kawasaki Z900</option>
            <option value="G 310 R">BMW G 310 R</option>
            <option value="S 1000 RR">BMW S 1000 RR</option>
            <option value="Speed 400">Triumph Speed 400</option>
            <option value="X440">Harley-Davidson X440</option>
            <option value="All">Show All Bikes</option>
          </select>
        </div>

        {/* 03 Filter by Aftermarket Brand */}
        <div className="control-card">
          <span className="card-num">03</span>
          <h4>Aftermarket Brand</h4>
          <select
            className="fitment-select"
            value={selectedBrandFilter}
            onChange={e => setSelectedBrandFilter(e.target.value)}
          >
            {partBrands.map(b => (
              <option key={b} value={b}>{b === 'All' ? 'All 10+ Aftermarket Brands' : b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 04 Category Sort */}
      <div className="category-sort-bar">
        <span className="filter-label">CATEGORY:</span>
        <div className="category-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 05 LEDGER GRID TABLE */}
      <div className="ledger-grid-container">
        <div className="ledger-header">
          <span className="card-num">05</span>
          <h3>EQUIPMENT LEDGER GRID ({filteredParts.length} PARTS FOUND)</h3>
        </div>

        <table className="ledger-table">
          <thead>
            <tr>
              <th>MANUFACTURER</th>
              <th>PART NAME</th>
              <th>DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>DIFF.</th>
              <th>PRICE (INR)</th>
              <th>COMPATIBLE CHASSIS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.map(part => {
              const inCart = isPartSelected(part.id);
              const partAppFormat: Part = {
                id: part.id,
                name: part.name,
                brand: part.brand,
                category: part.category,
                price: part.priceInr,
                power: part.perfImpact.powerGainBhp,
                weight: part.perfImpact.weightDeltaKg,
                compatible: true
              };

              return (
                <tr key={part.id} className={inCart ? 'row-in-cart' : ''}>
                  <td>
                    <span className="part-brand-badge">{part.brand}</span>
                  </td>
                  <td className="part-name-cell">
                    <strong>{part.name}</strong>
                  </td>
                  <td className="part-desc-cell">{part.description}</td>
                  <td>
                    <span className={`category-tag tag-${part.category.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                      {part.category}
                    </span>
                  </td>
                  <td>{getDifficultyBadge(part.difficulty)}</td>
                  <td className="price-cell">₹{part.priceInr.toLocaleString('en-IN')}</td>
                  <td className="compat-cell">{part.compatibleBikes.join(', ')}</td>
                  <td>
                    <button
                      className={`cart-action-btn ${inCart ? 'in-cart' : ''}`}
                      onClick={() => onAdd(partAppFormat)}
                    >
                      {inCart ? (
                        <>
                          <Check size={12} /> IN GARAGE
                        </>
                      ) : (
                        <>
                          <Plus size={12} /> ADD TO BUILD
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
