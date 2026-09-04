"use client";

import React from "react";
import Link from "next/link";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { generateCertificatePdf } from "@/lib/clientExport";

interface CertificatePrintBarProps {
  testId: string;
  testTitle: string;
  cellName: string;
  cellDescription: string;
  xAxisName: string;
  yAxisName: string;
  x: number;
  y: number;
  name?: string | null;
  locale: string;
  version: number;
}

export function CertificatePrintBar({
  testId,
  testTitle,
  cellName,
  cellDescription,
  xAxisName,
  yAxisName,
  x,
  y,
  name,
  locale,
  version,
}: CertificatePrintBarProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDownloadPdf = () => {
    generateCertificatePdf({
      testId,
      testTitle,
      cellName,
      cellDescription,
      xAxisName,
      yAxisName,
      x,
      y,
      name: name || undefined,
      url: typeof window !== "undefined" ? window.location.href : "",
    });
  };

  const backUrl = `/${locale}/r/${testId}?x=${x.toFixed(4)}&y=${y.toFixed(4)}&v=${version}`;

  return (
    <div className="print:hidden sticky top-0 z-50 flex w-full items-center justify-between border-b border-line bg-surface/95 px-6 py-3.5 backdrop-blur-md shadow-xs">
      <Link
        href={backUrl}
        className="flex items-center gap-1.5 text-[14px] font-medium text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Result</span>
      </Link>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDownloadPdf}
          type="button"
          className="flex items-center gap-1.5 rounded-(--radius-control) border border-line bg-canvas px-4 py-2 text-[13.5px] font-medium text-ink hover:border-accent hover:text-accent transition-all active:scale-[0.98]"
        >
          <Download className="h-4 w-4 text-accent" />
          <span>Save PDF File</span>
        </button>

        <button
          onClick={handlePrint}
          type="button"
          className="flex items-center gap-1.5 rounded-(--radius-control) bg-accent px-4 py-2 text-[13.5px] font-semibold text-on-accent transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          <Printer className="h-4 w-4" />
          <span>Print Certificate</span>
        </button>
      </div>
    </div>
  );
}
