import { jsPDF } from "jspdf";

export interface ExportData {
  testId: string;
  testTitle: string;
  cellName: string;
  cellDescription: string;
  x: number;
  y: number;
  xAxisName: string;
  yAxisName: string;
  xNegLabel?: string;
  xPosLabel?: string;
  yNegLabel?: string;
  yPosLabel?: string;
  name?: string;
  url: string;
  date?: string;
}

/** Format coordinate to ±10 scale */
const fmtScore = (v: number) => {
  const scaled = v * 10;
  const sign = scaled > 0 ? "+" : "";
  return `${sign}${scaled.toFixed(1)}`;
};

/** Download helper for Blobs */
export function triggerDownload(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Generates a 1:1 Square PNG Card (1080x1080) for Instagram Feed, Twitter/X, Discord, LinkedIn.
 */
export async function generateSquareCardBlob(data: ExportData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const size = 1080;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  // Ground Background
  ctx.fillStyle = "#fbfaf7";
  ctx.fillRect(0, 0, size, size);

  // Decorative frame border
  ctx.strokeStyle = "#e3ded4";
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, size - 64, size - 64);

  // Top header branding
  ctx.fillStyle = "#17694c";
  ctx.font = "bold 20px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("STANDPOINTLY · OFFICIAL RESULT", size / 2, 86);

  ctx.fillStyle = "#5d6b7a";
  ctx.font = "600 24px system-ui, sans-serif";
  ctx.letterSpacing = "1px";
  ctx.fillText(data.testTitle.toUpperCase(), size / 2, 126);

  // Draw Quadrant Grid Box
  const gx = 160;
  const gy = 180;
  const gw = 760;
  const gh = 520;

  // Background of grid
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(gx, gy, gw, gh);
  ctx.strokeStyle = "#ded9ce";
  ctx.lineWidth = 2;
  ctx.strokeRect(gx, gy, gw, gh);

  // Quadrant color washes (subtle soft gradients)
  const qLeft = gx;
  const qMidX = gx + gw / 2;
  const qTop = gy;
  const qMidY = gy + gh / 2;
  const qW = gw / 2;
  const qH = gh / 2;

  // Top-Left (Auth Left: #c2564f)
  ctx.fillStyle = "rgba(194, 86, 79, 0.14)";
  ctx.fillRect(qLeft, qTop, qW, qH);
  // Top-Right (Auth Right: #4171a8)
  ctx.fillStyle = "rgba(65, 113, 168, 0.14)";
  ctx.fillRect(qMidX, qTop, qW, qH);
  // Bottom-Left (Lib Left: #4d8f62)
  ctx.fillStyle = "rgba(77, 143, 98, 0.14)";
  ctx.fillRect(qLeft, qMidY, qW, qH);
  // Bottom-Right (Lib Right: #7d5ea6)
  ctx.fillStyle = "rgba(125, 94, 166, 0.14)";
  ctx.fillRect(qMidX, qMidY, qW, qH);

  // Sub-grid dashed lines
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  for (let i = 1; i <= 5; i++) {
    const lx = gx + (gw / 6) * i;
    ctx.beginPath();
    ctx.moveTo(lx, gy);
    ctx.lineTo(lx, gy + gh);
    ctx.stroke();

    const ly = gy + (gh / 6) * i;
    ctx.beginPath();
    ctx.moveTo(gx, ly);
    ctx.lineTo(gx + gw, ly);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Major Center Axes
  ctx.strokeStyle = "#16202c";
  ctx.lineWidth = 2.5;
  // Horizontal axis (Y=0)
  ctx.beginPath();
  ctx.moveTo(gx, qMidY);
  ctx.lineTo(gx + gw, qMidY);
  ctx.stroke();
  // Vertical axis (X=0)
  ctx.beginPath();
  ctx.moveTo(qMidX, gy);
  ctx.lineTo(qMidX, gy + gh);
  ctx.stroke();

  // Axis labels on grid edges
  ctx.font = "bold 15px system-ui, sans-serif";
  ctx.fillStyle = "#5d6b7a";
  ctx.textAlign = "center";
  // Y-axis top / bottom
  if (data.yPosLabel) ctx.fillText(data.yPosLabel.toUpperCase(), qMidX, gy - 12);
  if (data.yNegLabel) ctx.fillText(data.yNegLabel.toUpperCase(), qMidX, gy + gh + 26);
  // X-axis left / right
  ctx.textAlign = "right";
  if (data.xNegLabel) ctx.fillText(data.xNegLabel.toUpperCase(), gx - 14, qMidY + 5);
  ctx.textAlign = "left";
  if (data.xPosLabel) ctx.fillText(data.xPosLabel.toUpperCase(), gx + gw + 14, qMidY + 5);

  // User standpoint coordinate point
  const px = qMidX + (data.x / 1.0) * (gw / 2);
  const py = qMidY - (data.y / 1.0) * (gh / 2);

  // Coordinate dotted guidelines to axes
  ctx.strokeStyle = "#17694c";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(px, qMidY);
  ctx.lineTo(px, py);
  ctx.lineTo(qMidX, py);
  ctx.stroke();
  ctx.setLineDash([]);

  // Glowing Outer Halo
  ctx.fillStyle = "rgba(23, 105, 76, 0.22)";
  ctx.beginPath();
  ctx.arc(px, py, 26, 0, Math.PI * 2);
  ctx.fill();

  // Point Dot Inner
  ctx.fillStyle = "#17694c";
  ctx.beginPath();
  ctx.arc(px, py, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Result Banner Text below grid
  ctx.textAlign = "center";
  ctx.fillStyle = "#17694c";
  ctx.font = "bold 20px 'IBM Plex Mono', monospace";
  ctx.letterSpacing = "3px";
  const readoutText = `${data.xAxisName.toUpperCase()} ${fmtScore(data.x)}   ·   ${data.yAxisName.toUpperCase()} ${fmtScore(data.y)}`;
  ctx.fillText(readoutText, size / 2, 760);

  // Archetype Headline
  ctx.fillStyle = "#16202c";
  ctx.font = "bold 46px system-ui, sans-serif";
  ctx.letterSpacing = "-0.5px";
  ctx.fillText(data.cellName, size / 2, 830);

  // Footer branding
  ctx.fillStyle = "#5d6b7a";
  ctx.font = "500 17px system-ui, sans-serif";
  ctx.letterSpacing = "0.5px";
  ctx.fillText("Discover your standpoint at standpointly.com", size / 2, 980);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas blob conversion failed"));
    }, "image/png");
  });
}

