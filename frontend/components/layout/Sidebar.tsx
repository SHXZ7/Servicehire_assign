"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import {
  LayoutDashboard,
  Users,
  Zap,
  X,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/leads",
    icon: Users,
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent-dim)", border: "1px solid rgba(0,229,176,0.3)" }}
          >
            <Zap size={14} style={{ color: "var(--accent)" }} />
          </div>
          <span
            className="text-xl font-bold tracking-tight font-display"
            style={{ color: "var(--accent)" }}
          >
            ServiceHive
          </span>
        </div>

        {/* Mobile close */}
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-1 rounded-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav section label */}
      <div className="px-5 mb-2">
        <p
          className="text-xs font-semibold uppercase tracking-widest font-body"
          style={{ color: "var(--text-muted)" }}
        >
          Navigation
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onMobileClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group"
              style={{
                background: isActive ? "var(--accent-dim)" : "transparent",
                color: isActive
                  ? "var(--accent)"
                  : "var(--text-secondary)",
                borderLeft: isActive
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
              }}
            >
              {/* Hover background */}
              {!isActive && (
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: "var(--bg-elevated)" }}
                />
              )}

              <Icon
                size={16}
                className="relative z-10 flex-shrink-0 transition-transform group-hover:scale-110 duration-150"
              />
              <span className="relative z-10 text-sm font-medium font-body">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom — User + Role Badge */}
      {user && (
        <div
          className="mx-3 mb-4 p-3 rounded-xl"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold font-display"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent)",
                border: "1px solid rgba(0,229,176,0.3)",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium font-body truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {user.name}
              </p>
              <span
                className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold font-mono mt-0.5"
                style={
                  user.role === "admin"
                    ? {
                        background: "rgba(0,229,176,0.12)",
                        color: "var(--accent)",
                        border: "1px solid rgba(0,229,176,0.25)",
                      }
                    : {
                        background: "rgba(74,85,104,0.2)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="w-60 min-h-screen hidden md:flex flex-col flex-shrink-0"
        style={{
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {navContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden animate-fade-in"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {navContent}
      </aside>
    </>
  );
}
