import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ServiceHive — Smart Leads Dashboard",
  description:
    "Manage, qualify, and track your leads with ServiceHive's intelligent sales dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base text-primary font-body">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--bg-elevated)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "var(--accent)",
                secondary: "var(--bg-elevated)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--danger)",
                secondary: "var(--bg-elevated)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
