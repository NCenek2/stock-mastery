import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Users & Modules
app.get('/api/lessons', async (req, res) => {
  const modules = await prisma.module.findMany({ 
    orderBy: { order: 'asc' },
    include: {
      lessons: { orderBy: { order: 'asc' } }
    }
  });
  console.log("FIRST LESSON INTERACTIVE FROM PRISMA:", modules[0]?.lessons[0]?.interactive);
  res.json(modules);
});

app.get('/api/user', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { username: "student" } });
  res.json(user);
});

// Mock Price Generator based on Ticker
const getMockPrice = (symbol: string, dateOffset: number = 0) => {
  const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const basePrice = (seed % 900) + 10; // Between 10 and 910
  const volatility = (seed % 50) + 10; // 10% to 60%
  // Add some sinus wave depending on dateOffset to simulate trends
  const trend = Math.sin(dateOffset / 10) * volatility;
  const variation = Math.cos(seed * dateOffset) * (volatility / 2);
  let finalPrice = basePrice + trend + variation;
  if(finalPrice < 1) finalPrice = 1;
  return Number(finalPrice.toFixed(2));
};

app.get('/api/history/:symbol', (req, res) => {
  const { symbol } = req.params;
  const data = [];
  const now = new Date();
  
  // Last 30 days
  for(let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().split('T')[0],
      price: getMockPrice(symbol.toUpperCase(), 30 - i)
    });
  }
  
  res.json(data);
});

app.get('/api/quote/:symbol', (req, res) => {
  const { symbol } = req.params;
  const price = getMockPrice(symbol.toUpperCase(), 30);
  // Add slight trend indicator
  const previous = getMockPrice(symbol.toUpperCase(), 29);
  const trend = price > previous ? "UP" : "DOWN";
  res.json({ symbol: symbol.toUpperCase(), price, trend, change: Number((price - previous).toFixed(2)) });
});

// Portfolio
app.get('/api/portfolio', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { username: "student" } });
  if(!user) return res.status(404).json({ error: "User not found" });
  
  const portfolio = await prisma.portfolioItem.findMany({ where: { userId: user.id } });
  res.json({ balance: user.balance, portfolio });
});

app.post('/api/trade', async (req, res) => {
  const { symbol, shares, type } = req.body;
  
  if(!symbol || typeof shares !== 'number' || (type !== 'BUY' && type !== 'SELL') || shares <= 0) {
    return res.status(400).json({ error: "Invalid trade parameters" });
  }

  const user = await prisma.user.findUnique({ where: { username: "student" } });
  if(!user) return res.status(404).json({ error: "User not found" });

  const price = getMockPrice(symbol.toUpperCase(), 30);
  const totalCost = Number((price * shares).toFixed(2));

  try {
    const result = await prisma.$transaction(async (tx) => {
      let portfolioItem = await tx.portfolioItem.findFirst({
        where: { userId: user.id, symbol: symbol.toUpperCase() }
      });

      if(type === 'BUY') {
        if(user.balance < totalCost) throw new Error("Insufficient funds");
        
        await tx.user.update({
          where: { id: user.id },
          data: { balance: { decrement: totalCost } }
        });

        if(portfolioItem) {
          const newShares = portfolioItem.shares + shares;
          const newAvg = ((portfolioItem.shares * portfolioItem.avgPrice) + totalCost) / newShares;
          await tx.portfolioItem.update({
            where: { id: portfolioItem.id },
            data: { shares: newShares, avgPrice: Number(newAvg.toFixed(2)) }
          });
        } else {
          await tx.portfolioItem.create({
            data: {
              userId: user.id,
              symbol: symbol.toUpperCase(),
              shares,
              avgPrice: price
            }
          });
        }
      } else if (type === 'SELL') {
        if(!portfolioItem || portfolioItem.shares < shares) {
           throw new Error("Insufficient shares");
        }

        await tx.user.update({
          where: { id: user.id },
          data: { balance: { increment: totalCost } }
        });

        const newShares = portfolioItem.shares - shares;
        if(newShares === 0) {
          await tx.portfolioItem.delete({ where: { id: portfolioItem.id } });
        } else {
          await tx.portfolioItem.update({
            where: { id: portfolioItem.id },
            data: { shares: newShares }
          });
        }
      }

      await tx.transaction.create({
        data: {
          userId: user.id,
          symbol: symbol.toUpperCase(),
          type,
          shares,
          price
        }
      });
      
      const updatedUser = await tx.user.findUnique({ where: { id: user.id } });
      return { success: true, message: `Successfully ${type.toLowerCase()}ed ${shares} shares of ${symbol.toUpperCase()}`, balance: updatedUser?.balance };
    });
    res.json(result);
  } catch (error: any) {
     res.status(400).json({ error: error.message || "Trade failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
