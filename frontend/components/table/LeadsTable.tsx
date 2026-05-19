import { Lead } from "@/types/lead.types";
import { Pencil, Trash2, Users, Loader2 } from "lucide-react";

interface Props {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const STATUS_STYLES: Record<
  Lead["status"],
  { bg: string; text: string; border: string }
> = {
  New: {
    bg: "rgba(59,130,246,0.1)",
    text: "#60A5FA",
    border: "rgba(59,130,246,0.2)",
  },
  Contacted: {
    bg: "rgba(255,181,71,0.1)",
    text: "#FFB547",
    border: "rgba(255,181,71,0.2)",
  },
  Qualified: {
    bg: "rgba(0,229,176,0.1)",
    text: "#00E5B0",
    border: "rgba(0,229,176,0.2)",
  },
  Lost: {
    bg: "rgba(255,77,77,0.1)",
    text: "#FF4D4D",
    border: "rgba(255,77,77,0.2)",
  },
};

const SOURCE_STYLES: Record<Lead["source"], { bg: string; text: string }> = {
  Website: { bg: "rgba(139,93,246,0.1)", text: "#A78BFA" },
  Instagram: { bg: "rgba(236,72,153,0.1)", text: "#F472B6" },
  Referral: { bg: "rgba(251,146,60,0.1)", text: "#FB923C" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LeadsTable({ leads, onEdit, onDelete, deletingId }: Props) {
  if (leads.length === 0) {
    return (
      <div
        className="rounded-2xl flex flex-col items-center justify-center py-16 gap-4"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          <Users size={24} style={{ color: "var(--text-muted)" }} />
        </div>
        <div className="text-center">
          <p
            className="text-sm font-semibold font-body"
            style={{ color: "var(--text-primary)" }}
          >
            No leads found
          </p>
          <p
            className="text-xs font-body mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            Try changing filters or create a new lead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr style={{ background: "var(--bg-elevated)" }}>
              {["Name", "Email", "Status", "Source", "Created", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest font-body"
                    style={{
                      color: "var(--text-secondary)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {leads.map((lead, idx) => (
              <tr
                key={lead._id}
                className="transition-colors duration-150 group"
                style={{
                  background: idx % 2 === 0 ? "var(--bg-surface)" : "transparent",
                  borderTop: idx === 0 ? "none" : "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background =
                    "var(--bg-elevated)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background =
                    idx % 2 === 0 ? "var(--bg-surface)" : "transparent";
                }}
              >
                {/* Name */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display flex-shrink-0"
                      style={{
                        background: "var(--bg-elevated)",
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className="text-sm font-medium font-body"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {lead.name}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-3.5">
                  <span
                    className="text-sm font-mono"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {lead.email}
                  </span>
                </td>

                {/* Status badge */}
                <td className="px-5 py-3.5">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold font-mono"
                    style={{
                      background: STATUS_STYLES[lead.status].bg,
                      color: STATUS_STYLES[lead.status].text,
                      border: `1px solid ${STATUS_STYLES[lead.status].border}`,
                    }}
                  >
                    {lead.status}
                  </span>
                </td>

                {/* Source badge */}
                <td className="px-5 py-3.5">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium font-body"
                    style={{
                      background: SOURCE_STYLES[lead.source].bg,
                      color: SOURCE_STYLES[lead.source].text,
                    }}
                  >
                    {lead.source}
                  </span>
                </td>

                {/* Created date */}
                <td className="px-5 py-3.5">
                  <span
                    className="text-xs font-mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatDate(lead.createdAt)}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      id={`edit-lead-${lead._id}`}
                      onClick={() => onEdit(lead)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-all duration-150"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(0,229,176,0.4)";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--accent)";
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "var(--accent-dim)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "var(--border)";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--text-secondary)";
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                      }}
                    >
                      <Pencil size={12} />
                      Edit
                    </button>

                    <button
                      id={`delete-lead-${lead._id}`}
                      onClick={() => onDelete(lead._id)}
                      disabled={deletingId === lead._id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        if (deletingId === lead._id) return;
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(255,77,77,0.4)";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--danger)";
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(255,77,77,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        if (deletingId === lead._id) return;
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "var(--border)";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--text-secondary)";
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                      }}
                    >
                      {deletingId === lead._id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}