/**
 * Generates a 9:16 Story PNG Card (1080x1920) for Instagram Stories, TikTok, WhatsApp Status.
 */
export async function generateStoryCardBlob(data: ExportData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  // Background Ground
  ctx.fillStyle = "#fbfaf7";
  ctx.fillRect(0, 0, width, height);

  // Decorative border
  ctx.strokeStyle = "#e3ded4";
  ctx.lineWidth = 5;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Header
  ctx.fillStyle = "#17694c";
  ctx.font = "bold 24px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.letterSpacing = "8px";
  ctx.fillText("STANDPOINTLY", width / 2, 160);

  ctx.fillStyle = "#5d6b7a";
  ctx.font = "bold 32px system-ui, sans-serif";
  ctx.letterSpacing = "1px";
  ctx.fillText(data.testTitle.toUpperCase(), width / 2, 220);

  ctx.strokeStyle = "#17694c";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 80, 260);
  ctx.lineTo(width / 2 + 80, 260);
  ctx.stroke();

  // Grid Box
  const gx = 120;
  const gy = 330;
  const gw = 840;
  const gh = 740;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(gx, gy, gw, gh);
  ctx.strokeStyle = "#ded9ce";
  ctx.lineWidth = 3;
  ctx.strokeRect(gx, gy, gw, gh);

  const qMidX = gx + gw / 2;
  const qMidY = gy + gh / 2;
  const qW = gw / 2;
  const qH = gh / 2;

  // Quadrants
  ctx.fillStyle = "rgba(194, 86, 79, 0.15)";
  ctx.fillRect(gx, gy, qW, qH);
  ctx.fillStyle = "rgba(65, 113, 168, 0.15)";
  ctx.fillRect(qMidX, gy, qW, qH);
  ctx.fillStyle = "rgba(77, 143, 98, 0.15)";
  ctx.fillRect(gx, qMidY, qW, qH);
  ctx.fillStyle = "rgba(125, 94, 166, 0.15)";
  ctx.fillRect(qMidX, qMidY, qW, qH);

  // Sub-grid
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  for (let i = 1; i <= 5; i++) {
    const lx = gx + (gw / 6) * i;
    ctx.beginPath();
    ctx.moveTo(lx, gy);
    ctx.lineTo(lx, gy + gh);
    ctx.stroke();

    const ly = gy + (gh / 6) * i;
    ctx.beginPath();
    ctx.moveTo(gx, ly);
    ctx.lineTo(gx + gw, ly);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Major Axes
  ctx.strokeStyle = "#16202c";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(gx, qMidY);
  ctx.lineTo(gx + gw, qMidY);
  ctx.moveTo(qMidX, gy);
  ctx.lineTo(qMidX, gy + gh);
  ctx.stroke();

  // Axis Labels
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.fillStyle = "#5d6b7a";
  ctx.textAlign = "center";
  if (data.yPosLabel) ctx.fillText(data.yPosLabel.toUpperCase(), qMidX, gy - 16);
  if (data.yNegLabel) ctx.fillText(data.yNegLabel.toUpperCase(), qMidX, gy + gh + 34);
  ctx.textAlign = "right";
  if (data.xNegLabel) ctx.fillText(data.xNegLabel.toUpperCase(), gx - 16, qMidY + 7);
  ctx.textAlign = "left";
  if (data.xPosLabel) ctx.fillText(data.xPosLabel.toUpperCase(), gx + gw + 16, qMidY + 7);

  // Coordinate point
  const px = qMidX + (data.x / 1.0) * (gw / 2);
  const py = qMidY - (data.y / 1.0) * (gh / 2);

  ctx.strokeStyle = "#17694c";
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(px, qMidY);
  ctx.lineTo(px, py);
  ctx.lineTo(qMidX, py);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(23, 105, 76, 0.25)";
  ctx.beginPath();
  ctx.arc(px, py, 34, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#17694c";
  ctx.beginPath();
  ctx.arc(px, py, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Lower Section: Archetype & Reading
  ctx.textAlign = "center";
  ctx.fillStyle = "#17694c";
  ctx.font = "bold 24px 'IBM Plex Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillText(
    `${data.xAxisName.toUpperCase()} ${fmtScore(data.x)}   ·   ${data.yAxisName.toUpperCase()} ${fmtScore(data.y)}`,
    width / 2,
    1160,
  );

  ctx.fillStyle = "#16202c";
  ctx.font = "800 62px system-ui, sans-serif";
  ctx.letterSpacing = "-1px";
  ctx.fillText(data.cellName, width / 2, 1260);

  // Description Block
  ctx.fillStyle = "#5d6b7a";
  ctx.font = "400 25px system-ui, sans-serif";
  ctx.textAlign = "center";

  // Wrap text cleanly
  const words = data.cellDescription.split(" ");
  let line = "";
  let curY = 1340;
  const maxLineW = 820;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxLineW && n > 0) {
      ctx.fillText(line, width / 2, curY);
      line = words[n] + " ";
      curY += 40;
      if (curY > 1560) break; // prevent spillover
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, curY);

  // Story CTA bottom card
  ctx.fillStyle = "#17694c";
  ctx.beginPath();
  ctx.roundRect(140, 1680, 800, 110, 24);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px system-ui, sans-serif";
  ctx.letterSpacing = "1px";
  ctx.fillText("Take the free assessment", width / 2, 1730);

  ctx.font = "600 20px 'IBM Plex Mono', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("STANDPOINTLY.COM", width / 2, 1765);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Story canvas blob failed"));
    }, "image/png");
  });
}

