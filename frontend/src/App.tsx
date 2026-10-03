import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { compileBuild, getMyBuilds, getParts, setToken, type ApiBike, type ApiPart, type Rider, type SavedBuild, getBuild } from './api';
import { LoginPage } from './components/LoginPage';
import { Home } from './components/Home';
import { RealGarage } from './components/RealGarage';
import { Chassis } from './components/Chassis';
import { Armory } from './components/Armory';
import { Workshop } from './components/Workshop';
import { Blueprints } from './components/Blueprints';
import { Syndicate } from './components/Syndicate';
import { Network } from './components/Network';
import { AuthModal } from './components/AuthModal';

export type View = 'auth' | 'home' | 'garage' | 'chassis' | 'armory' | 'workshop' | 'blueprints' | 'syndicate' | 'network';
export type Part = { id: number; name: string; brand: string; category: string; price: number; power: number; weight: number; compatible: boolean; imageUrl?: string };

export const defaultBike: ApiBike = {
  id: 1,
  brand: 'Royal Enfield',
  model: 'Hunter 350',
  year: 2024,
  style: 'Cafe · Tracker',
  powerBhp: 20.2,
  weightKg: 181,
  imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
};

const nav: { id: View; label: string; icon: string }[] = [
  { id: 'auth', label: 'Login / Register', icon: '⬢' },
  { id: 'home', label: 'Homepage', icon: '⌂' },
  { id: 'workshop', label: 'Custom AI', icon: '✦' },
  { id: 'chassis', label: 'Bikes', icon: '◈' },
  { id: 'armory', label: 'Equipment', icon: '◇' },
  { id: 'blueprints', label: 'Know Yourself', icon: '▦' },
  { id: 'syndicate', label: 'Family', icon: '◉' },
  { id: 'garage', label: 'My Garage', icon: '▣' },
  { id: 'network', label: 'Shops & Mechanics', icon: '⌖' },
];

