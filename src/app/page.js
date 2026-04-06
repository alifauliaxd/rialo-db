import Charts from '../components/charts';

export default async function RialoAutomatedDashboard() {
  const res = await fetch('http://104.215.180.34:3001/api/stats', { cache: 'no-store' });
  
  if (!res.ok) {
    return <div className="text-fuchsia-500 p-10 font-mono text-xl bg-[#080808] min-h-screen">⚠️ Gagal konek ke API Server di Port 3001...</div>;
  }

  const data = await res.json();
  const { regionStats, vibeStats, topKings, regionalMVP, topLinks, newPromos } = data;

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 p-8 font-sans selection:bg-fuchsia-500 selection:text-white">
      <div className="max-w-7xl mx-auto">
        <header className="border-b border-fuchsia-900/40 pb-6 mb-10 flex justify-between items-end">
          <div>
            {/* Judul: Gradasi Süleyman (Community Helper) */}
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 tracking-tighter">
              RIALO INTEL
            </h1>
            <p className="text-fuchsia-400 font-mono text-xs mt-2 tracking-[0.3em] uppercase">
              Current Cycle: <span className="font-bold">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            </p>
          </div>
          <div className="hidden md:block bg-fuchsia-500/5 border border-fuchsia-500/20 px-6 py-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
              </span>
              <span className="text-xs font-mono text-fuchsia-300 uppercase tracking-widest">Live Sync Active</span>
            </div>
          </div>
        </header>

        <div className="mb-12"><Charts regionData={regionStats} farmingData={vibeStats} /></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Community Kings: Fuchsia */}
            <StatCard title="Community Kings" data={topKings} color="text-fuchsia-400" badgeBg="bg-fuchsia-500/10" suffix="Chats" />
            {/* Regional MVPs: Oranye (RCM Vibe) */}
            <StatCard title="Regional MVPs" data={regionalMVP.map(r => ({username: `${r.category.split('_')[1].toUpperCase()}: ${r.username}`, chat_count: r.max_chat}))} color="text-orange-500" badgeBg="bg-orange-500/10" suffix="Chats" />
            {/* Top Contributions: Ijo (Builder Vibe) */}
            <StatCard title="Top Contributions" data={topLinks.map(l => ({username: l.username, chat_count: l.link_count}))} color="text-green-400" badgeBg="bg-green-500/10" suffix="Links" />
        </div>

        <section className="bg-gradient-to-br from-[#111] to-[#080808] p-10 rounded-[48px] border border-gray-800 shadow-2xl relative overflow-hidden">
          {/* Aksen glow di pojokan */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/5 blur-[100px] rounded-full"></div>

          <h2 className="text-3xl font-black mb-8 text-white uppercase tracking-tighter italic relative">
            Club Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-500">Promotions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {newPromos.length > 0 ? newPromos.map((p, i) => {
              // ⚠️ Logika Warna Dinamis: Builder (Ijo), RCM (Oranye)
              const isBuilder = p.role === 'Builder';
              const titleColor = isBuilder ? 'text-green-400' : 'text-orange-500';
              const badgeStyle = isBuilder ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-orange-500/10 text-orange-500 border-orange-500/30';
              const borderHover = isBuilder ? 'hover:border-green-500/40' : 'hover:border-orange-500/40';

              return (
                <div key={i} className={`bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-3xl ${borderHover} transition-all duration-300`}>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className={`text-xl font-bold ${titleColor}`}>{p.role}</h4>
                    <span className={`border px-4 py-1 rounded-full text-[10px] font-black uppercase ${badgeStyle}`}>
                      +{p.count} Achieved
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs font-mono leading-relaxed truncate">{p.list}</p>
                </div>
              );
            }) : <p className="text-gray-600 font-mono text-sm italic">Scanning for new role achievements...</p>}
          </div>
        </section>

        {/* --- FOOTER AUTHOR --- */}
        <footer className="mt-16 pb-8 border-t border-gray-800/50 pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-400 mb-5 font-mono">
            Built with ☕ & 💻 by <span className="text-fuchsia-500 font-bold hover:text-orange-400 transition-colors">@alifauliaxd</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Tombol X / Twitter */}
            <a href="https://x.com/kaiclyde447" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white hover:scale-105 transition-all duration-300 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 hover:border-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961H5.078z"></path></svg>
              <span className="text-sm font-semibold tracking-wider">kaiclyde447</span>
            </a>

            {/* Tombol GitHub */}
            <a href="https://github.com/alifauliaxd" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white hover:scale-105 transition-all duration-300 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 hover:border-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
              <span className="text-sm font-semibold tracking-wider">alifauliaxd</span>
            </a>

            {/* Tombol Discord */}
            <a href="https://discord.com/users/alifauliaxd" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-[#5865F2] hover:scale-105 transition-all duration-300 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 hover:border-[#5865F2]/50">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path></svg>
              <span className="text-sm font-semibold tracking-wider">alifauliaxd</span>
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}

function StatCard({ title, data, color, badgeBg, suffix }) {
  return (
    <div className="bg-gray-900/30 backdrop-blur-xl p-8 rounded-[40px] border border-white/5 hover:border-white/10 transition-all">
      <h3 className={`${color} font-black mb-6 uppercase text-[10px] tracking-[0.3em] opacity-80 flex items-center gap-2`}>
        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
        {title}
      </h3>
      <div className="space-y-5">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center group">
            <span className="text-gray-400 text-sm group-hover:text-white transition-colors">@{item.username}</span>
            <span className={`${color} font-mono text-sm font-bold ${badgeBg} px-3 py-1 rounded-lg`}>
              {item.chat_count} <span className="text-[10px] opacity-60 font-normal ml-0.5">{suffix}</span>
            </span>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-gray-600 text-xs font-mono italic">There is no recorded data yet.</p>
        )}
      </div>
    </div>
  );
}