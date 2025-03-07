import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@r-cz/ui";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121826" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.ryancruz.com"),
  title: "Developer Tools | Ryan Cruz",
  description: "A collection of useful developer tools",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icons/favicon.png" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tools.ryancruz.com",
    title: "Developer Tools | Ryan Cruz",
    description: "A collection of useful developer tools",
    images: [{
      url: "/social-preview.png",
      width: 1200,
      height: 630,
      alt: "Ryan Cruz Developer Tools"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools | Ryan Cruz",
    description: "A collection of useful developer tools",
    images: ["/social-preview.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
