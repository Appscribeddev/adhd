import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImmutIQ — ADHD Focus & Execution App",
  description: "ImmutIQ helps people with ADHD finish what they start. One next step at a time.",
  openGraph: {
    title: "ImmutIQ — ADHD Focus & Execution App",
    description: "Stop losing your day to task-switching and brain fog. ImmutIQ gives you one clear next step at a time.",
    url: "https://immutiq.com",
    siteName: "ImmutIQ",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ImmutIQ — ADHD Focus & Execution App",
    description: "Stop losing your day to task-switching and brain fog. ImmutIQ gives you one clear next step at a time."
  },
  metadataBase: new URL("https://immutiq.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body>
        {gtmId ? (
          <>
            <Script id="gtm-base" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
