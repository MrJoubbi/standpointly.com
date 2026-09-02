"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  FileText,
  Share2,
  Printer,
  Sparkles,
} from "lucide-react";
import { MAX_NAME_LENGTH } from "@/lib/name";
import {
  generateSquareCardBlob,
  generateStoryCardBlob,
  generateCertificatePdf,
  triggerDownload,
} from "@/lib/clientExport";

interface ShareCardActionsProps {
  testId: string;
  testTitle?: string;
  cellName?: string;
  cellDescription?: string;
  xAxisName?: string;
  yAxisName?: string;
  xNegLabel?: string;
  xPosLabel?: string;
  yNegLabel?: string;
  yPosLabel?: string;
  x: number;
  y: number;
  version: number;
  locale: string;
  labels: {
    downloadPdf: string;
    nameLabel: string;
    namePlaceholder: string;
    nameNote: string;
  };
}

export function ShareCardActions({
  testId,
  testTitle = "Political Standpoint Test",
  cellName = "Standpoint Assessment",
  cellDescription = "Your measured position on the analytical standpoint grid.",
  xAxisName = "X-Axis",
  yAxisName = "Y-Axis",
  xNegLabel = "Left",
  xPosLabel = "Right",
  yNegLabel = "Libertarian",
  yPosLabel = "Authoritarian",
  x,
  y,
  version,
  locale,
  labels,
}: ShareCardActionsProps) {
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const readoutText = `${xAxisName} ${(x * 10 > 0 ? "+" : "") + (x * 10).toFixed(1)}, ${yAxisName} ${(y * 10 > 0 ? "+" : "") + (y * 10).toFixed(1)}`;
  const shareText = `I took the ${testTitle} on Standpointly and landed at ${cellName} (${readoutText}). Check your standpoint:`;

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showStatus("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      showStatus("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `My Standpoint: ${cellName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  const downloadImage = async (format: "square" | "story") => {
    setDownloadingFormat(format);
    try {
      const exportData = {
        testId,
        testTitle,
        cellName,
        cellDescription,
        x,
        y,
        xAxisName,
        yAxisName,
        xNegLabel,
        xPosLabel,
        yNegLabel,
        yPosLabel,
        url: shareUrl,
      };

      if (format === "square") {
        const blob = await generateSquareCardBlob(exportData);
        triggerDownload(blob, `standpointly-${testId}-card.png`);
      } else {
        const blob = await generateStoryCardBlob(exportData);
        triggerDownload(blob, `standpointly-${testId}-story.png`);
      }
      showStatus(format === "square" ? "Square card (1:1) downloaded!" : "Story card (9:16) downloaded!");
    } catch (e) {
      console.error("Client export failed, trying fallback", e);
      // Fallback: direct API call if client canvas fails
      try {
        const q = new URLSearchParams({
          x: x.toFixed(4),
          y: y.toFixed(4),
          v: String(version),
          locale,
          format,
        });
        const response = await fetch(`/api/og/${testId}?${q.toString()}`);
        if (!response.ok) throw new Error("API render failed");
        const blob = await response.blob();
        triggerDownload(blob, `standpointly-${testId}-${format}.png`);
      } catch (err) {
        showStatus("Could not generate card image.");
      }
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handlePdfSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDownloadingPdf(true);
    try {
      const exportData = {
        testId,
        testTitle,
        cellName,
        cellDescription,
        x,
        y,
        xAxisName,
        yAxisName,
        xNegLabel,
        xPosLabel,
        yNegLabel,
        yPosLabel,
        name: nameInput.trim() || undefined,
        url: shareUrl,
      };

      // Client-side high-fidelity PDF generation
      generateCertificatePdf(exportData);
      showStatus("Certificate PDF downloaded!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback: open print view directly
      window.open(
        `/${locale}/certificate/${testId}?x=${x.toFixed(4)}&y=${y.toFixed(4)}&v=${version}&name=${encodeURIComponent(nameInput.trim())}`,
        "_blank",
      );
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleOpenPrintView = () => {
    const printUrl = `/${locale}/certificate/${testId}?x=${x.toFixed(4)}&y=${y.toFixed(4)}&v=${version}&name=${encodeURIComponent(nameInput.trim())}`;
    window.open(printUrl, "_blank");
  };

  // Social Share Links
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="h-4 w-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    },
    {
      name: "X (Twitter)",
      icon: (
        <svg className="h-4 w-4 fill-current text-ink" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Telegram",
      icon: (
        <svg className="h-4 w-4 fill-current text-[#229ED9]" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="h-4 w-4 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: (
        <svg className="h-4 w-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Reddit",
      icon: (
        <svg className="h-4 w-4 fill-current text-[#FF4500]" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[56ch] flex-col gap-6 rounded-(--radius-card) border border-line bg-surface/80 p-6 sm:p-7 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[12px] font-mono tracking-[0.16em] uppercase text-accent font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Share & Export Standpoint
          </span>
          <p className="text-[14px] text-muted mt-1">
            Save your result as an instant social card, share directly to social networks, or download a high-res certificate.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="rounded-(--radius-control) bg-accent/10 border border-accent/20 px-3.5 py-2 text-[13px] font-medium text-accent flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Quick Visual Download Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Copy Share Link */}
        <button
          onClick={handleCopyLink}
          type="button"
          className="flex items-center justify-center gap-2 rounded-(--radius-control) border border-line bg-canvas px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied Link!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-muted" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Square Image Card (1080x1080) */}
        <button
          onClick={() => downloadImage("square")}
          disabled={downloadingFormat === "square"}
          type="button"
          className="flex items-center justify-center gap-2 rounded-(--radius-control) border border-line bg-canvas px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50 active:scale-[0.98]"
        >
          <ImageIcon className="h-4 w-4 text-accent" />
          <span>{downloadingFormat === "square" ? "Generating..." : "Save Card (1:1)"}</span>
        </button>

        {/* Story Card (1080x1920) */}
        <button
          onClick={() => downloadImage("story")}
          disabled={downloadingFormat === "story"}
          type="button"
          className="flex items-center justify-center gap-2 rounded-(--radius-control) border border-line bg-canvas px-4 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50 active:scale-[0.98]"
        >
          <Download className="h-4 w-4 text-accent" />
          <span>{downloadingFormat === "story" ? "Generating..." : "Save Story (9:16)"}</span>
        </button>
      </div>

      {/* Direct Social Media Sharing Bar */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-mono uppercase tracking-[0.14em] text-muted font-medium">
          Share Result Instantly
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-(--radius-control) border border-line bg-canvas px-3 py-1.5 text-[13px] font-medium text-ink hover:border-accent hover:bg-tint transition-all"
              title={`Share to ${social.name}`}
            >
              {social.icon}
              <span className="text-[12.5px]">{social.name}</span>
            </a>
          ))}

          {/* Native OS Share Button for Mobile */}
          <button
            onClick={handleNativeShare}
            type="button"
            className="flex items-center gap-1.5 rounded-(--radius-control) border border-accent/30 bg-accent/10 px-3 py-1.5 text-[13px] font-semibold text-accent hover:bg-accent/20 transition-all"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share...</span>
          </button>
        </div>
      </div>

      <div className="h-px bg-line/60 my-0.5" />

      {/* PDF Certificate Section */}
      <form onSubmit={handlePdfSubmit} className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="certificate-name"
            className="text-[13px] font-semibold text-ink flex items-center gap-1.5"
          >
            <FileText className="h-4 w-4 text-accent" />
            <span>{labels.nameLabel}</span>
          </label>
          <button
            type="button"
            onClick={handleOpenPrintView}
            className="text-[12px] text-muted hover:text-accent font-medium flex items-center gap-1 transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print View</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            id="certificate-name"
            name="name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
            placeholder={labels.namePlaceholder}
            className="min-w-0 flex-1 rounded-(--radius-control) border border-line bg-canvas px-4 py-2.5 text-[15px] text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={downloadingPdf}
            className="rounded-(--radius-control) bg-accent px-5 py-2.5 text-[14.5px] font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50 active:scale-[0.99] flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>{downloadingPdf ? "Generating PDF..." : labels.downloadPdf}</span>
          </button>
        </div>
        <p className="text-[12.5px] text-muted/80">
          {labels.nameNote}
        </p>
      </form>
    </div>
  );
}
