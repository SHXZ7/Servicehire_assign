"use client";

import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Lead } from "@/types/lead.types";
import { Download } from "lucide-react";

interface Props {
  data: Lead[];
  filename: string;
}

export default function ExportCSVButton({ data, filename }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const buttonStyle = {
    background: "transparent",
    border: "1px solid var(--border)",
    color: "var(--text-secondary)",
  };

  const hoverStyle = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.background = "var(--bg-elevated)";
    e.currentTarget.style.color = "var(--text-primary)";
    e.currentTarget.style.borderColor = "rgba(0,229,176,0.4)";
  };

  const leaveStyle = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.background = buttonStyle.background;
    e.currentTarget.style.color = buttonStyle.color;
    e.currentTarget.style.borderColor = buttonStyle.border;
  };

  if (!isMounted) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body opacity-50 cursor-not-allowed"
        style={buttonStyle}
      >
        <Download size={14} />
        Export CSV
      </button>
    );
  }

  return (
    <CSVLink
      data={data}
      filename={filename}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-150"
      style={buttonStyle}
      onMouseEnter={hoverStyle}
      onMouseLeave={leaveStyle}
    >
      <Download size={14} />
      Export CSV
    </CSVLink>
  );
}
