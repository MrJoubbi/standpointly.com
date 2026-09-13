import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "connected",
    build: "BUILD_ADSENSE_LIVE",
    adsensePublisherId: "ca-pub-3381513533522940",
    logoType: "html_native_text",
    gaTag: "G-R64MQ2WQ5G",
    timestamp: new Date().toISOString(),
  });
}
