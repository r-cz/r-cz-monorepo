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
  metadataBase: new URL("https://ryancruz.com"),
  title: "Ryan Cruz | Identity Engineer",
  description: "Personal website of Ryan Cruz, Identity Engineer",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icons/favicon.png" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryancruz.com",
    title: "Ryan Cruz | Identity Engineer",
    description: "Personal website of Ryan Cruz, Identity Engineer",
    images: [{
      url: "/social-preview.png",
      width: 1200,
      height: 630,
      alt: "Ryan Cruz"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Cruz | Identity Engineer",
    description: "Personal website of Ryan Cruz, Identity Engineer",
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
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
