import axios from 'axios';
import { Award, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [marketTrends, setMarketTrends] = useState<any[]>([]);

  useEffect(() => {
    // Fetch user and sample market trend data
    axios.get('http://localhost:3001/api/user').then(res => setUser(res.data));
    
    // Fetch mock history for the SPY index fund to show general market trend
    axios.get('http://localhost:3001/api/history/SPY').then(res => setMarketTrends(res.data));
  }, []);

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Welcome back, <span className="text-gradient">Student</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Ready to conquer the market today?</p>
      </header>
      
      <div className="grid grid-cols-2" style={{ marginBottom: '40px' }}>
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Available Balance</p>
              <h2 style={{ fontSize: '3rem' }}>
                ${user ? user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </h2>
            </div>
            <Award size={64} color="var(--accent-glow)" />
          </div>
        </div>
        
        <div className="glass-panel">
          <h3>Market Overview (SPY)</h3>
          <div style={{ height: '120px', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketTrends}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Your Learning Journey</h2>
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>Course Progress</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You've completed {user?.progress || 0} lessons so far.</p>
        </div>
        <Link to="/lessons">
          <button className="btn btn-primary">
            <Play size={18} /> Continue Learning
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
