import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { inter } from "@/lib/fonts";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Tır Parkı Uygulaması",
  description: "Mhmt Altnts tarafından geliştirildi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            {/* <SiteHeader /> */}
            <div className="flex-1">{children}</div>
          </div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
