import Charts from '../components/charts';

// Paksa Vercel buat selalu ambil data fresh dari VPS tiap ada yang buka web
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "RIALO INTEL | Central Analytics",
  description: "Advanced community pulse and role promotion tracking for Rialo.",
  openGraph: {
    title: "RIALO INTEL 👁️",
    description: "Live radar 24/7 memantau Community Kings, Regional MVPs, dan promosi Club Elite di Rialo.",
    siteName: "Rialo Intel Dashboard",
    type: "website",
  }
};

export default async function RialoAutomatedDashboard() {
  let data = null;
  let errorMsg = null;

  try {
    // Tembak langsung ke IP VPS Azure lu di Port 3001
    const res = await fetch('http://104.215.180.34:3001/api/stats', { 
      cache: 'no-store',
      next: { revalidate: 0 } 
    });

    if (res.ok) {
      data = await res.json();
    } else {
      errorMsg = `Server Error: ${res.status}`;
    }
  } catch (err) {
    console.error("Gagal nembak API VPS:", err);
    errorMsg = "Koneksi ke VPS Terputus / Firewall Azure Gagal Ditembus.";
  }

  // Tampilan kalau data kosong / API mati (Biar gak blank putih)
  if (!data) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4 border border-fuchsia-500/30 p-8 rounded-2xl bg-fuchsia-500/5 shadow-[0_0_30px_rgba(217,70,239,0.1)]">
          <div className="text-5xl">⚠️</div>
          <h1 className="text-fuchsia-500 font-mono text-2xl font-bold uppercase tracking-widest">System Offline</h1>
          <p className="text-zinc-400 font-mono text-sm leading-relaxed">
            {errorMsg || "Gagal sinkronisasi dengan database Rialo di Azure."}
          </p>
          <div className="pt-4">
            <button 
              onClick="window.location.reload()" 
              className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-mono text-xs rounded-full transition-all"
            >
              RETRY CONNECTION
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { regionStats, vibeStats, topKings, regionalMVP, topLinks, newPromos } = data;

  return (
    <main className="min-h-screen bg-[#080808] text-zinc-100 p-4 md:p-10 font-mono selection:bg-fuchsia-500 selection:text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-purple-500 to-indigo-400 italic">
            RIALO INTEL
          </h1>
          <p className="text-fuchsia-500 font-bold tracking-[0.3em] uppercase text-sm mt-2">
            Current Cycle: <span className="text-white">APRIL 2026</span>
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 border border-fuchsia-500/20 rounded-full bg-fuchsia-500/5 backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
          </span>
          <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Live Sync Active</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Charts Area */}
        <div className="lg:col-span-8 space-y-6">
          <Charts regionStats={regionStats} vibeStats={vibeStats} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Community Kings */}
            <div className="bg-[#0c0c0c] border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-fuchsia-500 text-xs font-bold mb-6 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></span> Community Kings
              </h3>
              <div className="space-y-4">
                {topKings.length > 0 ? topKings.map((king, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-zinc-500 text-xs mr-2">0{i+1}</span>
                    <span className="text-zinc-300 text-sm flex-1 group-hover:text-fuchsia-400 transition-colors">{king.name}</span>
                    <span className="text-fuchsia-500/50 font-bold text-xs">{king.score} pts</span>
                  </div>
                )) : <p className="text-zinc-600 text-[10px] italic">There is no recorded data yet.</p>}
              </div>
            </div>

            {/* Regional MVPs */}
            <div className="bg-[#0c0c0c] border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-orange-500 text-xs font-bold mb-6 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Regional MVPs
              </h3>
              <div className="space-y-4">
                {regionalMVP.length > 0 ? regionalMVP.map((mvp, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-orange-500/60 text-[10px] uppercase w-8 font-bold">{mvp.category}</span>
                    <span className="text-zinc-300 text-sm flex-1 ml-2 group-hover:text-orange-400 transition-colors">{mvp.username}</span>
                  </div>
                )) : <p className="text-zinc-600 text-[10px] italic">There is no recorded data yet.</p>}
              </div>
            </div>

            {/* Top Link Contributions */}
            <div className="bg-[#0c0c0c] border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-emerald-500 text-xs font-bold mb-6 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Top Contributions
              </h3>
              <div className="space-y-4">
                {topLinks.length > 0 ? topLinks.map((link, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-zinc-300 text-sm flex-1 group-hover:text-emerald-400 transition-colors">{link.username}</span>
                    <span className="text-emerald-500/50 font-bold text-xs">{link.link_count} links</span>
                  </div>
                )) : <p className="text-zinc-600 text-[10px] italic">There is no recorded data yet.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Promotion Tracking */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0c0c0c] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-fuchsia-500">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="text-fuchsia-500">⚡</span> PROMOTION TRACKER
            </h2>

            <div className="space-y-10">
              {newPromos.map((promo, i) => (
                <div key={i} className="relative pl-6 border-l border-zinc-800">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-fuchsia-600 shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>
                  <h4 className="text-xs font-black text-fuchsia-500 tracking-tighter mb-1 uppercase italic">
                    {promo.role}
                  </h4>
                  <div className="text-3xl font-black mb-3">{promo.count}</div>
                  <p className="text-zinc-500 text-[10px] leading-relaxed font-medium">
                    {promo.list}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-500">
              <p className="flex items-center gap-2 italic">
                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                Sistem otomatis memantau kenaikan pangkat berdasarkan history role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}