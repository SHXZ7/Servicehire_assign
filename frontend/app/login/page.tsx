"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import api from "@/lib/axios";
import { loginSchema, LoginFormData } from "@/validations/login.schema";
import { useAuthStore } from "@/store/auth.store";
import { AlertCircle, Zap, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", data);
      setAuth(response.data.user, response.data.token);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden auth-grid-bg"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Accent glow blob */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,176,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl p-8 animate-in"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid rgba(0,229,176,0.3)",
            }}
          >
            <Zap size={18} style={{ color: "var(--accent)" }} />
          </div>
          <span
            className="text-2xl font-bold font-display tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            ServiceHive
          </span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1
            className="text-2xl font-bold font-display mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Sign in
          </h1>
          <p className="text-sm font-body" style={{ color: "var(--text-secondary)" }}>
            Enter your credentials to access the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-semibold uppercase tracking-widest font-body"
              style={{ color: "var(--text-secondary)" }}
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@company.com"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all duration-150 placeholder:text-muted"
              style={{
                background: "var(--bg-elevated)",
                border: errors.email
                  ? "1px solid var(--danger)"
                  : "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            {errors.email && (
              <p
                className="flex items-center gap-1.5 text-xs font-body"
                style={{ color: "var(--danger)" }}
              >
                <AlertCircle size={12} />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold uppercase tracking-widest font-body"
              style={{ color: "var(--text-secondary)" }}
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-4 py-3 rounded-xl text-sm font-body transition-all duration-150 placeholder:text-muted"
              style={{
                background: "var(--bg-elevated)",
                border: errors.password
                  ? "1px solid var(--danger)"
                  : "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            {errors.password && (
              <p
                className="flex items-center gap-1.5 text-xs font-body"
                style={{ color: "var(--danger)" }}
              >
                <AlertCircle size={12} />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl text-sm font-semibold font-body flex items-center justify-center gap-2 transition-all duration-150 mt-2"
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
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer link */}
        <p
          className="mt-6 text-center text-sm font-body"
          style={{ color: "var(--text-secondary)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold transition-colors duration-150"
            style={{ color: "var(--accent)" }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
