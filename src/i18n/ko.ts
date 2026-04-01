import type { Translations } from "./types";

const ko: Translations = {
  // common
  "common.cancel": "\ucde8\uc18c",
  "common.confirm": "\ud655\uc778",
  "common.close": "\ub2eb\uae30",
  "common.copy": "\ubcf5\uc0ac",
  "common.edit": "\ud3b8\uc9d1",
  "common.logout": "\ub85c\uadf8\uc544\uc6c3",
  "common.testnet": "\ud14c\uc2a4\ud2b8\ub137",
  "common.isolated": "\uaca9\ub9ac",

  // landing
  "landing.headline1": "\ub2e4\ub974\uac8c \ud2b8\ub808\uc774\ub529,",
  "landing.headline2": "Ride the ",
  "landing.cta": "Google\ub85c \uacc4\uc18d",
  "landing.disclaimer": "\ud14c\uc2a4\ud2b8 \ud658\uacbd\uc785\ub2c8\ub2e4. \uc2e4\uc81c \uc790\uae08\uc740 \uc0ac\uc6a9\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",

  // login
  "login.title": "Supercycl\uc5d0 \ub85c\uadf8\uc778",
  "login.mockName": "\ud64d\uae38\ub3d9",
  "login.mockInitial": "\ud64d",
  "login.continueAs": "{name}(\uc73c)\ub85c \uacc4\uc18d",

  // terms
  "terms.title": "\uc774\uc6a9\uc57d\uad00 \ub3d9\uc758",
  "terms.agree": "",
  "terms.tos": "\uc774\uc6a9\uc57d\uad00",
  "terms.privacy": "\uac1c\uc778\uc815\ubcf4 \ucc98\ub9ac\ubc29\uce68",
  "terms.and": " \ubc0f ",
  "terms.accept": "\ub3d9\uc758",

  // onboarding
  "onboarding.settingUp": "\ud2b8\ub808\uc774\ub529 \uacc4\uc815\uc744\n\uc124\uc815\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4",
  "onboarding.complete": "\ubaa8\ub4e0 \uc900\ube44\uac00 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4!",
  "onboarding.step.wallet": "\uc9c0\uac11 \uc0dd\uc131 \uc911",
  "onboarding.step.connect": "Hyperliquid \uc5f0\uacb0 \uc911",
  "onboarding.step.funds": "\ud14c\uc2a4\ud2b8 \uc790\uae08 \ucda9\uc804 \uc911",
  "onboarding.deposited": "{amount} USDC \ud14c\uc2a4\ud2b8 \uc790\uae08\uc774 \uc785\uae08\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
  "onboarding.balance": "\uc794\uc561",
  "onboarding.startTrading": "\ud2b8\ub808\uc774\ub529 \uc2dc\uc791",

  // trade
  "trade.market": "\uc2dc\uc7a5\uac00",
  "trade.limit": "\uc9c0\uc815\uac00",
  "trade.buyLong": "\ub9e4\uc218 / \ub871",
  "trade.sellShort": "\ub9e4\ub3c4 / \uc21f",
  "trade.priceUsdc": "\uac00\uaca9 (USDC)",
  "trade.positions": "\ud3ec\uc9c0\uc158",
  "trade.openOrder": "\ubbf8\uccb4\uacb0 \uc8fc\ubb38",
  "trade.noPositions": "\uc624\ud508 \ud3ec\uc9c0\uc158 \uc5c6\uc74c",
  "trade.noOrders": "\ubbf8\uccb4\uacb0 \uc8fc\ubb38 \uc5c6\uc74c",
  "trade.positionClosed": "\ud3ec\uc9c0\uc158 \uc885\ub8cc\ub428",
  "trade.entry": "\uc9c4\uc785",
  "trade.auto": "\uc790\ub3d9",
  "trade.orderPlaced": "{label} {symbol} \uc8fc\ubb38 \uccb4\uacb0{tpsl}",

  // orderbook
  "orderbook.price": "\uac00\uaca9",
  "orderbook.size": "\uc218\ub7c9",

  // leverage
  "leverage.title": "\ub808\ubc84\ub9ac\uc9c0 \uc870\uc815",
  "leverage.maxWarning": "\ucd5c\ub300 \ub808\ubc84\ub9ac\uc9c0 {max}x \uc81c\ud55c (\uc0ac\uc6a9\uc790 \ubcf4\ud638)",
  "leverage.noticeTitle": "\ub808\ubc84\ub9ac\uc9c0 \uc815\ucc45 \uc548\ub0b4",
  "leverage.noticeBody": "\uc774 \uacc4\uc815\uc740 \uc0ac\uc6a9\uc790 \ubcf4\ud638 \uc815\ucc45\uc5d0 \ub530\ub77c \ucd5c\ub300 \ub808\ubc84\ub9ac\uc9c0 {max}x\ub85c \uc81c\ud55c\ub429\ub2c8\ub2e4.",
  "leverage.understand": "\ud655\uc778\ud588\uc2b5\ub2c8\ub2e4",

  // tpsl
  "tpsl.title": "\uc790\ub3d9 TP/SL \uc124\uc815",
  "tpsl.takeProfit": "\uc775\uc808 (%)",
  "tpsl.stopLoss": "\uc190\uc808 (%)",
  "tpsl.note": "\uc124\uc815\uc740 \uc0c8 \uc8fc\ubb38\uc5d0\ub9cc \uc801\uc6a9\ub429\ub2c8\ub2e4. \uae30\uc874 \ud3ec\uc9c0\uc158\uc5d0\ub294 \uc601\ud5a5\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",

  // signal
  "signal.performance": "\ucd5c\uadfc 30\uc77c \uc131\uacfc",
  "signal.hit": "\uc801\uc911",
  "signal.miss": "\ubbf8\uc801\uc911",
  "signal.expired": "\ub9cc\ub8cc",
  "signal.avgPnl": "\ud3c9\uade0 \uc190\uc775",
  "signal.hitRate": "\uc801\uc911\ub960",
  "signal.noSignals": "\ud544\ud130\uc5d0 \ub9de\ub294 \uc2dc\uadf8\ub110\uc774 \uc5c6\uc2b5\ub2c8\ub2e4",
  "signal.execute": "\uc2e4\ud589",
  "signal.result": "\uacb0\uacfc: {pnl}%",
  "signal.orderConfirm": "\uc2dc\uadf8\ub110 \uc8fc\ubb38 \ud655\uc778",
  "signal.orderType": "\uc8fc\ubb38 \uc720\ud615",
  "signal.entryPrice": "\uc9c4\uc785 \uac00\uaca9",
  "signal.margin": "\uc99d\uac70\uae08",
  "signal.leverage": "\ub808\ubc84\ub9ac\uc9c0",
  "signal.modify": "\uc218\uc815",
  "signal.done": "\uc644\ub8cc",
  "signal.executeOrder": "\uc8fc\ubb38 \uc2e4\ud589",
  "signal.orderExecuted": "\uc2dc\uadf8\ub110 \uc8fc\ubb38\uc774 \uc2e4\ud589\ub418\uc5c8\uc2b5\ub2c8\ub2e4",
  "signal.usdcBased": "{amount} {currency} \uae30\uc900",
  "signal.confidence.high": "\ub192\uc74c",
  "signal.confidence.med": "\ubcf4\ud1b5",
  "signal.confidence.low": "\ub0ae\uc74c",
  "signal.status.hitTp": "TP \ub2ec\uc131",
  "signal.status.hitSl": "SL \ub3c4\ub2ec",
  "signal.status.expired": "\ub9cc\ub8cc",
  "signal.status.cancelled": "\ucde8\uc18c",

  // filter
  "filter.all": "\uc804\uccb4",
  "filter.long": "\ub871",
  "filter.short": "\uc21f",
  "filter.active": "\ud65c\uc131",
  "filter.closed": "\uc885\ub8cc",

  // portfolio
  "portfolio.totalBalance": "\ucd1d \uc794\uc561",
  "portfolio.available": "\uc0ac\uc6a9 \uac00\ub2a5",
  "portfolio.marginUsed": "\uc0ac\uc6a9 \uc99d\uac70\uae08",
  "portfolio.openPositions": "\uc624\ud508 \ud3ec\uc9c0\uc158",
  "portfolio.noPositions": "\uc624\ud508 \ud3ec\uc9c0\uc158 \uc5c6\uc74c",
  "portfolio.recentActivity": "\ucd5c\uadfc \ud65c\ub3d9",
  "portfolio.openedShort": "XRPUSDT \uc21f \uc9c4\uc785 \u00b7 2x",
  "portfolio.openedLong": "BTCUSDT \ub871 \uc9c4\uc785 \u00b7 2x",
  "portfolio.deposited": "{amount} USDC \uc785\uae08",

  // settings
  "settings.account": "\uacc4\uc815",
  "settings.tradingPrefs": "\ud2b8\ub808\uc774\ub529 \uc124\uc815",
  "settings.autoTpSl": "\uc790\ub3d9 TP/SL",
  "settings.exchange": "\uac70\ub798\uc18c \uc5f0\uacb0",
  "settings.exchangeNote": "PC \ubc84\uc804\uc5d0\uc11c\ub294 \ucd1d 6\uac1c \uac70\ub798\uc18c\uc5d0\uc11c \uac70\ub798\uac00 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
  "settings.comingSoon": "\ucd9c\uc2dc \uc608\uc815",
  "settings.about": "\uc815\ubcf4",
  "settings.website": "Supercycl \uc6f9\uc0ac\uc774\ud2b8",
  "settings.docs": "\ubb38\uc11c",
  "settings.language": "\uc5b8\uc5b4",
  "settings.addressCopied": "\uc8fc\uc18c\uac00 \ubcf5\uc0ac\ub418\uc5c8\uc2b5\ub2c8\ub2e4!",
  "settings.loggedOut": "\ub85c\uadf8\uc544\uc6c3\ub428 (\ub370\ubaa8)",
  "settings.connected": "\uc5f0\uacb0\ub428 \u2713",

  // coin selector
  "coinSelector.title": "\ucf54\uc778 \uc120\ud0dd",
  "coinSelector.search": "\ucf54\uc778 \uac80\uc0c9...",

  // nav
  "nav.trade": "\ud2b8\ub808\uc774\ub529",
  "nav.signal": "\uc2dc\uadf8\ub110",
  "nav.portfolio": "\ud3ec\ud2b8\ud3f4\ub9ac\uc624",
  "nav.settings": "\uc124\uc815",

  // relative time
  "time.justNow": "\ubc29\uae08",
  "time.mAgo": "{n}\ubd84 \uc804",
  "time.hAgo": "{n}\uc2dc\uac04 \uc804",
  "time.dAgo": "{n}\uc77c \uc804",
};

export default ko;
