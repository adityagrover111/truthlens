/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows the app to be embedded in iframes on Vercel previews
  reactStrictMode: true,
  // Makes sure environment variables are only available server-side (not exposed to browser)
  // GEMINI_API_KEY and TAVILY_API_KEY are NOT listed here — that keeps them secret
  env: {
    // Only put PUBLIC variables here (ones safe for the browser to see)
    // Never put API keys here!
  },
};

module.exports = nextConfig;
