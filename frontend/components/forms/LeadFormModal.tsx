"use client";

import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { leadSchema, LeadFormData } from "@/validations/lead.schema";
import { Lead } from "@/types/lead.types";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  fetchLeads: () => void;
  lead?: Lead;
}

export default function LeadFormModal({
  open,
  onClose,
  fetchLeads,
  lead,
}: Props) {
  const isEdit = !!lead;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: "New",
      source: "Website",
    },
  });

  // Reset form when lead changes or modal opens
  useEffect(() => {
    if (open) {
      if (lead) {
        reset({
          name: lead.name,
          email: lead.email,
          status: lead.status,
          source: lead.source,
        });
      } else {
        reset({
          name: "",
          email: "",
          status: "New",
          source: "Website",
        });
      }
    }
  }, [open, lead, reset]);

  const onSubmit = async (data: LeadFormData) => {
    try {
      if (isEdit) {
        await api.put(`/leads/${lead._id}`, data);
        toast.success("Lead updated successfully");
      } else {
        await api.post("/leads", data);
        toast.success("Lead created successfully");
      }
      fetchLeads();
      onClose();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message ?? "Something went wrong");
    }
  };

  const inputStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  const labelStyle = {
    color: "var(--text-secondary)",
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity animate-fade-in backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.6)" }}
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Sheet Panel */}
            <Dialog.Panel
              className="pointer-events-auto w-screen max-w-md transform transition-all ease-in-out duration-300 sm:duration-500 animate-slide-right flex flex-col"
              style={{
                background: "var(--bg-surface)",
                borderLeft: "1px solid var(--border)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5 flex-shrink-0"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <Dialog.Title
                    className="text-xl font-bold font-display"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {isEdit ? "Edit Lead" : "Create Lead"}
                  </Dialog.Title>
                  <p
                    className="text-sm font-body mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {isEdit
                      ? "Update the details for this lead."
                      : "Add a new lead to your pipeline."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-primary)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--bg-elevated)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-muted)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                  }}
                >
                  <span className="sr-only">Close panel</span>
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <form
                  id="lead-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div className="space-y-1.5 stagger">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-widest font-body"
                      style={labelStyle}
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all duration-150 placeholder:text-muted"
                      style={{
                        ...inputStyle,
                        borderColor: errors.name
                          ? "var(--danger)"
                          : "var(--border)",
                      }}
                    />
                    {errors.name && (
                      <p
                        className="flex items-center gap-1.5 text-xs font-body animate-in"
                        style={{ color: "var(--danger)" }}
                      >
                        <AlertCircle size={12} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 stagger">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-widest font-body"
                      style={labelStyle}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all duration-150 placeholder:text-muted"
                      style={{
                        ...inputStyle,
                        borderColor: errors.email
                          ? "var(--danger)"
                          : "var(--border)",
                      }}
                    />
                    {errors.email && (
                      <p
                        className="flex items-center gap-1.5 text-xs font-body animate-in"
                        style={{ color: "var(--danger)" }}
                      >
                        <AlertCircle size={12} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 stagger">
                    {/* Status */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="status"
                        className="text-xs font-semibold uppercase tracking-widest font-body"
                        style={labelStyle}
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        {...register("status")}
                        className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all duration-150 cursor-pointer"
                        style={inputStyle}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>

                    {/* Source */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="source"
                        className="text-xs font-semibold uppercase tracking-widest font-body"
                        style={labelStyle}
                      >
                        Source
                      </label>
                      <select
                        id="source"
                        {...register("source")}
                        className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all duration-150 cursor-pointer"
                        style={inputStyle}
                      >
                        <option value="Website">Website</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Referral">Referral</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div
                className="px-6 py-5 flex-shrink-0 flex items-center justify-end gap-3"
                style={{
                  background: "var(--bg-base)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-150"
                  style={{
                    color: "var(--text-secondary)",
                    background: "transparent",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--bg-elevated)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-secondary)";
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="lead-form"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl text-sm font-semibold font-body flex items-center justify-center gap-2 transition-all duration-150 min-w-[120px]"
                  style={{
                    background: isSubmitting
                      ? "rgba(0,229,176,0.6)"
                      : "var(--accent)",
                    color: "#0D0F12",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--accent-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--accent)";
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving…
                    </>
                  ) : isEdit ? (
                    "Save Changes"
                  ) : (
                    "Create Lead"
                  )}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}