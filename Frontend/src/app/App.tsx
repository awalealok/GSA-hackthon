import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./components/AuthContext";

import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { LandingPage } from "./components/LandingPage";
import { PortalSelector } from "./components/PortalSelector";
import { SuperAdminPortal } from "./components/SuperAdminPortal";
import { StorePortal } from "./components/StorePortal";
import { SupplierPortal } from "./components/SupplierPortal";
import { AnalystPortal } from "./components/AnalystPortal";
import { DemoPortal } from "./components/DemoPortal";

type Screen =
  | "landing"
  | "login"
  | "register"
  | "super_admin"
  | "store"
  | "supplier"
  | "analyst"
  | "demo"
  | "portal";

const roleToScreenMap = {
  super_admin: "super_admin",
  store: "store",
  supplier: "supplier",
  analyst: "analyst",
  demo: "demo",
} as const;

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  // 🔥 MAIN ROLE-BASED REDIRECT (LOGIN + REGISTER)
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      setCurrentScreen(roleToScreenMap[user.role]);
    }
  }, [isAuthenticated, user]);

  // Navigation helpers
  const goToLogin = () => setCurrentScreen("login");
  const goToRegister = () => setCurrentScreen("register");

  const handleLogout = () => {
    logout();
    setCurrentScreen("landing");
  };

  const renderPortalScreen = (onBack: () => void) => {
    switch (currentScreen) {
      case "super_admin":
        return (
          <SuperAdminPortal
            onBack={onBack}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );

      case "store":
        return (
          <StorePortal
            onBack={onBack}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );

      case "supplier":
        return (
          <SupplierPortal
            onBack={onBack}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );

      case "analyst":
        return (
          <AnalystPortal
            onBack={onBack}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );

      case "demo":
        return (
          <DemoPortal
            onBack={onBack}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        );

      default:
        return null;
    }
  };

  // -------------------------
  // NOT AUTHENTICATED SCREENS
  // -------------------------
  if (!isAuthenticated) {
  if (currentScreen === "login") {
    return (
      <LoginPage
        onRegisterClick={goToRegister}
        onBack={() => setCurrentScreen("landing")}
      />
    );
  }

  if (currentScreen === "register") {
    return (
      <RegisterPage
        onBackToLogin={goToLogin}
        onBack={() => setCurrentScreen("landing")}
      />
    );
  }

  if (currentScreen === "portal") {
    return (
      <PortalSelector
        onSelectPortal={(portalId) => setCurrentScreen(portalId)}
        onBack={() => setCurrentScreen("landing")}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  const selectedPortal = renderPortalScreen(() => setCurrentScreen("portal"));
  if (selectedPortal) {
    return selectedPortal;
  }

  return (
    <LandingPage
  onLoginClick={goToLogin}
  onRegisterClick={goToRegister}
  onPortalClick={() => {
    window.history.replaceState(null, "", window.location.pathname); // 👈 removes #contact
    setCurrentScreen("portal");
  }}
  theme={theme}
  onToggleTheme={toggleTheme}
/>

  );
}

  // -------------------------
  // AUTHENTICATED PORTALS
  

  // -------------------------
  // AUTHENTICATED PORTALS
  // -------------------------
  switch (currentScreen) {
    case "super_admin":
    case "store":
    case "supplier":
    case "analyst":
    case "demo":
      return renderPortalScreen(handleLogout);

    case "portal":
      return (
        <PortalSelector
          onSelectPortal={(portalId) => setCurrentScreen(portalId)}
          onBack={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );
    default:
      return null;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
