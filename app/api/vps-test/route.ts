import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "connected",
    build: "BUILD_GA_DIRECT_HEAD_VERIFIED",
    logoType: "html_native_text",
    gaTag: "G-R64MQ2WQ5G",
    timestamp: new Date().toISOString(),
  });
}
