import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy for the public website.
 *
 * Production: restrictive policy including frame protection.
 * Development: relaxed script/connect sources required by the Next.js
 * dev server (Turbopack HMR) and no frame-ancestors directive, so the
 * sandbox preview iframe can embed the app. See docs/SECURITY.md.
 */
function buildCsp(): string {
  const directives = [
    "default-src 'self'",
    // Next.js injects inline bootstrap scripts; a nonce-based policy is
    // planned production hardening work (documented in docs/SECURITY.md).
    `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
  if (isProduction) {
    directives.push("frame-ancestors 'self' https://*.space-z.ai");
  }
  return directives.join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildCsp() },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Dev-only: the sandbox preview panel embeds the app from this origin.
  allowedDevOrigins: ["*.space-z.ai"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
