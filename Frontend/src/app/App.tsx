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

  // -------------------------
  // NOT AUTHENTICATED SCREENS
  // -------------------------
  if (!isAuthenticated) {
  if (currentScreen === "login") {
    return <LoginPage onRegisterClick={goToRegister} />;
  }

  if (currentScreen === "register") {
    return <RegisterPage onBackToLogin={goToLogin} />;
  }

  if (currentScreen === "portal") {
    return (
      <PortalSelector
        onBack={() => setCurrentScreen("landing")}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <LandingPage
  onLoginClick={goToLogin}
  onRegisterClick={goToRegister}
  onPortalClick={() => {
    window.history.replaceState(null, "", window.location.pathname); // 👈 removes #contact
    setCurrentScreen("portal");
  }}
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
      return (
        <SuperAdminPortal
          onBack={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );

    case "store":
      return (
        <StorePortal
          onBack={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );

    case "supplier":
      return (
        <SupplierPortal
          onBack={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );

    case "analyst":
      return (
        <AnalystPortal
          onBack={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );

    case "demo":
      return (
        <DemoPortal
          onBack={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      );
    case "portal":
      return (
        <PortalSelector
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
