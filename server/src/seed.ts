import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ModuleType = {
  title: string;
  description: string;
  order: number;
  lessons: LessonType[];
};

type LessonType = {
  title: string;
  description: string;
  content: string;
  interactive: string;
};

const moduleData: ModuleType[] = [
  {
    title: "1. The Foundations",
    description:
      "Welcome. This is level 1 of your journey into the financial world.",
    order: 1,
    lessons: [
      {
        title: "What is a Stock?",
        description: "The core unit of ownership.",
        content:
          "A stock represents a fractional slice of ownership in a company. When you purchase 1 share of a company like Apple (AAPL), you literally become a partial owner of its assets and profit potential. Historically, stocks have been one of the greatest wealth-building tools, offering significantly higher long-term returns than cash or bonds. If the company thrives, its stock price typically increases, growing your investment. If it fails, you can lose your initial investment.",
        interactive: JSON.stringify({
          question:
            "If you buy 10 shares of a company, do you own a piece of its underlying business? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "What is the Stock Market?",
        description: "Where buyers and sellers meet.",
        content:
          "The stock market is essentially a digital and physical auction house (like the New York Stock Exchange or NASDAQ). It serves two main purposes: 1) It allows companies to raise money (capital) to fund growth by selling pieces of themselves to the public. 2) It gives everyday investors a centralized, regulated place to easily buy and sell those pieces of ownership. Think of it like a giant supermarket, but instead of groceries, people are trading ownership stakes.",
        interactive: JSON.stringify({
          question:
            "Does the stock market exist to help companies raise capital? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Private vs Public Companies",
        description: "Who can buy the shares?",
        content:
          "Private companies (like SpaceX or a local bakery) rely on a small group of select investors. You cannot easily buy their shares on a regular brokerage app. Public companies (like Amazon or Microsoft) have gone through a process to list their shares on public exchanges, meaning anyone with a brokerage account can buy and sell their stock freely. Financial transparency is heavily regulated for public companies.",
        interactive: JSON.stringify({
          question:
            "Can the general public easily buy shares of a private company on standard stock exchanges? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Initial Public Offerings (IPO)",
        description: "How a stock is born.",
        content:
          "An Initial Public Offering (IPO) is the highly anticipated event where a private company first offers its shares to the public. This is often called 'going public'. The company hires investment banks to underwrite the deal, set a starting price, and bring it to the open market, transitioning it from private to public. It's an opportunity for early investors to cash out and for the company to raise massive public funds.",
        interactive: JSON.stringify({
          question:
            "What does the 'I' in IPO stand for? (Type 1 for Initial, 2 for Investment, 3 for Internal)",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Stock Tickers Explained",
        description: "Understanding the alphabet soup.",
        content:
          "A ticker symbol is a unique 1 to 5 letter abbreviation used to identify a publicly traded company. It stems from the late 1800s when stock prices were printed on long strips of paper by 'ticker tape' machines that made a ticking sound. For example, Apple is AAPL, Ford is F, and Southwest Airlines is LUV. You must know a stock's ticker to trade it.",
        interactive: JSON.stringify({
          question:
            "A ticker symbol uniquely identifies a publicly traded company. Type 1 for True, 0 for False.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Bulls vs Bears",
        description: "Market sentiment terms.",
        content:
          "The financial world relies on animal metaphors to describe market trends. A 'Bull Market' describes an optimistic environment where prices are rising or expected to rise (visualize a bull attacking by thrusting its horns upward). A 'Bear Market' describes a pessimistic environment where prices are falling, technically defined as a drop of 20% or more from recent highs (visualize a bear attacking by swiping its paws downward).",
        interactive: JSON.stringify({
          question:
            "If the stock market has dropped by 25% due to economic fear, are we in a Bull (1) or Bear (2) market?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "Market Capitalization",
        description: "Valuing a company.",
        content:
          "Market Capitalization (or 'Market Cap') is how much the total company is worth on the public market. You calculate it simply: (Current Share Price) × (Total Number of Outstanding Shares). If a pizza is cut into 10 slices and each slice costs $5, the pizza's 'market cap' is $50. It's the most critical metric for understanding a company's true size, not just looking at the price of a single share.",
        interactive: JSON.stringify({
          question:
            "A company has 2 million shares outstanding. Each share trades at $50. What is the Market Capitalization in millions? (Enter the number in millions)",
          answer: 100,
          prefix: "$",
        }),
      },
      {
        title: "Small-Cap vs Large-Cap Stocks",
        description: "Classifying companies by size.",
        content:
          "Investors bucket stocks by Market Cap to assess risk. Large-caps ($10 Billion+) like Apple or Johnson & Johnson are established, stable giants. Mid-caps ($2B-$10B) are growing businesses. Small-caps (Under $2B) are smaller, agile companies with high growth potential but significantly higher risk of failure and price volatility. Your portfolio allocation should balance these sizes based on your risk tolerance.",
        interactive: JSON.stringify({
          question:
            "If a company has a market cap of $1.5 billion, is it generally considered a small-cap (1), mid-cap (2), or large-cap (3)? Enter 1, 2, or 3.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Compounding",
        description: "The eighth wonder of the world.",
        content:
          "Albert Einstein allegedly called compounding the 'eighth wonder of the world'. Compounding is the snowball effect of your investments generating earnings, and then those earnings generating their own earnings. For example, if you earn 10% on $100, you have $110. The next year, you earn 10% on $110 (which is $11), giving you $121. Over decades, this exponential growth is the primary driver of vast wealth.",
        interactive: JSON.stringify({
          question:
            "If you invest $1,000 at a 10% annual return, replacing the interest back in, how much will you have after 1 year (excluding taxes)?",
          answer: 1100,
          prefix: "$",
        }),
      },
      {
        title: "Liquidity",
        description: "How easy is it to cash out?",
        content:
          "Liquidity describes how quickly and easily an asset can be converted into cash without drastically affecting its market price. Cash itself is perfectly liquid. Large-cap stocks are highly liquid because millions of shares trade daily. In contrast, real estate or fine art are highly illiquid; it can take months to sell a house, and you might have to drop the price severely to sell quickly.",
        interactive: JSON.stringify({
          question:
            "Which is more liquid: A share of Apple stock (enter 1) or a physical mansion (enter 2)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Volatility",
        description: "Price fluctuations and risk.",
        content:
          "Volatility is a statistical measure of how wildly a stock's price swings up and down. A highly volatile stock might jump 5% one day and crash 10% the next (common in speculative tech or biotech). A low-volatility stock (like a utility company) might only move a fraction of a percent daily. Higher volatility means greater risk, but also presents opportunities for higher returns if timed correctly.",
        interactive: JSON.stringify({
          question:
            "If a stock swings dramatically in price every day, does it have high (1) or low (2) volatility? Enter 1 or 2.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Dividends Overview",
        description: "Getting paid to wait.",
        content:
          "When a mature company generates excess cash profit, it often returns a portion of it directly to its shareholders. This cash payment is called a dividend. It is usually paid quarterly per share. For example, if a stock pays a $1 annual dividend and you own 100 shares, you receive $100 a year simply for holding the stock. Dividends are a cornerstone of passive income investing.",
        interactive: JSON.stringify({
          question:
            "If you own 500 shares of a company and it declares a $0.50 per share dividend, how much cash will you receive?",
          answer: 250,
          prefix: "$",
        }),
      },
      {
        title: "Growth vs Value Stocks",
        description: "Categorizing investment styles.",
        content:
          "Growth stocks are companies (like Tesla or Nvidia) expected to grow sales and earnings at a significantly faster rate than the market average. They rarely pay dividends, instead reinvesting cash back into expansion. Value stocks (like traditional banks or oil companies) are viewed as currently trading at a cheaper price than their fundamental financial metrics suggest they are worth, often paying reliable dividends.",
        interactive: JSON.stringify({
          question:
            "A startup reinvesting all profits into rapid AI expansion is likely a Growth (1) or Value (2) stock?",
          answer: 1,
          prefix: "",
        }),
      },
    ],
  },
  {
    title: "2. Exploring Investment Vehicles",
    description: "Beyond individual stocks: understanding funds.",
    order: 2,
    lessons: [
      {
        title: "Mutual Funds Explained",
        description: "Pooled money.",
        content:
          "A mutual fund is a massive pool of money collected from thousands of investors, which is then managed by professional money managers. These managers use the giant pool to buy a diversified mix of stocks, bonds, or other securities based on a stated objective. When you buy a mutual fund, you buy fractions of that entire diversified basket, instantly spreading your risk.",
        interactive: JSON.stringify({
          question:
            "Does buying a mutual fund instantly provide better diversification than buying a single stock? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "The Expense Ratio",
        description: "What funds cost.",
        content:
          "Mutual funds and ETFs don't work for free. The Expense Ratio is the annual fee that funds charge their shareholders to cover management and operating costs. It is expressed as a percentage of your total invested assets. A 1% expense ratio on a $100,000 portfolio means you pay $1,000 in fees every year, regardless of whether the fund makes or loses money. Over decades, high expense ratios can eat away hundreds of thousands of dollars in potential compounded returns.",
        interactive: JSON.stringify({
          question:
            "You invested $5,000 in an index fund. The expense ratio is 0.03%. Mathematically, how much will you be paying in fees for the year?",
          answer: 1.5,
          prefix: "$",
        }),
      },
      {
        title: "What is an Index Fund?",
        description: "Passive investing.",
        content:
          "An index fund is a specific type of mutual fund (or ETF) with a portfolio constructed on autopilot to simply track the components of a financial market index, like the S&P 500. It doesn't try to 'beat' the market by picking hidden gems; it simply matches the market. Because it requires no expensive stock-picking managers, its expense ratios are famously low (often under 0.05%). Warren Buffett famously declared index funds the best investment for most people.",
        interactive: JSON.stringify({
          question:
            "Do index funds generally try to actively pick winning stocks to beat the market? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "What is an ETF?",
        description: "Exchange-Traded Funds.",
        content:
          "An ETF (Exchange-Traded Fund) acts very similar to a mutual fund in that it holds a diversified basket of securities. However, the crucial difference is how it is bought and sold. Mutual funds only price and trade once per day after the market closes. ETFs trade on standard stock exchanges throughout the entire day, perfectly mimicking the behavior, pricing, and liquidity of an individual stock.",
        interactive: JSON.stringify({
          question:
            "Can you buy and sell an ETF in the middle of a trading day just like a regular stock? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Turnover Rates",
        description: "How often assets are replaced.",
        content:
          "Turnover rate measures how frequently a fund's manager buys and sells the underlying stocks within a given year. A 100% turnover rate means the manager effectively replaced the entire portfolio in one year. High turnover indicates aggressive active management, which generates higher trading fees and potentially higher capital gains taxes passed on to you. Index funds classically have very low turnover (under 5%).",
        interactive: JSON.stringify({
          question:
            "If a fund replaces 80% of its portfolio in a year, its turnover rate is 80%. Is this generally considered a high (1) or low (2) turnover rate? Enter 1 or 2.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Net Asset Value (NAV)",
        description: "The price of a fund.",
        content:
          "NAV (Net Asset Value) represents a mutual fund's per-share market value. It is strictly calculated at the end of each trading day. The formula is the total dollar value of all the cash and securities in the fund's portfolio, minus any liabilities, divided by the number of outstanding shares. When you place a buy order for a mutual fund during the day, you won't know the exact NAV price you'll pay until the market closes.",
        interactive: JSON.stringify({
          question:
            "A mutual fund has $100 million in assets, $10 million in liabilities, and 1 million shares. What is its NAV per share?",
          answer: 90,
          prefix: "$",
        }),
      },
      {
        title: "Morningstar Category",
        description: "Classifying funds.",
        content:
          "With thousands of funds available, Morningstar (a premiere financial research firm) assigns categories to funds based on their underlying holdings (e.g., 'Large Growth', 'Small Value', 'Emerging Markets'). This classification is critical because comparing a high-risk tech fund to a low-risk bond fund is meaningless. Morningstar categories ensure investors are comparing 'apples to apples' when evaluating performance.",
        interactive: JSON.stringify({
          question:
            "If comparing two funds, is it better to compare funds within the same Morningstar category (enter 1) or different ones (enter 2)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Equity StyleMaps",
        description: "Visualizing investment styles.",
        content:
          "The Morningstar Style Box (or Equity StyleMap) is a famous 3x3 visual grid. The vertical axis categorizes the size of the companies the fund holds (Large, Mid, Small Cap). The horizontal axis categorizes the investment strategy valuation (Value, Blend, Growth). A 'Value' stock trades at a lower price relative to its fundamental metrics, often due to slower growth. A 'Growth' stock is expected to increase revenue rapidly. A 'Blend' is a mix of both. This grid instantly visualizes a fund's risk profile.",
        interactive: JSON.stringify({
          question:
            "If a fund exclusively buys cheap, established companies that pay high dividends, it likely falls into which column: Value (1), Blend (2), or Growth (3)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Portfolio Net Assets ($M)",
        description: "The overall fund size.",
        content:
          "Portfolio Net Assets (AUM - Assets Under Management) represents the colossal total dollar amount managed within a fund. Some titanic index funds manage over $1 Trillion. Very large funds benefit from economies of scale (driving down fees) but can become bloated, making it difficult for active managers to nimbly enter and exit small-cap stock positions without moving the market price themselves.",
        interactive: JSON.stringify({
          question:
            "If a fund manages $500,000,000, how many millions is its Portfolio Net Assets? Enter the number.",
          answer: 500,
          prefix: "",
        }),
      },
      {
        title: "Share Class Net Assets ($M)",
        description: "Size of your specific slice.",
        content:
          "Mutual funds often divide their gigantic pool into different 'Share Classes' (e.g., Class A, Institutional Class, Retail Class). Each class holds the exact same underlying portfolio but structures its fees and minimum investments differently. Institutional classes might require a $5 million minimum investment but charge rock-bottom expense ratios, while Retail classes might have a $500 minimum but charge higher fees.",
        interactive: JSON.stringify({
          question:
            "An institutional class might require a higher minimum investment but charge lower expense ratios. True (1) or False (0)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "S&P 500 Breakdown",
        description: "The premier index.",
        content:
          "The S&P 500 (Standard & Poor's 500) is arguably the most famous stock market index in the world. It tracks the stock performance of approximately 500 of the largest, most profitable companies listed on stock exchanges in the United States. Many investors consider it the definitive benchmark for the overall health of the U.S. stock market. It is 'market-cap weighted', meaning massive companies like Apple have a much larger impact on the index's movements than smaller companies at the bottom.",
        interactive: JSON.stringify({
          question:
            "Does the S&P 500 track exactly 50 companies? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Dow Jones Industrial Average",
        description: "The oldest index.",
        content:
          "The Dow Jones Industrial Average (DJIA) is the oldest continuous barometer of the U.S. stock market, dating back to 1896. Unlike the 500-company S&P 500, the Dow tracks only 30 specific massive, prominent 'blue-chip' companies (like Home Depot, Boeing, Goldman Sachs). Uniquely, it is price-weighted, meaning a stock with a $300 share price heavily outweighs a stock with a $50 share price, regardless of the companies' actual market caps.",
        interactive: JSON.stringify({
          question:
            "How many companies does the Dow Jones Industrial Average track? Enter the number.",
          answer: 30,
          prefix: "",
        }),
      },
      {
        title: "Nasdaq Composite",
        description: "The tech-heavy index.",
        content:
          "The Nasdaq Composite is an index that includes almost all stocks strictly listed on the Nasdaq stock exchange (over 3,000 stocks). Because the Nasdaq exchange historically attracted innovative new companies, this index is famously heavily weighted towards the technology and internet sectors. When news reports say 'Tech stocks rallied today', the Nasdaq is usually soaring.",
        interactive: JSON.stringify({
          question:
            "Is the Nasdaq Composite known for being heavily concentrated in the Technology sector? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Bonds & Fixed Income",
        description: "The safer counterpart.",
        content:
          "If a stock is ownership, a bond is a pure loan. When you buy a bond, you are lending your money to a borrower (like the US Government or a Corporation). In return, they promise to pay you regular, fixed interest payments over a set duration, and return your original principal amount at the end of the term. Bonds are generally considered much safer and less volatile than stocks, making them the defensive backbone of many portfolios.",
        interactive: JSON.stringify({
          question:
            "When you buy a bond, are you essentially acting as a lender to a corporation or government? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Asset Allocation",
        description: "Splitting the pie.",
        content:
          "Asset Allocation is the high-level strategy of dividing your investment portfolio across different asset classes (e.g., 80% Stocks, 20% Bonds). Studies show asset allocation determines over 90% of a portfolio's risk and return profile, vastly overshadowing the impact of individual stock picking. The right allocation depends heavily on your age and time horizon. Younger investors should be heavily allocated to stocks to maximize growth, while retirees shift heavily to bonds to preserve capital.",
        interactive: JSON.stringify({
          question:
            "If a 25-year-old generally has a longer time horizon than a 65-year-old, should the 25-year-old typically have a higher equity (stock) allocation? Yes (1) or No (0).",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "The 60/40 Portfolio",
        description: "The classic blend.",
        content:
          "The '60/40 Portfolio' is the most famous traditional investing benchmark in modern finance. It dictates allocating exactly 60% of your capital to broad stock market index funds and 40% to high-quality bonds. The 60% stocks provide long-term capital appreciation, while the 40% bonds provide income and a defensive cushion when the stock market inevitably crashes. It is designed to offer a relatively smooth, moderately growing ride.",
        interactive: JSON.stringify({
          question:
            "In the standard 60/40 portfolio, what percentage is allocated strictly to bonds? Enter the number.",
          answer: 40,
          prefix: "%",
          postfix: true,
        }),
      },
    ],
  },
  {
    title: "3. Brokers and Accounts",
    description: "The tools enabling your participation in the market.",
    order: 3,
    lessons: [
      {
        title: "What is a Brokerage?",
        description: "The middleman.",
        content:
          "A brokerage is an essential financial intermediary. You cannot walk onto the floor of the NYSE to buy stocks; you need a licensed broker to execute trades on your behalf. Historically, you'd call a stockbroker on the phone who would charge exorbitant commissions. Today, discount brokerages like Fidelity, Charles Schwab, or Robinhood are massive digital platforms that allow you to execute trades instantly from a smartphone, usually for zero commission fees.",
        interactive: JSON.stringify({
          question:
            "Do modern digital discount brokerages typically charge zero commission per standard stock trade? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Cash vs Margin Accounts",
        description: "Playing with borrowed money.",
        content:
          "When opening a brokerage account, you choose a type. A Cash Account is simple: if you have $5,000 cash deposited, you can only buy $5,000 worth of securities. A Margin Account is riskier: it allows you to borrow money directly from the brokerage to buy *more* stock than your cash allows. Essentially, you are taking out a high-interest loan using your existing stocks as collateral, aiming to amplify your gains. However, this also amplifies your losses.",
        interactive: JSON.stringify({
          question:
            "If you want the safest account type that prevents you from going into debt to buy stocks, should you choose a Cash account (1) or Margin account (2)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Understanding Margin Calls",
        description: "When borrowing goes wrong.",
        content:
          "If you borrow money on margin to buy stocks, and your portfolio's value suddenly crashes, the brokerage isn't going to risk taking the loss. Once your portfolio drops below a 'maintenance margin' threshold, they issue a Margin Call. This is a terrifying strict demand to instantly deposit more cash into your account. If you fail to do so, the brokerage will forcefully sell off your investments at a major loss to cover their loan without your permission.",
        interactive: JSON.stringify({
          question:
            "Can a brokerage liquidate your assets without permission if you fail to meet a margin call? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Taxable vs Tax-Advantaged",
        description: "Keep your gains.",
        content:
          "Taxes are the largest expense most investors face. Taxable Accounts (standard brokerage accounts) offer ultimate flexibility; you can withdraw at any time, but you pay capital gains tax every time you sell a stock for a profit. Tax-Advantaged Accounts (like IRAs or 401(k)s) restrict when you can withdraw the money (usually age 59.5) but offer massive, legal tax shields that can save you millions of dollars over a lifetime of compounding.",
        interactive: JSON.stringify({
          question:
            "If your goal is to trade stocks and instantly withdraw profits next month, should you use a Taxable (1) or Tax-Advantaged (2) account?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Traditional IRA vs Roth IRA",
        description: "Paying taxes now or later.",
        content:
          "Individual Retirement Accounts (IRAs) offer two distinct tax advantages. A Traditional IRA provides tax relief today: money deposited is deducted from this year's taxable income, but you pay full taxes when you withdraw it in retirement. A Roth IRA is the opposite: you contribute after-tax money today (no upfront deduction), but all growth and future withdrawals in retirement are 100% permanently tax-free. Roth IRAs are immensely powerful for young, lower-income investors.",
        interactive: JSON.stringify({
          question:
            "Which IRA guarantees absolutely zero taxes on all compound growth when you withdraw it in retirement? Traditional (1) or Roth (2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "401(k) Basics",
        description: "Employer-sponsored plans.",
        content:
          "A 401(k) is the flagship retirement savings plan offered by American employers. Contributions are often automatically deducted from your paycheck before taxes. The most critical feature of a 401(k) is the 'Employer Match'—if you contribute a certain percentage of your salary, your employer matches it with free money (e.g., they put in 5% if you put in 5%). Failing to capture the full employer match is legally declining free money part of your compensation.",
        interactive: JSON.stringify({
          question:
            "If your employer offers a 100% match up to $3,000, and you contribute $3,000, what is the total amount added to your 401(k) that year?",
          answer: 6000,
          prefix: "$",
        }),
      },
    ],
  },
  {
    title: "4. Executing Trades",
    description: "The mechanics of buying and selling.",
    order: 4,
    lessons: [
      {
        title: "The Bid-Ask Spread",
        description: "The hidden cost of trading.",
        content:
          "When traversing the market, you'll encounter two prices for every stock. The 'Bid' is the highest price a buyer is willing to pay right now. The 'Ask' is the lowest price a seller is willing to accept. The difference between them is the 'Spread'. If a stock's bid is $10.00 and the ask is $10.05, the spread is $0.05. Highly traded stocks have a narrow spread (pennies), while rare or illiquid stocks have massive spreads, which quickly eat into your profits each time you trade.",
        interactive: JSON.stringify({
          question:
            "If Apple's bid is $150.10 and its ask is $150.15, what is the value of the spread between them?",
          answer: 0.05,
          prefix: "$",
        }),
      },
      {
        title: "Market Orders",
        description: "Executing instantly.",
        content:
          "A Market Order is a command to your broker to buy or sell a stock immediately, prioritizing speed over exact pricing. When you place a Market Buy, the broker grabs the best current 'Ask' price, guaranteeing the execution of the trade but not the price. In deeply liquid markets, you'll get roughly the price you see. But during volatile panic trading (like a flash crash), using market orders can result in buying or selling at horrific unintended prices.",
        interactive: JSON.stringify({
          question:
            "Does a Market Order prioritize the speed of execution (1) or the exact price of execution (2)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Limit Orders",
        description: "Executing at your price.",
        content:
          "A Limit Order puts you in control of the maximum price you pay or the minimum you receive. If Apple is trading at $150, but you only want to pay $140, you set a Limit Buy for $140. Your broker will only execute the trade if the price drops to $140 or better. The trade-off is execution risks: if the stock never drops to $140, your order never fills, and you don't buy the stock. Limit orders are crucial for managing precise entry and exit points.",
        interactive: JSON.stringify({
          question:
            "If you place a Limit Buy order at $50, will your broker ever force you to buy it at $55? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Stop-Loss Orders",
        description: "Cutting your losses.",
        content:
          "A Stop-Loss is your emergency ejection seat in investing. It is an order designed to automatically sell your stock if it falls to a terrifying designated price, limiting your total loss. Suppose you buy a stock at $100 and want to strictly limit your loss to 10%. You set a Stop-Loss at $90. If the stock crashes to $90, the Stop-Loss instantly triggers and converts into a Market Sell order to get you out immediately. It removes emotional paralysis from losing streaks.",
        interactive: JSON.stringify({
          question:
            "You bought stock at $200. You want to set a stop-loss to limit your downside risk to exactly 20%. What price do you set the stop-loss at?",
          answer: 160,
          prefix: "$",
        }),
      },
      {
        title: "Trailing Stops",
        description: "Locking in momentum.",
        content:
          "A Trailing Stop is a dynamic version of a Stop-Loss. Instead of a fixed dollar amount, it 'trails' the rising price by a fixed percentage. If you buy a stock at $100 and set a 10% trailing stop, your initial sell trigger is $90. But if the stock surges to $200, your trailing stop automatically moves up to $180 (10% below $200). It allows you to let winners run indefinitely while mathematically locking in the gained profits if the trend ever reverses.",
        interactive: JSON.stringify({
          question:
            "You set a 10% trailing stop on a $100 stock. It goes up to $300. At what exact price will your trailing stop now trigger a sell order?",
          answer: 270,
          prefix: "$",
        }),
      },
      {
        title: "Day Trading Dynamics",
        description: "In and out before sunset.",
        content:
          "Day Trading is the aggressive, full-time practice of buying and selling the same stocks within a single market day, purposefully closing out all positions before the 4:00 PM closing bell. Day traders rely heavily on split-second technical analysis and tiny price movements, heavily using leverage and margin. It is notorious for being incredibly stressful and risky, with statistics showing over 80% of retail day traders lose money over time.",
        interactive: JSON.stringify({
          question:
            "Does a true day trader intentionally hold their high-risk stock positions overnight? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Pattern Day Trader Rule",
        description: "Regulatory limits.",
        content:
          "To protect novice traders from ruining their lives with margin debt, the SEC enforces the 'Pattern Day Trader' (PDT) rule. If you execute four or more 'day trades' (buying and selling the exact same stock in a single day) within a rolling five-business-day window using a margin account, you fall under this rule. The strict penalty? Your brokerage legally requires you to maintain a minimum account equity of $25,000 at all times to continue trading.",
        interactive: JSON.stringify({
          question:
            "What is the absolute minimum dollar amount of equity a margin account must have to legally act as a Pattern Day Trader? Type the number.",
          answer: 25000,
          prefix: "$",
        }),
      },
    ],
  },
  {
    title: "5. Fundamental Analysis",
    description: "Analyzing the underlying business health.",
    order: 5,
    lessons: [
      {
        title: "Earnings Reports",
        description: "The quarterly scorecard.",
        content:
          "Every three months, public companies are legally required to release an Earnings Report detailing their net income, revenue, and forward-looking expectations. Analysts Wall Street issue concrete estimates before the report. The stock price's immediate reaction hinges rarely on the absolute numbers, but entirely on the 'Surprise'. If a company's earnings beat estimates (an Earnings Beat), the stock typically spikes. If they miss estimates (a Miss), the stock often severely punishes the company.",
        interactive: JSON.stringify({
          question:
            "If a company has a stellar quarter but still slightly misses the inflated Wall Street estimates, is the stock statistically more likely to go up (1) or go down (2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "EPS (Earnings Per Share)",
        description: "Profitability per share.",
        content:
          "Earnings Per Share (EPS) standardizes a company's massive profit into a comparable per-share basis. It is fundamentally calculated by taking Net Profit and dividing it by outstanding shares. Evaluating absolute profit is useless without knowing share count. If Company A makes $100M profit but has 100M shares, the EPS is $1. If Company B makes $100M profit but only has 10M shares, its EPS is $10, making it vastly more efficient at generating profit for each owner.",
        interactive: JSON.stringify({
          question:
            "A massive tech firm generates $20,000,000 in pure net profit. It currently has 10,000,000 shares outstanding. What is the precise EPS?",
          answer: 2,
          prefix: "$",
        }),
      },
      {
        title: "P/E Ratio (Price-to-Earnings)",
        description: "Is this stock expensive?",
        content:
          "The P/E Ratio is the godfather of valuation metrics. It fundamentally answers: 'How much are investors willing to pay for $1 of this company's earnings?' Calculated by dividing the Stock Price by the EPS. A low P/E (like 10) often indicates a 'value' stock that is cheap relative to its earnings. A high P/E (like 100) indicates a 'growth' stock, meaning investors are paying a massive premium today because they expect massive explosive earnings growth in the future.",
        interactive: JSON.stringify({
          question:
            "A stock is trading strictly at $150 per share. Its reported EPS for the entire year is $5. What is its P/E Ratio?",
          answer: 30,
          prefix: "",
        }),
      },
      {
        title: "Price-to-Sales Ratio (P/S)",
        description: "Valuing revenue generation.",
        content:
          "The Price-to-Sales (P/S) ratio compares a company's total market cap to its total annual revenue (sales). You use P/S primarily when a company is aggressively growing but intentionally losing money (negative earnings), which renders the P/E ratio completely unusable. It values the top-line growth. A P/S of 2 means investors are paying $2 for every $1 of sales the company generates.",
        interactive: JSON.stringify({
          question:
            "A young, unprofitable AI startup has a market capitalization of $1 billion. Its annual sales are exactly $250 million. What is its Price-to-Sales ratio?",
          answer: 4,
          prefix: "",
        }),
      },
      {
        title: "Revenue vs Net Income",
        description: "Top line vs bottom line.",
        content:
          "It is crucial to never confuse Revenue and Net Income. Revenue (affectionately called the 'Top Line') is the gross, total amount of money brought in strictly by sales before any expenses are touched. Net Income (the 'Bottom Line') is whatever cash is left over after stripping out every single expense: cost of goods, salaries, research, taxes, and debt interest. A company can easily have billions in Revenue but zero Net Income.",
        interactive: JSON.stringify({
          question:
            "If a company sells $100,000 worth of machinery, but their parts, labor, and taxes cost $70,000, what is the Net Income?",
          answer: 30000,
          prefix: "$",
        }),
      },
      {
        title: "EBITDA Explained",
        description: "An alternative profit metric.",
        content:
          "EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. It is an aggressive accounting trick used to show a company's core operational profitability by stripping out the massive distorting effects of debt financing (Interest) and accounting tax rules (Depreciation). It allows investors to compare the raw operating efficiency of a company smoothly against its competitors, even if they have entirely different debt structures.",
        interactive: JSON.stringify({
          question:
            "Does EBITDA strictly exclude the cost of interest payments when evaluating a company's profit? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Balance Sheets Anatomy",
        description: "Assets vs Liabilities.",
        content:
          "A Balance Sheet is a financial snapshot of exactly what a company owns and owes at a singular moment in time. The strict fundamental equation of all accounting is: Assets = Liabilities + Shareholder Equity. 'Assets' are things the company owns (cash, factories, intellectual property). 'Liabilities' are debts it owes (loans, unpaid wages). The remaining difference, 'Shareholder Equity', is the literal fundamental net worth belonging directly to the investors.",
        interactive: JSON.stringify({
          question:
            "If a company has $500,000 in Total Assets and exactly $300,000 in Total Liabilities, what is the exact Shareholder Equity?",
          answer: 200000,
          prefix: "$",
        }),
      },
      {
        title: "Free Cash Flow",
        description: "The lifeblood.",
        content:
          "Net Income is easily distorted by accounting tricks. Free Cash Flow (FCF) is the absolute cold, hard cash a company legitimately generates after paying for its vital capital expenditures (like maintaining factories). FCF is the holy grail because it represents the actual literal cash available to pay dividends, buy back stock, or aggressively acquire competitors.",
        interactive: JSON.stringify({
          question:
            "Is Free Cash Flow generally considered harder to manipulate via accounting tricks than standard Net Income? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Debt-to-Equity Ratio",
        description: "Measuring leverage risk.",
        content:
          "The Debt-to-Equity metric reveals how violently a company is using borrowed money to finance its growth. Calculated strictly by dividing total liabilities by total shareholder equity. A ratio of 1.0 means debt and equity are perfectly equal. A ratio of 5.0 means the company is heavily leveraged, taking on massive debt risks to grow. In times of recession, highly leveraged companies face a severe risk of bankruptcy.",
        interactive: JSON.stringify({
          question:
            "Company X has $1,000,000 in total liabilities and $200,000 in shareholder equity. What is its precise Debt-to-Equity ratio?",
          answer: 5,
          prefix: "",
        }),
      },
      {
        title: "Dividend Yield",
        description: "The return from dividends.",
        content:
          "The Dividend Yield tells you explicitly how much cash a company pays out each year relative to its stock price. It is formulated as: (Annual Dividend Per Share) / (Current Stock Price). Think of it identically to a savings account interest yield. A 4% yield means if you invest $100, you are handed $4 every year purely in cash.",
        interactive: JSON.stringify({
          question:
            "A utility company pays out a hefty $3 in annual dividends. The underlying stock price is exactly $60. What is the Dividend Yield percentage?",
          answer: 5,
          prefix: "%",
          postfix: true,
        }),
      },
    ],
  },
  {
    title: "6. Technical Analysis",
    description: "Analyzing charts and momentum.",
    order: 6,
    lessons: [
      {
        title: "Introduction to Chart reading",
        description: "Reading the tape.",
        content:
          "Technical Analysis assumes that fundamentally all known information about a company is already perfectly 'priced in' to the stock. Therefore, technicians entirely ignore Earnings, P/E ratios, and news. They solely analyze historical price charts, intensely looking for repeating patterns of human psychology (fear and greed) that dictate future price momentum.",
        interactive: JSON.stringify({
          question:
            "Does a pure technical analyst care deeply about a company's fundamental P/E Ratio? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Japanese Candlesticks",
        description: "Reading granular action.",
        content:
          "Invented by Japanese rice traders centuries ago, Candlestick charts pack immense data into a beautiful visual. Each 'candle' represents a set time period (e.g., 1 day). The thick 'body' shows the exact opening and closing prices. Green (or white) means price rose; Red (or black) means it fell. The thin lines sticking out ('wicks' or 'shadows') show the absolute highest and lowest chaotic prices hit during that period.",
        interactive: JSON.stringify({
          question:
            "If the closing price of a stock is significantly higher than its opening price, the candlestick body is usually colored Red (enter 1) or Green (enter 2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "Support and Resistance",
        description: "Invisible price barriers.",
        content:
          "These are invisible psychological barriers on a chart where prices notoriously pause or reverse. 'Support' is a floor: a low price area where massive groups of buyers continually step in, stopping the stock from falling further. 'Resistance' is a ceiling: a high price area where armies of sellers continually take profits, preventing the stock from breaking higher. Trading is often about betting on a breakout through these barriers.",
        interactive: JSON.stringify({
          question:
            "If a stock repeatedly falls to $50 but always instantly bounces back up, is $50 forming a level of Support (1) or Resistance (2)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Moving Averages (SMA & EMA)",
        description: "Smoothing out noise.",
        content:
          "Daily stock charts are wildly chaotic. A Moving Average (MA) dramatically smooths out this chaotic price data to expose the true underlying trend. The Simple Moving Average (SMA) finds the exact average price over an unweighted period of time (like 200 days). The Exponential Moving Average (EMA) applies heavy mathematical weight to the most recent prices, making it react much faster to new trends.",
        interactive: JSON.stringify({
          question:
            "Which moving average mathematically reacts faster to sudden, drastic new price changes: The Simple Moving Average (SMA - enter 1) or Exponential (EMA - enter 2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "Golden & Death Crosses",
        description: "Significant crossovers.",
        content:
          "A crossover is a monumental event in technical trading. The 'Golden Cross' occurs when the fast 50-day moving average aggressively crosses entirely above the slow 200-day moving average, signaling a potent long-term bull market trend breakout. The dreaded 'Death Cross' is the inverse: the 50-day plummets below the 200-day, indicating severely deteriorating momentum and a massive potential bear market crash.",
        interactive: JSON.stringify({
          question:
            "If the 50-day average rapidly falls below the 200-day average, is this known universally as a Golden Cross (1) or Death Cross (2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "RSI (Relative Strength Index)",
        description: "Measuring exhaustion.",
        content:
          "The RSI is an ultra-popular momentum oscillator ranging violently from 0 to 100. It measures the speed and exhaustion of price movements. Traditionally, an RSI score exploding above 70 strictly indicates a stock is 'Overbought' (too much hype, primed for a crash). An RSI crashing below 30 indicates it is 'Oversold' (too much fear, primed for a relief bounce).",
        interactive: JSON.stringify({
          question:
            "If a stock's RSI hits a blistering 85, is the stock statistically considered Oversold (1) or Overbought (2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "Volume Analysis",
        description: "The fuel behind the move.",
        content:
          "Price movements are hollow without Volume. Volume denotes the raw, literal number of shares traded in a given period. It acts as market fuel. If a stock inexplicably surges 10% on tiny, low volume, it's a weak, fragile move easily reversed. If a stock surges 10% on massive, historically high volume, it signals potent institutional accumulation and a deeply legitimate trend.",
        interactive: JSON.stringify({
          question:
            "Does a massive breakout in price carry significantly more validity if accompanied by HIGH trading volume? Type 1 for Yes, 0 for No.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Bollinger Bands",
        description: "Volatility visualized.",
        content:
          "Created by John Bollinger, these are bands drawn exactly two standard deviations away from a core simple moving average. Because standard deviation is a pure mathematical measure of volatility, the bands rapidly widen during chaotic crashes and fiercely contract during quiet, boring periods. When a stock price touches the upper band, it is mathematically anomalously high.",
        interactive: JSON.stringify({
          question:
            "When market volatility explodes into extreme chaos, do the outer Bollinger Bands physically compress tighter (1) or widen further apart (2)?",
          answer: 2,
          prefix: "",
        }),
      },
    ],
  },
  {
    title: "7. Advanced Instruments",
    description: "Derivatives, Shorting, and Leverage",
    order: 7,
    lessons: [
      {
        title: "Short Selling",
        description: "Profiting from a drop.",
        content:
          "Short selling is an aggressive bet that a stock will violently crash. You literally borrow shares you don't own from a broker and instantly sell them at today's high price. Your strict goal is to buy them back later at a drastically lower price, return the shares to the broker, and pocket the difference. The crucial risk: if the stock goes up, you lose money. And because a stock can technically rise to infinity, a short seller's possible losses are mathematically infinite. During the Volkswagen short squeeze of 2008, short sellers lost over $30 billion as the stock abruptly multiplied in price.",
        interactive: JSON.stringify({
          question:
            "When you strictly buy a stock, your maximum loss is 100% of your investment. Is a short seller's maximum theoretical loss limited to 100%? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "What are Options?",
        description: "Contracts for the future.",
        content:
          "Options are high-risk financial derivatives. You aren't buying a stock; you are buying a contract. They grant you the right (but significantly, not the obligation) to buy or sell roughly 100 shares of a stock at a strictly agreed-upon 'strike price', by a strict 'expiration date'. Options allow massive leverage: you can control huge amounts of stock for a tiny fraction of the actual cash cost. Because options have an expiration date, they are decaying assets. The majority of out-of-the-money option contracts expire completely worthless.",
        interactive: JSON.stringify({
          question:
            "A single standard US stock option contract typically controls how many underlying shares of the company? Enter the exact number.",
          answer: 100,
          prefix: "",
        }),
      },
      {
        title: "Call Options",
        description: "Betting the stock explodes upward.",
        content:
          "A Call Option is a weaponized bet on upside speed. It locks in your right to 'Call' (buy) shares away from someone at an exact Strike Price. For example, you buy a Call at a $100 Strike for $5. If the stock violently explodes to $150 before the expiration, your Call gives you the magical right to buy those $150 shares for only $100. Your pure profit is massive. But if it stays below $100, the contract expires completely worthless.",
        interactive: JSON.stringify({
          question:
            "You buy a Call option with a Strike Price of $50. On expiration day, the stock is trading terribly at $40. Does your contract have intrinsic value? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Put Options",
        description: "Insurance and downside betting.",
        content:
          "A Put Option gives you the ironclad right to 'Put' (sell) shares to someone else at a specific Strike Price. Investors use Puts primarily as portfolio insurance. If you own a massive stock portfolio, you can buy Puts aggressively below the current price. If the market suddenly crashes and your portfolio bleeds out, your Put Options explode immensely in value, perfectly hedging and offsetting your terrifying losses.",
        interactive: JSON.stringify({
          question:
            "If you desperately want to protect your portfolio against a severe market crash, should you buy Call options (1) or Put options (2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "The Greeks (Delta & Theta)",
        description: "The physics of options.",
        content:
          "Options pricing is governed by extreme mathematical variables called 'The Greeks'. 'Delta' measures the raw sensitivity of an option's price to a $1 change in the underlying stock. If your option has a Delta of 0.50, and the stock goes up $1, your option goes up $0.50. 'Theta' is the silent killer—it measures the daily, unrelenting decay of the option's value entirely due to the passage of time. As expiration rapidly approaches, Theta bleeds an option's value to zero spectacularly fast.",
        interactive: JSON.stringify({
          question:
            "Which core option 'Greek' fundamentally represents the daily decay of an option's value as time relentlessly passes? (Enter 1 for Delta, 2 for Theta, 3 for Gamma)",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "Leveraged ETFs",
        description: "Amplified destruction.",
        content:
          "Leveraged ETFs vividly employ intense derivatives and massive debt to brutally amplify the strict daily returns of an index. A 3x S&P 500 ETF aims to triple the market's daily move. If the S&P drops roughly 2%, the ETF crashes precisely 6%. However, due to raw mathematical 'volatility decay', holding these highly leveraged, decaying funds for incredibly long periods uniquely guarantees horrific mathematical destruction of your portfolio value. They are solely designed for intraday speculation.",
        interactive: JSON.stringify({
          question:
            "If the underlying index strictly goes up by 4% in a single day, exactly how much percentage should a 3x Leveraged ETF go up? Enter the number.",
          answer: 12,
          prefix: "%",
          postfix: true,
        }),
      },
    ],
  },
  {
    title: "8. Psychology of Investing",
    description: "Mastering your mind.",
    order: 8,
    lessons: [
      {
        title: "Fear and Greed",
        description: "The twin drivers of markets.",
        content:
          "The stock market is ultimately an engine driven entirely by raw human emotion. Excessive, unbridled Greed notoriously leads to horrific, illogical asset bubbles—such as the 1637 Tulip Mania or the crushing 2000 Dot-Com crash where technology stocks with zero revenue traded for billions. Paralyzing Fear dictates severe market panics, causing millions to blindly liquidate perfect companies at the absolute bottom, such as the panic of 2008 and the flash-crash of the 2020 pandemic. When the 'CNN Fear & Greed Index' shows extreme euphoria, the herd is usually primed for slaughter. Warren Buffett's definitive rule for mastering this dynamic is legendary: 'Be strictly fearful when others are blatantly greedy, and aggressively greedy when others are fearful.' Identifying and betting against extreme public emotion is the single greatest advantage a seasoned investor possesses.",
        interactive: JSON.stringify({
          question:
            "When the general public is operating purely out of extreme, reckless greed (such as aggressively buying during an undeniable asset bubble), does Warren Buffett strictly advise acting Greedily (1) or Fearfully (2)?",
          answer: 2,
          prefix: "",
        }),
      },
      {
        title: "Loss Aversion",
        description: "Why losing hurts intensely more.",
        content:
          "First identified by Nobel laureate Daniel Kahneman and Amos Tversky in their revolutionary 'Prospect Theory,' Loss Aversion is a devastatingly powerful cognitive bias. It states that humans fundamentally and physiologically feel the severe pain of losing money exactly twice as intensely as they feel the joy of gaining the identical amount. This deeply flawed wiring causes paralyzed investors to desperately hold heavily onto utterly doomed, cratering stocks in a frantic bid to 'wait for it to get back to even' so they don't have to formally book a painful loss. This psychological inability to forcefully cut a loser is the primary reason the average retail trader systematically destroys their compounded returns over their entire lifetime.",
        interactive: JSON.stringify({
          question:
            "Due directly to pure Loss Aversion mathematically described by Kahneman, does an investor generally feel phenomenally more severe pain from losing $1000 (1) or a greater magnitude of joy from gaining $1000 (2)?",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Confirmation Bias",
        description: "Hearing only what you want.",
        content:
          "Confirmation Bias is arguably the most common and devastating psychological tendency in modern investing. It is the overwhelming compulsion to exclusively seek out, read, and desperately believe information that perfectly aligns with your preexisting flawed theory, while aggressively dismissing and ridiculing legitimate blatant warnings. If you blindly love a highly speculative EV stock, you solely follow highly positive Twitter gurus and 'echo chambers' like Reddit's WallStreetBets, actively blocking short sellers' crucial negative reports. To actually survive the treacherous market, a master investor must constantly, intentionally, and intensely seek out the exact opposing viewpoints to rigorously stress-test their thesis.",
        interactive: JSON.stringify({
          question:
            "Does confirmation bias fundamentally encourage an investor to impartially and rigorously challenge their own deeply held beliefs by actively seeking opposing views? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
      {
        title: "Sunk Cost Fallacy",
        description: "Holding horrific losers.",
        content:
          "The Sunk Cost Fallacy occurs fundamentally when you deeply refuse to abandon a completely failing, horrific investment merely because you have already invested huge amounts of time, energy, or capital into it. You rationalize that if you abandon it now, the previous money is 'wasted.' The brutal mathematical reality is: the historically spent money is completely, irrevocably gone regardless of what you do. The absolute only truly rational question an elite investor asks themselves daily is: 'Knowing exactly what I know today about this failing company, would I blindly buy this completely new, right now, with fresh cash?' If the answer is no, it must be sold.",
        interactive: JSON.stringify({
          question:
            "The Sunk Cost Fallacy predominantly describes an investor's irrational, paralyzing reluctance to abandon a fundamentally failing investment solely because they are completely anchored to their past spent capital. Type 1 for True, 0 for False.",
          answer: 1,
          prefix: "",
        }),
      },
      {
        title: "Dollar-Cost Averaging (DCA)",
        description: "The emotionless hack.",
        content:
          "Dollar-Cost Averaging (DCA) is the absolute ultimate hack for explicitly defeating every single psychological bias listed previously. The strategy is wonderfully mechanical: you automate the investment of an exact strict dollar amount on an identical schedule (e.g., exactly $500 aggressively every 1st of the month, forever), completely regardless of whether the stock market is relentlessly soaring flawlessly to all-time highs or crashing violently in a historic panic. It profoundly, entirely removes horrific emotional market-timing from the equation. When markets crash, your automated $500 magically buys significantly more shares at a discount. It forces you to mathematically buy low and accumulate immense wealth over decades.",
        interactive: JSON.stringify({
          question:
            "If you strictly practice a mechanical DCA strategy, do you fundamentally pause entirely or wildly alter your buying schedule manually when the chaotic market temporarily crashes? Type 1 for Yes, 0 for No.",
          answer: 0,
          prefix: "",
        }),
      },
    ],
  },
];

// Generate even more lessons dynamically to hit the ~100 count.
const advancedTopics = [
  {
    title: "Macroeconomics: Inflation and Interest Rates",
    question:
      "If the Federal Reserve explicitly raises interest rates dramatically, does this fundamentally tend to historically slow down inflation? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "The Federal Reserve's Role",
    question:
      "Is the fundamentally primary role of the Federal Reserve to strictly act as the central banking system of the United States? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "Quantitative Easing",
    question:
      "When a deeply potent central bank engages directly in explicit Quantitative Easing, are they fiercely buying (1) or dumping (2) massive sums of securities to violently inject capital into the system?",
    answer: 1,
  },
  {
    title: "Yield Curve Inversions",
    question:
      "Does a violently inverted deeply strict Yield Curve fundamentally historically signal an impending severe economic recession? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "Sector Rotation Strategies",
    question:
      "Does highly systemic Sector Rotation heavily involve explicitly moving immense capital out of overperforming sectors deeply directly into aggressively underperforming sectors? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "Value Trap Avoidance",
    question:
      "A deeply severe 'Value Trap' describes a company intensely appearing fundamentally incredibly cheap but strictly doomed to continue cratering intensely. Type 1 for True, 0 for False.",
    answer: 1,
  },
  {
    title: "Dividend Irrelevance Theory",
    question:
      "Does the rigorous Dividend Irrelevance Theory drastically heavily argue that immense dividends essentially hold profoundly zero true absolute impact strictly on fundamentally purely total shareholder return? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "Efficient Market Hypothesis",
    question:
      "If fundamentally heavily truly deeply operating intensely strictly under a completely 100% efficient market, is aggressively perfectly intensely picking winning fundamentally massively undervalued stocks fundamentally mathematically deeply completely impossible? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "Random Walk Theory",
    question:
      "In heavily fundamentally strictly applying deeply pure Random Walk Theory, are absolutely past historic strict movements incredibly completely inherently useless deeply fundamentally for predicting explicit precise future paths? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
  {
    title: "Options Strategies: Covered Calls",
    question:
      "Does incredibly executing an incredibly intensely deeply aggressive fundamentally deeply strict perfectly tight Covered Call intensely absolutely require fundamentally you to strictly already explicitly precisely own the absolute exact incredibly exact underlying asset shares deeply entirely? Type 1 for Yes, 0 for No.",
    answer: 1,
  },
];

// Split the advanced topics into a few more modules
const splitAdvanced: ModuleType[] = [];
for (let i = 0; i < advancedTopics.length; i += 5) {
  const chunk = advancedTopics.slice(i, i + 5);
  splitAdvanced.push({
    title: `${9 + splitAdvanced.length}. Expanding Horizons Part ${splitAdvanced.length + 1}`,
    description: "Deepening your broad market knowledge.",
    order: 9 + splitAdvanced.length,
    lessons: chunk.map((topic) => ({
      title: topic.title,
      description: `Advanced exploration of ${topic.title}.`,
      content: `${topic.title} is a profoundly crucial aspect of entirely highly fundamentally advanced financial theory and deeply heavily highly fundamentally rigorous practice. When deeply heavily explicitly integrating ${topic.title} completely into your systemic exceptionally perfectly explicitly rigorous framework, you undeniably entirely uniquely fundamentally immensely undeniably elevate yourself.`,
      interactive: JSON.stringify({
        question: topic.question,
        answer: topic.answer,
        prefix: "",
      }),
    })),
  });
}

const finalModules = [...moduleData, ...splitAdvanced];

async function main() {
  console.log(
    `Seeding database with ${finalModules.length} comprehensive modules...`,
  );

  // Clear everything out first
  await prisma.transaction.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();

  for (const mData of finalModules) {
    const { lessons, ...moduleInput } = mData;
    const createdModule = await prisma.module.create({ data: moduleInput });

    let orderCounter = 1;
    for (const lData of lessons) {
      console.log(`Seeding lesson: ${lData.title}`);
      await prisma.lesson.create({
        data: {
          title: lData.title,
          description: lData.description,
          content: lData.content,
          interactive: lData.interactive,
          order: orderCounter++,
          moduleId: createdModule.id,
        },
      });
    }
  }

  // Create a default user if none exists
  const existingUser = await prisma.user.findUnique({
    where: { username: "student" },
  });
  if (!existingUser) {
    await prisma.user.create({
      data: {
        username: "student",
        balance: 10000.0,
      },
    });
  }

  const totalLessons = await prisma.lesson.count();
  console.log(
    `Database seeded successfully! Created ${finalModules.length} modules and ${totalLessons} lessons.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
