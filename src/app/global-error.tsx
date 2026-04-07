"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f8f9fa",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              padding: "2rem 3rem",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h1 style={{ color: "#dc3545", marginBottom: "1rem" }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
              We couldn’t load this page. Please try again.
            </p>
            {error?.digest && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#999",
                  marginBottom: "1.5rem",
                }}
              >
                Error code: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
