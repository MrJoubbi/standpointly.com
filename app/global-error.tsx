"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>Something went wrong</h2>
          <p>{error?.message || "An unexpected error occurred."}</p>
        </div>
      </body>
    </html>
  );
}

