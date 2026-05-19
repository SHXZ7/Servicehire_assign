"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";
import { LogOut, Menu, Sun, Moon } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
};

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header
      className="h-14 flex items-center justify-between px-6 flex-shrink-0"
      style={{
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--text-secondary)" }}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <h1
          className="text-lg font-bold font-display tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* User avatar + role */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-display flex-shrink-0"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid rgba(0,229,176,0.3)",
            }}
          >
            {initials}
          </div>

          <div className="hidden sm:block">
            <p
              className="text-sm font-medium font-body leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {user?.name}
            </p>
            <p
              className="text-xs font-mono capitalize"
              style={{ color: "var(--text-muted)" }}
            >
              {user?.role}
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg transition-colors flex items-center justify-center"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle theme"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {/* Divider */}
        <div
          className="h-6 w-px hidden sm:block"
          style={{ background: "var(--border)" }}
        />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium font-body transition-all duration-150"
          style={{
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--danger)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(255,77,77,0.4)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,77,77,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--text-secondary)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--border)";
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
