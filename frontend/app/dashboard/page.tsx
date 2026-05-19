"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/axios";
import { Lead } from "@/types/lead.types";
import {
  Users,
  TrendingUp,
  UserCheck,
  UserX,
  ArrowUpRight,
} from "lucide-react";

interface Stats {
  total: number;
  newLeads: number;
  qualified: number;
  lost: number;
}

interface StatCardProps {
  label: string;
  value: number;
  delta?: string;
  icon: React.ElementType;
  accent?: boolean;
}

function StatCard({ label, value, delta, icon: Icon, accent }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 group cursor-default"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          accent ? "rgba(0,229,176,0.3)" : "var(--border-hover)";
        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-surface)";
      }}
    >
      <div className="flex items-start justify-between">
        <p
          className="text-xs font-semibold uppercase tracking-widest font-body"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </p>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: accent ? "var(--accent-dim)" : "var(--bg-elevated)",
            border: accent
              ? "1px solid rgba(0,229,176,0.2)"
              : "1px solid var(--border)",
            color: accent ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          <Icon size={15} />
        </div>
      </div>

      <div>
        <p
          className="text-3xl font-bold font-mono tracking-tight"
          style={{ color: accent ? "var(--accent)" : "var(--text-primary)" }}
        >
          {value}
        </p>

        {delta && (
          <p
            className="flex items-center gap-1 text-xs font-body mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowUpRight size={11} style={{ color: "var(--accent)" }} />
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div
      className="rounded-2xl p-5 space-y-3"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-8 w-8 rounded-xl" />
      </div>
      <div className="skeleton h-9 w-16 rounded" />
      <div className="skeleton h-3 w-32 rounded" />
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch all leads to compute stats (no pagination limit)
        const [allRes, newRes, qualRes, lostRes] = await Promise.all([
          api.get("/leads?limit=1"),
          api.get("/leads?status=New&limit=1"),
          api.get("/leads?status=Qualified&limit=1"),
          api.get("/leads?status=Lost&limit=1"),
        ]);

        setStats({
          total:     allRes.data.pagination?.total    ?? 0,
          newLeads:  newRes.data.pagination?.total    ?? 0,
          qualified: qualRes.data.pagination?.total   ?? 0,
          lost:      lostRes.data.pagination?.total   ?? 0,
        });
      } catch {
        // silently fall through — show zeros
        setStats({ total: 0, newLeads: 0, qualified: 0, lost: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Leads",
      value: stats?.total ?? 0,
      delta: "All time",
      icon: Users,
      accent: true,
    },
    {
      label: "New",
      value: stats?.newLeads ?? 0,
      delta: "Awaiting contact",
      icon: TrendingUp,
    },
    {
      label: "Qualified",
      value: stats?.qualified ?? 0,
      delta: "Ready to close",
      icon: UserCheck,
    },
    {
      label: "Lost",
      value: stats?.lost ?? 0,
      delta: "Closed lost",
      icon: UserX,
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Page header */}
          <div className="animate-in">
            <h2
              className="text-2xl font-bold font-display"
              style={{ color: "var(--text-primary)" }}
            >
              Overview
            </h2>
            <p
              className="text-sm font-body mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Real-time snapshot of your lead pipeline.
            </p>
          </div>

          {/* Stat Cards */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>
          )}

          {/* Quick-links section */}
          <div
            className="rounded-2xl p-5 animate-in"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              animationDelay: "0.25s",
            }}
          >
            <h3
              className="text-sm font-semibold font-display mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Quick Actions
            </h3>

            <div className="flex flex-wrap gap-3">
              <a
                href="/leads"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-150"
                style={{
                  background: "var(--accent)",
                  color: "#0D0F12",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--accent-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--accent)";
                }}
              >
                <Users size={14} />
                View All Leads
              </a>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
