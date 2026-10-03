import { useState } from 'react';
import { FEATURED_BUILDS, type FeaturedBuild } from '../data/mockData';
import { Heart, MessageSquare, Sparkles, Upload, ShieldCheck, ThumbsUp } from 'lucide-react';

export function Syndicate() {
  const [feed, setFeed] = useState<FeaturedBuild[]>(FEATURED_BUILDS);
  const [sortOrder, setSortOrder] = useState<'most' | 'least'>('most');
  const [likedBuilds, setLikedBuilds] = useState<Record<number, boolean>>({});

  // Contender pit form state
  const [riderName, setRiderName] = useState('');
  const [riderAge, setRiderAge] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedBuildImport, setSelectedBuildImport] = useState('Cafe Racer AI Plan');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const toggleLike = (id: number) => {
    setLikedBuilds(prev => ({ ...prev, [id]: !prev[id] }));
    setFeed(prev =>
      prev.map(item => {
        if (item.id === id) {
          const isLiked = likedBuilds[id];
          return { ...item, likes: isLiked ? item.likes - 1 : item.likes + 1 };
        }
        return item;
      })
    );
  };

  const sortedFeed = [...feed].sort((a, b) => {
    return sortOrder === 'most' ? b.likes - a.likes : a.likes - b.likes;
  });

  const handleSubmitContender = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riderName || !mobileNumber) return;
    const newBuild: FeaturedBuild = {
      id: Date.now(),
      title: `${selectedBuildImport} by ${riderName}`,
      style: 'Custom Build',
      baseBike: 'Hunter 350',
      costInr: 15400,
      imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      prompt: 'Custom community contender submission',
      partsList: ['Fender Eliminator', 'Clip-on Handlebars', 'Stage 1 ECU'],
      likes: 1,
      commentsCount: 0,
      author: riderName,
      authorAge: Number(riderAge) || 25,
      authorPhone: mobileNumber
    };
    setFeed([newBuild, ...feed]);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
    setRiderName('');
    setMobileNumber('');
  };

  return (
    <div className="family-community-section">
      <div className="section-head">
        <div>
          <p className="eyebrow amber">SECTION 07 / 09 · FAMILY (COMMUNITY SOCIAL)</p>
          <h2>Spectator Lounge & Contender Pit</h2>
        </div>
      </div>

      <div className="family-split-grid">
        {/* LEFT — SPECTATOR LOUNGE */}
        <div className="spectator-lounge">
          <div className="lounge-header">
            <span className="eyebrow amber">LEFT — SPECTATOR LOUNGE</span>
            <h3>Community Feed</h3>

            <div className="sort-buttons">
              <button
                className={sortOrder === 'most' ? 'active' : ''}
                onClick={() => setSortOrder('most')}
              >
                Most Liked
              </button>
              <button
                className={sortOrder === 'least' ? 'active' : ''}
                onClick={() => setSortOrder('least')}
              >
                Least Liked
              </button>
            </div>
          </div>

          <div className="feed-cards">
            {sortedFeed.map(build => (
              <div key={build.id} className="feed-build-card">
                <div className="build-card-image">
                  <img src={build.imageUrl} alt={build.title} />
                  <span className="ai-specs-badge">
                    <Sparkles size={12} /> AI SPECS
                  </span>
                </div>

                <div className="build-card-content">
                  <div className="meta-line">
                    <span className="author-tag">{build.author}</span>
                    <span className="chassis-tag">{build.baseBike}</span>
                  </div>

                  <h4>{build.title}</h4>
                  <p className="prompt-quote">"{build.prompt}"</p>

                  <div className="card-footer">
                    <div className="cost-tag">₹{build.costInr.toLocaleString('en-IN')}</div>

                    <div className="action-buttons">
                      <button
                        className={`like-btn ${likedBuilds[build.id] ? 'liked' : ''}`}
                        onClick={() => toggleLike(build.id)}
                      >
                        <Heart size={14} fill={likedBuilds[build.id] ? '#FF4500' : 'none'} />
                        <span>{build.likes}</span>
                      </button>

                      <button className="comment-btn">
                        <MessageSquare size={14} />
                        <span>{build.commentsCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — CONTENDER PIT */}
        <div className="contender-pit">
          <div className="pit-header">
            <span className="eyebrow cyan">RIGHT — CONTENDER PIT</span>
            <h3>Publish Your Custom Build</h3>
          </div>

          {submittedSuccess && (
            <div className="success-banner">
              <ShieldCheck size={16} />
              <span>Build published successfully to community feed!</span>
            </div>
          )}

          <form onSubmit={handleSubmitContender} className="contender-form">
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Rider profile — required for submission"
                value={riderName}
                onChange={e => setRiderName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>AGE</label>
              <input
                type="number"
                placeholder="Required field — stored in Users table"
                value={riderAge}
                onChange={e => setRiderAge(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>MOBILE NUMBER</label>
              <input
                type="text"
                placeholder="Verified phone — prevents bot activity"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>BUILD UPLOAD</label>
              <select
                className="build-select"
                value={selectedBuildImport}
                onChange={e => setSelectedBuildImport(e.target.value)}
              >
                <option value="Cafe Racer AI Plan">Import from Custom section: Cafe Racer AI Plan</option>
                <option value="Scrambler Outlaw">Import from Custom section: Scrambler Outlaw</option>
                <option value="Minimalist Bobber 350">Import from Custom section: Minimalist Bobber 350</option>
              </select>
            </div>

            <div className="upload-box">
              <Upload size={20} />
              <span>Or drag & drop photo attachments</span>
            </div>

            <button type="submit" className="primary submit-build-btn">
              SUBMIT TO COMMUNITY FEED <ThumbsUp size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
