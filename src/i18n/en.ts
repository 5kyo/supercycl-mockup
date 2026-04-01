import type { Translations } from "./types";

const en: Translations = {
  // common
  "common.cancel": "Cancel",
  "common.confirm": "Confirm",
  "common.close": "Close",
  "common.copy": "Copy",
  "common.edit": "Edit",
  "common.logout": "Logout",
  "common.testnet": "Testnet",
  "common.isolated": "Isolated",

  // landing
  "landing.headline1": "Trade Different,",
  "landing.headline2": "Ride the ",
  "landing.cta": "Continue with Google",
  "landing.disclaimer": "Test environment. No real funds used.",

  // login
  "login.title": "Log in to Supercycl",
  "login.mockName": "John Doe",
  "login.mockInitial": "J",
  "login.continueAs": "Continue as {name}",

  // terms
  "terms.title": "Accept the Terms",
  "terms.agree": "I agree to the ",
  "terms.tos": "Terms of Service",
  "terms.privacy": "Privacy Policy",
  "terms.and": " and ",
  "terms.accept": "Accept",

  // onboarding
  "onboarding.settingUp": "Setting up your\ntrading account",
  "onboarding.complete": "You're all set!",
  "onboarding.step.wallet": "Creating wallet",
  "onboarding.step.connect": "Connecting to Hyperliquid",
  "onboarding.step.funds": "Loading test funds",
  "onboarding.deposited": "Test funds of {amount} USDC have been deposited.",
  "onboarding.balance": "Balance",
  "onboarding.startTrading": "Start Trading",

  // trade
  "trade.market": "Market",
  "trade.limit": "Limit",
  "trade.buyLong": "Buy / Long",
  "trade.sellShort": "Sell / Short",
  "trade.priceUsdc": "Price (USDC)",
  "trade.positions": "Positions",
  "trade.openOrder": "Open Order",
  "trade.noPositions": "No open positions",
  "trade.noOrders": "No open orders",
  "trade.positionClosed": "Position closed",
  "trade.entry": "Entry",
  "trade.auto": "Auto",
  "trade.orderPlaced": "{label} {symbol} order placed{tpsl}",

  // orderbook
  "orderbook.price": "Price",
  "orderbook.size": "Size",

  // leverage
  "leverage.title": "Adjust Leverage",
  "leverage.maxWarning": "Max leverage limited to {max}x (User Protection)",
  "leverage.noticeTitle": "Leverage Policy Notice",
  "leverage.noticeBody": "This account has a maximum leverage limit of {max}x under the user protection policy.",
  "leverage.understand": "I Understand",

  // tpsl
  "tpsl.title": "Auto TP/SL Settings",
  "tpsl.takeProfit": "Take Profit (%)",
  "tpsl.stopLoss": "Stop Loss (%)",
  "tpsl.note": "Settings apply to new orders only. Existing positions will not be affected.",

  // signal
  "signal.performance": "Last 30 days performance",
  "signal.hit": "Hit",
  "signal.miss": "Miss",
  "signal.expired": "Expired",
  "signal.avgPnl": "Avg PnL",
  "signal.hitRate": "Hit Rate",
  "signal.noSignals": "No signals matching this filter",
  "signal.execute": "Execute",
  "signal.result": "Result: {pnl}%",
  "signal.orderConfirm": "Signal Order Confirm",
  "signal.orderType": "Order Type",
  "signal.entryPrice": "Entry Price",
  "signal.margin": "Margin",
  "signal.leverage": "Leverage",
  "signal.modify": "Modify",
  "signal.done": "Done",
  "signal.executeOrder": "Execute Order",
  "signal.orderExecuted": "Order executed from signal",
  "signal.usdcBased": "{amount} {currency} based",
  "signal.confidence.high": "High",
  "signal.confidence.med": "Med",
  "signal.confidence.low": "Low",
  "signal.status.hitTp": "HIT TP",
  "signal.status.hitSl": "HIT SL",
  "signal.status.expired": "EXPIRED",
  "signal.status.cancelled": "CANCELLED",

  // filter
  "filter.all": "All",
  "filter.long": "Long",
  "filter.short": "Short",
  "filter.active": "Active",
  "filter.closed": "Closed",

  // portfolio
  "portfolio.totalBalance": "Total Balance",
  "portfolio.available": "Available",
  "portfolio.marginUsed": "Margin Used",
  "portfolio.openPositions": "Open Positions",
  "portfolio.noPositions": "No open positions",
  "portfolio.recentActivity": "Recent Activity",
  "portfolio.openedShort": "Opened XRPUSDT Short \u00b7 2x",
  "portfolio.openedLong": "Opened BTCUSDT Long \u00b7 2x",
  "portfolio.deposited": "Deposited {amount} USDC",

  // settings
  "settings.account": "Account",
  "settings.tradingPrefs": "Trading Preferences",
  "settings.autoTpSl": "Auto TP/SL",
  "settings.exchange": "Exchange Connection",
  "settings.exchangeNote": "6 exchanges available in the PC version.",
  "settings.comingSoon": "Coming Soon",
  "settings.about": "About",
  "settings.website": "Supercycl Website",
  "settings.docs": "Docs",
  "settings.language": "Language",
  "settings.addressCopied": "Address copied!",
  "settings.loggedOut": "Logged out (mockup)",
  "settings.connected": "Connected \u2713",

  // coin selector
  "coinSelector.title": "Select Coin",
  "coinSelector.search": "Search coins...",

  // nav
  "nav.trade": "Trade",
  "nav.signal": "Signal",
  "nav.portfolio": "Portfolio",
  "nav.settings": "Settings",

  // relative time
  "time.justNow": "just now",
  "time.mAgo": "{n}m ago",
  "time.hAgo": "{n}h ago",
  "time.dAgo": "{n}d ago",
};

export default en;
