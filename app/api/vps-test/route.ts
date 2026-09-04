import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "connected",
    build: "NEW_BUILD_VERIFIED_STANDPOINTLY",
    logoType: "html_native_text",
    timestamp: new Date().toISOString(),
  });
}