/**
 * Generates an authentic A4 PDF Certificate using jsPDF.
 */
export function generateCertificatePdf(data: ExportData) {
  // A4 dimensions: 210mm x 297mm
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // Background
  doc.setFillColor(251, 250, 247); // #fbfaf7
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Outer and Inner Gold/Accent Border
  doc.setDrawColor(23, 105, 76); // #17694c
  doc.setLineWidth(1.2);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  doc.setDrawColor(227, 222, 212); // #e3ded4
  doc.setLineWidth(0.4);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Corner Ornaments
  const corners = [
    [16, 16],
    [pageWidth - 16, 16],
    [16, pageHeight - 16],
    [pageWidth - 16, pageHeight - 16],
  ];
  doc.setDrawColor(23, 105, 76);
  corners.forEach(([cx, cy]) => {
    doc.circle(cx, cy, 1.5, "FD");
  });

  // Top Monogram / Header
  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.setTextColor(23, 105, 76);
  doc.text("S T A N D P O I N T L Y", pageWidth / 2, 28, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(22, 32, 44);
  doc.text(data.testTitle.toUpperCase(), pageWidth / 2, 37, { align: "center" });

  // Divider Line
  doc.setDrawColor(23, 105, 76);
  doc.setLineWidth(0.6);
  doc.line(pageWidth / 2 - 25, 42, pageWidth / 2 + 25, 42);

  // Issued To Section
  let currentY = 54;
  if (data.name && data.name.trim()) {
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(93, 107, 122);
    doc.text("THIS CERTIFICATE IS OFFICIALLY ISSUED TO", pageWidth / 2, currentY, { align: "center" });

    currentY += 8;
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.setTextColor(22, 32, 44);
    doc.text(data.name.trim(), pageWidth / 2, currentY, { align: "center" });

    currentY += 10;
  } else {
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(93, 107, 122);
    doc.text("OFFICIAL STANDPOINT ASSESSMENT RECORD", pageWidth / 2, currentY, { align: "center" });
    currentY += 8;
  }

  // Draw Quadrant Grid Box
  const gridW = 86;
  const gridH = 86;
  const gridX = (pageWidth - gridW) / 2;
  const gridY = currentY;

  // Grid background
  doc.setFillColor(255, 255, 255);
  doc.rect(gridX, gridY, gridW, gridH, "F");
  doc.setDrawColor(222, 217, 206);
  doc.setLineWidth(0.4);
  doc.rect(gridX, gridY, gridW, gridH);

  const halfW = gridW / 2;
  const halfH = gridH / 2;
  const midX = gridX + halfW;
  const midY = gridY + halfH;

  // Soft quadrant fills
  doc.setFillColor(248, 235, 234); // Top-left (soft red)
  doc.rect(gridX, gridY, halfW, halfH, "F");
  doc.setFillColor(232, 238, 245); // Top-right (soft blue)
  doc.rect(midX, gridY, halfW, halfH, "F");
  doc.setFillColor(234, 242, 236); // Bottom-left (soft green)
  doc.rect(gridX, midY, halfW, halfH, "F");
  doc.setFillColor(239, 236, 244); // Bottom-right (soft purple)
  doc.rect(midX, midY, halfW, halfH, "F");

  // Grid Sub-lines
  doc.setDrawColor(240, 238, 232);
  doc.setLineWidth(0.2);
  for (let i = 1; i <= 3; i++) {
    const lx = gridX + (gridW / 4) * i;
    doc.line(lx, gridY, lx, gridY + gridH);
    const ly = gridY + (gridH / 4) * i;
    doc.line(gridX, ly, gridX + gridW, ly);
  }

  // Major Axes
  doc.setDrawColor(22, 32, 44);
  doc.setLineWidth(0.5);
  doc.line(gridX, midY, gridX + gridW, midY);
  doc.line(midX, gridY, midX, gridY + gridH);

  // Calculate Standpoint Point
  const pointX = midX + (data.x / 1.0) * halfW;
  const pointY = midY - (data.y / 1.0) * halfH;

  // Guidelines to Axes
  doc.setDrawColor(23, 105, 76);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([1, 1], 0);
  doc.line(pointX, midY, pointX, pointY);
  doc.line(midX, pointY, pointX, pointY);
  doc.setLineDashPattern([], 0);

  // Dot
  doc.setFillColor(23, 105, 76);
  doc.circle(pointX, pointY, 2.2, "F");
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.6);
  doc.circle(pointX, pointY, 2.2, "D");

  // Grid Labels
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(93, 107, 122);
  if (data.yPosLabel) doc.text(data.yPosLabel, midX, gridY - 2, { align: "center" });
  if (data.yNegLabel) doc.text(data.yNegLabel, midX, gridY + gridH + 4, { align: "center" });
  if (data.xNegLabel) doc.text(data.xNegLabel, gridX - 2, midY + 1, { align: "right" });
  if (data.xPosLabel) doc.text(data.xPosLabel, gridX + gridW + 2, midY + 1, { align: "left" });

  currentY = gridY + gridH + 14;

  // Coordinate Reading
  doc.setFont("courier", "bold");
  doc.setFontSize(9);
  doc.setTextColor(23, 105, 76);
  const readingText = `${data.xAxisName.toUpperCase()} ${fmtScore(data.x)}   ·   ${data.yAxisName.toUpperCase()} ${fmtScore(data.y)}`;
  doc.text(readingText, pageWidth / 2, currentY, { align: "center" });

  // Archetype Heading
  currentY += 9;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(22, 32, 44);
  doc.text(data.cellName, pageWidth / 2, currentY, { align: "center" });

  // Archetype Description (multi-line wrapped)
  currentY += 7;
  doc.setFont("times", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(70, 80, 95);
  const descLines = doc.splitTextToSize(data.cellDescription, 140);
  doc.text(descLines, pageWidth / 2, currentY, { align: "center", lineHeightFactor: 1.4 });

  // Footer Certificate Metadata
  const footerY = pageHeight - 32;
  doc.setDrawColor(227, 222, 212);
  doc.setLineWidth(0.4);
  doc.line(25, footerY, pageWidth - 25, footerY);

  const issueDate = data.date || new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const hashId = `STP-${data.testId.substring(0, 3).toUpperCase()}-${Math.abs(Math.round(data.x * 100))}-${Math.abs(Math.round(data.y * 100))}`;

  doc.setFont("courier", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(120, 130, 145);
  doc.text(`ISSUED: ${issueDate.toUpperCase()}   |   VERIFICATION ID: ${hashId}`, 25, footerY + 6);
  doc.text("STANDPOINTLY OPEN-METHOD MEASUREMENT INSTRUMENT · STANDPOINTLY.COM", 25, footerY + 11);

  // Save the PDF
  const filename = `standpointly-${data.testId}-certificate.pdf`;
  doc.save(filename);
}
