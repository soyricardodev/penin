import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { TopNav } from "./_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { CSPostHogProvider } from "./_analytics/provider";
import { SideNav } from "./_components/side-nav";
import { TailwindIndicator } from "~/components/tailwind-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PENIN - Pensamientos Intrusivos",
  description:
    "Generated by a loyal suscriber by theo on youtube and making his own t3 app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="es">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body
            className={`font-sans ${inter.variable}bg-white`}
            style={{ scrollbarColor: "rgb(185, 202, 211) rgb(247, 249, 249)" }}
          >
            <div className="css-175 pointer-events-none [flex:1_1_0%]">
              <div className="css-175 pointer-events-none [flex:1_1_0%]">
                <div className="css-175 pointer-events-auto z-0 min-h-dvh w-full flex-row">
                  <SideNav />
                  <main className="css-175 w-full shrink grow items-start overflow-y-scroll">
                    {children}
                  </main>
                </div>
              </div>
            </div>
            <TailwindIndicator />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
