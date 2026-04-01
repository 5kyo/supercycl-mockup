export type Language = "en" | "ko";

export interface Translations {
  // common
  readonly "common.cancel": string;
  readonly "common.confirm": string;
  readonly "common.close": string;
  readonly "common.copy": string;
  readonly "common.edit": string;
  readonly "common.logout": string;
  readonly "common.testnet": string;
  readonly "common.isolated": string;

  // landing
  readonly "landing.headline1": string;
  readonly "landing.headline2": string;
  readonly "landing.cta": string;
  readonly "landing.disclaimer": string;

  // login
  readonly "login.title": string;
  readonly "login.mockName": string;
  readonly "login.mockInitial": string;
  readonly "login.continueAs": string;

  // terms
  readonly "terms.title": string;
  readonly "terms.agree": string;
  readonly "terms.tos": string;
  readonly "terms.privacy": string;
  readonly "terms.and": string;
  readonly "terms.accept": string;

  // onboarding
  readonly "onboarding.settingUp": string;
  readonly "onboarding.complete": string;
  readonly "onboarding.step.wallet": string;
  readonly "onboarding.step.connect": string;
  readonly "onboarding.step.funds": string;
  readonly "onboarding.deposited": string;
  readonly "onboarding.balance": string;
  readonly "onboarding.startTrading": string;

  // trade
  readonly "trade.market": string;
  readonly "trade.limit": string;
  readonly "trade.buyLong": string;
  readonly "trade.sellShort": string;
  readonly "trade.priceUsdc": string;
  readonly "trade.positions": string;
  readonly "trade.openOrder": string;
  readonly "trade.noPositions": string;
  readonly "trade.noOrders": string;
  readonly "trade.positionClosed": string;
  readonly "trade.entry": string;
  readonly "trade.auto": string;
  readonly "trade.orderPlaced": string;

  // orderbook
  readonly "orderbook.price": string;
  readonly "orderbook.size": string;

  // leverage
  readonly "leverage.title": string;
  readonly "leverage.maxWarning": string;
  readonly "leverage.noticeTitle": string;
  readonly "leverage.noticeBody": string;
  readonly "leverage.understand": string;

  // tpsl
  readonly "tpsl.title": string;
  readonly "tpsl.takeProfit": string;
  readonly "tpsl.stopLoss": string;
  readonly "tpsl.note": string;

  // signal
  readonly "signal.performance": string;
  readonly "signal.hit": string;
  readonly "signal.miss": string;
  readonly "signal.expired": string;
  readonly "signal.avgPnl": string;
  readonly "signal.hitRate": string;
  readonly "signal.noSignals": string;
  readonly "signal.execute": string;
  readonly "signal.result": string;
  readonly "signal.orderConfirm": string;
  readonly "signal.orderType": string;
  readonly "signal.entryPrice": string;
  readonly "signal.margin": string;
  readonly "signal.leverage": string;
  readonly "signal.modify": string;
  readonly "signal.done": string;
  readonly "signal.executeOrder": string;
  readonly "signal.orderExecuted": string;
  readonly "signal.usdcBased": string;
  readonly "signal.confidence.high": string;
  readonly "signal.confidence.med": string;
  readonly "signal.confidence.low": string;
  readonly "signal.status.hitTp": string;
  readonly "signal.status.hitSl": string;
  readonly "signal.status.expired": string;
  readonly "signal.status.cancelled": string;

  // filter tabs
  readonly "filter.all": string;
  readonly "filter.long": string;
  readonly "filter.short": string;
  readonly "filter.active": string;
  readonly "filter.closed": string;

  // portfolio
  readonly "portfolio.totalBalance": string;
  readonly "portfolio.available": string;
  readonly "portfolio.marginUsed": string;
  readonly "portfolio.openPositions": string;
  readonly "portfolio.noPositions": string;
  readonly "portfolio.recentActivity": string;
  readonly "portfolio.openedShort": string;
  readonly "portfolio.openedLong": string;
  readonly "portfolio.deposited": string;

  // settings
  readonly "settings.account": string;
  readonly "settings.tradingPrefs": string;
  readonly "settings.autoTpSl": string;
  readonly "settings.exchange": string;
  readonly "settings.exchangeNote": string;
  readonly "settings.comingSoon": string;
  readonly "settings.about": string;
  readonly "settings.website": string;
  readonly "settings.docs": string;
  readonly "settings.language": string;
  readonly "settings.addressCopied": string;
  readonly "settings.loggedOut": string;
  readonly "settings.connected": string;

  // coin selector
  readonly "coinSelector.title": string;
  readonly "coinSelector.search": string;

  // nav
  readonly "nav.trade": string;
  readonly "nav.signal": string;
  readonly "nav.portfolio": string;
  readonly "nav.settings": string;

  // relative time
  readonly "time.justNow": string;
  readonly "time.mAgo": string;
  readonly "time.hAgo": string;
  readonly "time.dAgo": string;
}

export type TranslationKey = keyof Translations;
