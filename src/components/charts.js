"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Charts({ regionData, farmingData }) {
    
  const pieData = [
    { name: 'Farming Noise', value: farmingData?.farming || 0 },
    { name: 'Organic Discussion', value: farmingData?.organic || 0 }
  ];
  
  
  const COLORS = ['#f97316', '#4ade80']; 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      
      {}
      <div className="p-6 bg-[#111] border border-fuchsia-500/20 rounded-2xl shadow-[0_0_15px_rgba(217,70,239,0.1)] hover:border-fuchsia-500/40 transition-all duration-300">
        <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef]"></div>
          Global Pulse (Top Regions)
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart data={regionData}>
              {/* Ini rahasia bikin gradasi di grafiknya Bang */}
              <defs>
                <linearGradient id="colorSuleyman" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#d946ef" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#d946ef" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(217,70,239,0.4)', borderRadius: '8px' }} 
                itemStyle={{ color: '#fff' }} 
                cursor={{ fill: '#d946ef', opacity: 0.1 }}
              />
              <Bar dataKey="chat" fill="url(#colorSuleyman)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {}
      <div className="p-6 bg-[#111] border border-orange-500/20 rounded-2xl shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:border-orange-500/40 transition-all duration-300">
        <h2 className="text-sm font-black text-orange-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
          Community Vibe (#discussion)
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(249,115,22,0.4)', borderRadius: '8px' }} 
                itemStyle={{ color: '#fff' }} 
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#9ca3af' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}