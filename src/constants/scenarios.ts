import type { AppState } from "../context/AppContext";

export interface ScenarioJump {
  readonly label: string;
  readonly route: string;
  readonly stateOverrides: Partial<AppState>;
  readonly group: "auth" | "main" | "complex";
}

export const SCENARIOS: readonly ScenarioJump[] = [
  {
    label: "Landing",
    route: "/",
    group: "auth",
    stateOverrides: {
      isLoggedIn: false,
      hasAcceptedTerms: false,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Login",
    route: "/login",
    group: "auth",
    stateOverrides: {
      isLoggedIn: false,
      hasAcceptedTerms: false,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Terms",
    route: "/terms",
    group: "auth",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: false,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Onboarding",
    route: "/onboarding",
    group: "auth",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: false,
    },
  },
  {
    label: "Trade",
    route: "/trade",
    group: "main",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "trade",
    },
  },
  {
    label: "Signal",
    route: "/trade",
    group: "main",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "signal",
    },
  },
  {
    label: "Portfolio",
    route: "/trade",
    group: "main",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "portfolio",
    },
  },
  {
    label: "Settings",
    route: "/trade",
    group: "main",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "settings",
    },
  },
  {
    label: "Order Placed",
    route: "/trade",
    group: "complex",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "trade",
    },
  },
  {
    label: "Signal→Order",
    route: "/trade",
    group: "complex",
    stateOverrides: {
      isLoggedIn: true,
      hasAcceptedTerms: true,
      hasCompletedOnboarding: true,
      activeTab: "signal",
    },
  },
];

export const SHOW_DEV_NAV =
  import.meta.env.DEV ||
  new URLSearchParams(window.location.search).has("dev");
