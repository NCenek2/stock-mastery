import axios from 'axios';
import { Activity, AlertCircle, Compass, DollarSign, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PaperTrading = () => {
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [symbol, setSymbol] = useState("AAPL");
  const [shares, setShares] = useState(1);
  const [history, setHistory] = useState<any[]>([]);
  const [quote, setQuote] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/portfolio');
      setBalance(data.balance);
      setPortfolio(data.portfolio);
    } catch (e) { console.error(e); }
  };

  const fetchAssetData = async (ticker: string) => {
    try {
      const [{ data: hData }, { data: qData }] = await Promise.all([
        axios.get(`http://localhost:3001/api/history/${ticker}`),
        axios.get(`http://localhost:3001/api/quote/${ticker}`)
      ]);
      setHistory(hData);
      setQuote(qData);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchPortfolio();
    fetchAssetData(symbol);
    
    const interval = setInterval(() => {
       fetchAssetData(symbol);
    }, 5000); // Polling every 5 seconds for simulation
    return () => clearInterval(interval);
  }, [symbol]);

  const evaluateTrade = (type: 'BUY' | 'SELL', currentPrice: number) => {
    // Generate intelligent feedback based on recent history
    if (history.length < 2) return;
    const avg30 = history.reduce((sum, h) => sum + h.price, 0) / history.length;
    
    if (type === 'BUY') {
      if (currentPrice < avg30) {
        setFeedback("📉 GOOD BUY! The stock is trading below its 30-day average. Value investors call this a discount.");
      } else {
        setFeedback("🔥 HIGH RISK! The stock is trading above its average. Momentum trading can be risky.");
      }
    } else {
      if (currentPrice > avg30) {
        setFeedback("📈 EXCELLENT SELL! You are selling above the recent moving average, locking in a premium.");
      } else {
        setFeedback("💧 CAREFUL! Selling slightly below average might mean you're locking in a slight loss. Only do this if you fundamentally lack faith in the asset.");
      }
    }
    setTimeout(() => setFeedback(null), 8000);
  };

  const handleTrade = async (type: "BUY" | "SELL") => {
    setError(null);
    try {
      const res = await axios.post('http://localhost:3001/api/trade', { symbol, shares: Number(shares), type });
      setBalance(res.data.balance);
      fetchPortfolio();
      if(quote) evaluateTrade(type, quote.price);
    } catch (err: any) {
      setError(err.response?.data?.error || "Trade failed");
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Paper Trading</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Test your strategies with zero risk.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Trading Power</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--success)' }}>
            <DollarSign size={24} style={{ display: 'inline', verticalAlign: 'middle' }} />
            {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
      </header>

      {feedback && (
        <div className="glass-panel animate-fade-in" style={{ borderColor: 'var(--accent-glow)', background: 'rgba(59, 130, 246, 0.1)', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass color="var(--accent-color)" /> Trade Analysis
          </h3>
          <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>{feedback}</p>
        </div>
      )}

      {error && (
        <div className="glass-panel animate-fade-in" style={{ borderColor: 'rgba(239, 68, 68, 0.5)', background: 'rgba(239, 68, 68, 0.1)', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger)' }}>
            <AlertCircle /> Error
          </h3>
          <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.8)' }}>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2" style={{ gap: '30px' }}>
        {/* Left Col: Chart & Order Form */}
        <div>
          <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2>{symbol.toUpperCase()}</h2>
                {quote && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                    <h1 style={{ fontSize: '2.5rem' }}>${quote.price.toFixed(2)}</h1>
                    <span className={quote.change >= 0 ? 'text-success' : 'text-danger'} style={{ fontWeight: 'bold' }}>
                      {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)} {quote.trend === 'UP' ? '↑' : '↓'}
                    </span>
                  </div>
                )}
              </div>
              <input 
                type="text" 
                value={symbol} 
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                style={{ width: '120px', height: '40px', fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}
                placeholder="TICKER"
              />
            </div>
            
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                  <Tooltip wrapperStyle={{ outline: 'none' }} contentStyle={{ backgroundColor: '#111827', border: 'none' }} itemStyle={{ color: '#fff' }} />
                  <Area type="monotone" dataKey="price" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorHist)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel" style={{ marginTop: '30px' }}>
            <h3>Place Order</h3>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Shares</label>
                <input type="number" min="1" value={shares} onChange={(e) => setShares(Number(e.target.value))} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Est. Cost: ${quote ? (quote.price * shares).toFixed(2) : 0}</label>
                <div style={{ display: 'flex', gap: '10px', height: '45px' }}>
                  <button className="btn btn-success" style={{ flex: 1 }} onClick={() => handleTrade("BUY")}>BUY</button>
                  <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => handleTrade("SELL")}>SELL</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Portfolio */}
        <div>
          <div className="glass-panel" style={{ height: '100%' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Activity color="#8b5cf6" /> Holdings
            </h3>
            
            {portfolio.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '60px' }}>
                <TrendingUp size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
                <p>Your portfolio is currently empty.</p>
                <p>Buy your first stock to become dangerous!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {portfolio.map((item) => (
                   <div key={item.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--card-border)' }}>
                     <div>
                       <h2 style={{ margin: 0 }}>{item.symbol}</h2>
                       <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{item.shares} shares @ ${item.avgPrice.toFixed(2)}</p>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                       <p style={{ margin: 0, fontWeight: 'bold' }}>Value: ${(item.shares * item.avgPrice).toFixed(2)}</p>
                     </div>
                   </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperTrading;
