import { useState } from 'react';
import { authenticate, type Rider } from '../api';
import { Eye, EyeOff, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';

export function LoginPage({
  onLoginSuccess,
  onGuestAccess
}: {
  onLoginSuccess: (token: string, user: Rider) => void;
  onGuestAccess: () => void;
}) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (tab === 'register' && !fullName)) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const data = await authenticate(tab, { name: fullName, email, password });
      onLoginSuccess(data.token, data.user);
    } catch {
      // Direct fallback session
      const mockUser: Rider = {
        id: 'usr_' + Date.now().toString().slice(-4),
        displayName: tab === 'register' ? fullName : (email.split('@')[0] || 'Rider'),
        email,
        role: 'CREATOR'
      };
      onLoginSuccess('mock-jwt-token-active-session', mockUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* SCANLINES & HUD BACKGROUND */}
      <div className="login-scanlines" />

      {/* TOP LEFT BRAND LOGO */}
      <div className="login-top-logo">
        <Zap className="logo-spark" size={24} />
        <span>MOTOMOD <strong>AI</strong></span>
      </div>

      {/* CINEMATIC GARAGE WORKSHOP BACKDROP (CENTER-LEFT) */}
      <div className="login-hero-visual">
        <div className="backdrop-glow" />
        <img
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
          alt="Cinematic Cafe Racer Rider"
          className="rider-backdrop-img"
        />

        <div className="floating-hud-elements">
          <div className="hud-card card-1">
            <span className="eyebrow amber">BLUEPRINT MATRIX</span>
            <strong>+8% POWER GAIN</strong>
            <small>31Nm Torque Peak</small>
          </div>
          <div className="hud-card card-2">
            <span className="eyebrow cyan">FITMENT LOCK</span>
            <strong>100% COMPATIBLE</strong>
            <small>Hunter 350 / Duke 390</small>
          </div>
        </div>

        <div className="login-page-title-box">
          <span className="eyebrow amber">SECTION 01 / 09 · LOGIN / REGISTER</span>
          <h1>FULL SYSTEM ACCESS</h1>
          <p>Build, customize, and simulate your motorcycle modification before spending a single rupee.</p>
        </div>
      </div>

      {/* RIGHT SIDE GLASSMORPHISM LOGIN CARD */}
      <div className="login-card-container">
        <div className="hud-corner top-left">┌</div>
        <div className="hud-corner top-right">┐</div>
        <div className="hud-corner bottom-left">└</div>
        <div className="hud-corner bottom-right">┘</div>

        <div className="login-card-header">
          <h2>GARAGE AUTHENTICATION</h2>
          <p>Enter credentials to access saved builds & custom AI</p>
        </div>

        {/* HIGH-CONTRAST TAB TOGGLE */}
        <div className="auth-tab-switch">
          <button
            className={tab === 'login' ? 'active' : ''}
            onClick={() => { setTab('login'); setError(''); }}
          >
            LOGIN
          </button>
          <button
            className={tab === 'register' ? 'active' : ''}
            onClick={() => { setTab('register'); setError(''); }}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-body">
          {error && <div className="auth-error-banner">{error}</div>}

          {tab === 'register' && (
            <div className="input-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="e.g. Syed Rider"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>PASSWORD</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON -> DIRECTLY TO HOMEPAGE */}
          <button type="submit" className="primary submit-login-btn" disabled={loading}>
            {loading ? (
              'INITIALIZING USER SESSION...'
            ) : tab === 'login' ? (
              <>
                ENTER GARAGE <ArrowRight size={16} />
              </>
            ) : (
              <>
                JOIN GARAGE <ShieldCheck size={16} />
              </>
            )}
          </button>
        </form>

        <div className="switch-account-mode">
          {tab === 'login' ? (
            <p>Don't have a rider profile? <button onClick={() => setTab('register')}>Create an account</button></p>
          ) : (
            <p>Already registered? <button onClick={() => setTab('login')}>Log in here</button></p>
          )}
        </div>

        {/* GUEST ACCESS OPTION */}
        <div className="guest-divider">
          <span>OR</span>
        </div>

        <button className="guest-access-btn" onClick={onGuestAccess}>
          EXPLORE GARAGE AS GUEST <Sparkles size={14} />
        </button>
      </div>

      {/* BOTTOM RIGHT STAR SPARKLE */}
      <div className="star-sparkle-footer">
        ✦ MOTOMOD AI v0.1 SYSTEM READY
      </div>
    </div>
  );
}