function App() {
  // START AT 'auth' LOGIN PAGE FIRST
  const [view, setView] = useState<View>('auth');
  const [selected, setSelected] = useState<Part[]>([]);
  const [prompt, setPrompt] = useState('Build an aggressive cafe racer with loud slip-on and clip-ons.');
  const [buildName, setBuildName] = useState('Cafe Racer AI Plan');
  const [compiled, setCompiled] = useState(false);
  const [toast, setToast] = useState('');
  const [rider, setRider] = useState<Rider | null>(() => {
    const stored = localStorage.getItem('motomod-rider');
    return stored ? JSON.parse(stored) as Rider : null;
  });
  const [authOpen, setAuthOpen] = useState(false);
  const [bike, setBike] = useState<ApiBike>(defaultBike);
  const [apiParts, setApiParts] = useState<ApiPart[]>([]);
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('motomod-token');
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    if (!rider) { setSavedBuilds([]); return; }
    getMyBuilds().then(setSavedBuilds).catch(() => setSavedBuilds([]));
  }, [rider]);

  useEffect(() => {
    getParts(bike.id, category === 'All' ? undefined : category).then(setApiParts).catch(() => notify('Could not load parts from the server.'));
  }, [bike.id, category]);

  const total = useMemo(() => selected.reduce((sum, part) => sum + part.price, 0), [selected]);
  const power = useMemo(() => selected.reduce((sum, part) => sum + part.power, bike.powerBhp), [selected, bike]);
  const weight = useMemo(() => selected.reduce((sum, part) => sum + part.weight, bike.weightKg), [selected, bike]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const addPart = (part: Part) => {
    if (!part.compatible) return notify(`Fitment blocked: this part is not compatible with your selected ${bike.model}.`);
    setSelected(current => current.some(item => item.id === part.id) ? current.filter(item => item.id !== part.id) : [...current, part]);
  };

  const startBuild = () => { setView('armory'); notify(`${bike.brand} ${bike.model} selected. Add compatible equipment next.`); };

  const beginBuild = () => {
    if (selected.length > 0 && !window.confirm('This will clear your current build selection. Are you sure?')) return;
    setSelected([]); setCompiled(false); setView('chassis'); notify('Choose a chassis to start a new build.');
  };

  const loadBuild = async (id: string) => {
    try {
      const build = await getBuild(id);
      const partsForBike = await getParts(build.bikeId);
      setBike(build.bike);
      setSelected(partsForBike.filter(p => build.partIds.includes(p.id)).map(p => ({ ...p, power: p.powerGainBhp, weight: p.weightChangeKg, compatible: true })));
      setBuildName(build.name);
      setPrompt(build.prompt);
      setView('workshop'); notify(`Loaded build: ${build.name}`);
    } catch { notify('Could not load the selected build.'); }
  };

  const completeAuthentication = (token: string, user: Rider) => {
    localStorage.setItem('motomod-token', token);
    localStorage.setItem('motomod-rider', JSON.stringify(user));
    setToken(token);
    setRider(user);
    setAuthOpen(false);
    setView('home'); // Directly route to homepage upon successful login
    notify(`Welcome to MotoMod AI, ${user.displayName}.`);
  };

  const compile = async () => {
    if (!rider) return setAuthOpen(true);
    if (!selected.length) return notify('Add at least one compatible component from Equipment before compiling.');
    try {
      await compileBuild({ bikeId: bike.id, partIds: selected.map(p => p.id), prompt, name: buildName });
      setCompiled(true);
      setSavedBuilds(await getMyBuilds());
      setView('garage');
      notify('Blueprint saved to My Garage. Compatibility validated.');
    } catch (error) {
      notify('Could not compile the build. Saved to local session.');
      console.error(error);
    }
  };

  // 1. DEDICATED FULL-PAGE LOGIN PAGE VIEW
  if (view === 'auth') {
    return (
      <LoginPage
        onLoginSuccess={completeAuthentication}
        onGuestAccess={() => {
          setView('home');
          notify('Entered garage in Guest Mode.');
        }}
      />
    );
  }

  // 2. MAIN APP SHELL AFTER LOGIN / GUEST ACCESS
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo"><b>M</b><span>MOTOMOD<small>AI</small></span></div>
        <div className="profile">
          <div className="avatar">{rider ? rider.displayName.slice(0, 2).toUpperCase() : 'SR'}</div>
          <div>
            <strong>{rider ? rider.displayName : 'Guest Rider'}</strong>
            <small>{rider ? `${rider.role} • LEVEL 12` : 'UNAUTHENTICATED'}</small>
          </div>
        </div>
        <nav>
          {nav.map(item => (
            <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}>
              <i>{item.icon}</i>{item.label}
            </button>
          ))}
        </nav>
        <div className="side-footer">
          <span className="online" /> Systems nominal<br/>
          <small>v0.1 • India / IST</small>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <p className="eyebrow">
              {view === 'home' ? 'MOTOMOD AI / BUILD. CUSTOMIZE. DOMINATE.' : `SECTION / ${nav.find(n => n.id === view)?.label.toUpperCase()}`}
            </p>
            <h1>
              {view === 'home' ? `Build the machine you imagine${rider ? `, ${rider.displayName.split(' ')[0]}` : ''}.` : nav.find(n => n.id === view)?.label}
            </h1>
          </div>
          <div className="header-actions">
            <button className="icon-button">⌕</button>
            <button className="icon-button">♧<sup>3</sup></button>
            {rider ? (
              <button className="profile-button" onClick={() => {
                localStorage.removeItem('motomod-token');
                localStorage.removeItem('motomod-rider');
                setToken();
                setRider(null);
                setView('auth'); // Sign out returns to login page
                notify('You have been signed out.');
              }}>
                {rider.displayName} · Sign out
              </button>
            ) : (
              <button className="outline auth-trigger" onClick={() => setView('auth')}>
                Login / Register
              </button>
            )}
            <button className="primary" onClick={beginBuild}>Start a build</button>
          </div>
        </header>

        {view === 'home' && <Home setView={setView} startBuild={beginBuild} />}
        {view === 'garage' && <RealGarage setView={setView} startBuild={beginBuild} total={total} builds={savedBuilds} loadBuild={loadBuild} />}
        {view === 'chassis' && <Chassis startBuild={startBuild} selectedBike={bike} />}
        {view === 'armory' && <Armory selected={selected} onAdd={addPart} liveParts={apiParts} category={category} setCategory={setCategory} />}
        {view === 'workshop' && <Workshop bike={bike} selected={selected} prompt={prompt} setPrompt={setPrompt} buildName={buildName} setBuildName={setBuildName} compiled={compiled} compile={compile} total={total} power={power} weight={weight} />}
        {view === 'blueprints' && <Blueprints bike={bike} power={power} weight={weight} total={total} />}
        {view === 'syndicate' && <Syndicate />}
        {view === 'network' && <Network notify={notify} />}
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onSuccess={completeAuthentication} />}
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  );
}

export default App;
