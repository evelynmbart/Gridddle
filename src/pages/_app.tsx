import { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "@/index.css";
import { Tiny5 } from "next/font/google";

const font = Tiny5({ subsets: ["latin"], weight: "400" });

function MyApp({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}
export default MyApp;
