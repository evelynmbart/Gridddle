import { Navbar } from "@/components/NavbarNew";
import "@/index.css";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { Tiny5 } from "next/font/google";
import { useState } from "react";
import styled from "styled-components";

const font = Tiny5({ subsets: ["latin"], weight: "400" });

function MyApp({
  Component,
  pageProps,
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
        <Container>
          <Navbar />
          <Content>
            <Component {...pageProps} />
          </Content>
        </Container>
      </main>
    </SessionContextProvider>
  );
}
export default MyApp;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  padding-top: 20px;
`;
