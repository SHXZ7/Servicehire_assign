"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import api from "@/lib/axios";
import { Lead } from "@/types/lead.types";
import LeadsTable from "@/components/table/LeadsTable";
import useDebounce from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import LeadFormModal from "@/components/forms/LeadFormModal";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ExportCSVButton from "@/components/buttons/ExportCSVButton";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 400);
  const isDebouncing = search !== debouncedSearch;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/leads?page=${page}&search=${debouncedSearch}&status=${status}&source=${source}&sort=${sort}`
      );
      setLeads(response.data.data);
      setPages(response.data.pagination.pages);
      setTotal(response.data.pagination.total);
    } catch {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      setDeletingId(id);
      await api.delete(`/leads/${id}`);
      toast.success("Lead deleted");
      fetchLeads();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, status, source, sort, page]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, source, sort]);

  const selectStyle: React.CSSProperties = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "10px",
    padding: "8px 12px",
    fontSize: "0.875rem",
    fontFamily: "var(--font-body)",
    cursor: "pointer",
    outline: "none",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 animate-in">
            <div>
              <h2
                className="text-2xl font-bold font-display"
                style={{ color: "var(--text-primary)" }}
              >
                Leads
              </h2>
              <p
                className="text-sm font-body mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                {loading
                  ? "Loading…"
                  : `${total} lead${total !== 1 ? "s" : ""} total`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <ExportCSVButton data={leads} filename="leads.csv" />

              <button
                id="add-lead-btn"
                onClick={() => {
                  setSelectedLead(undefined);
                  setOpen(true);
                }}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all duration-150"
              >
                <Plus size={15} />
                Add Lead
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div
            className="flex flex-wrap items-center gap-3 p-4 rounded-2xl animate-in"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              animationDelay: "0.05s",
            }}
          >
            {/* Search with debounce indicator */}
            <div className="relative flex-1 min-w-48">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                id="leads-search"
                type="text"
                placeholder="Search name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl text-sm font-body transition-all duration-150"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
              {isDebouncing && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 spinner" />
              )}
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                id="leads-status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={selectStyle}
                className="pr-8"
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Source filter */}
            <div className="relative">
              <select
                id="leads-source-filter"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={selectStyle}
                className="pr-8"
              >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                id="leads-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
                style={selectStyle}
                className="pr-8"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div
            className="animate-in"
            style={{ animationDelay: "0.1s" }}
          >
            {loading ? (
              <TableSkeleton />
            ) : (
              <LeadsTable
                leads={leads}
                onEdit={(lead) => {
                  setSelectedLead(lead);
                  setOpen(true);
                }}
                onDelete={deleteLead}
                deletingId={deletingId}
              />
            )}
          </div>

          {/* Pagination */}
          {!loading && (
            <div
              className="flex items-center justify-between animate-in"
              style={{ animationDelay: "0.15s" }}
            >
              <p
                className="text-sm font-body font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                Page{" "}
                <span style={{ color: "var(--text-secondary)" }}>{page}</span>{" "}
                of{" "}
                <span style={{ color: "var(--text-secondary)" }}>{Math.max(1, pages)}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  id="pagination-prev"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: Math.max(1, Math.min(pages, 7)) }, (_, i) => {
                  const pageNum = i + 1;
                  const isActive = page === pageNum;
                  return (
                    <button
                      key={pageNum}
                      id={`pagination-page-${pageNum}`}
                      onClick={() => setPage(pageNum)}
                      className="w-8 h-8 rounded-lg text-sm font-semibold font-mono transition-all duration-150"
                      style={{
                        background: isActive ? "var(--accent)" : "var(--bg-surface)",
                        border: isActive
                          ? "1px solid var(--accent)"
                          : "1px solid var(--border)",
                        color: isActive ? "#0D0F12" : "var(--text-secondary)",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  id="pagination-next"
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  disabled={page >= Math.max(1, pages)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Lead Form Modal (slide-in sheet) */}
          <LeadFormModal
            open={open}
            onClose={() => setOpen(false)}
            fetchLeads={fetchLeads}
            lead={selectedLead}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}