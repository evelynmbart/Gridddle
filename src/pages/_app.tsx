import { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "@/index.css";
import { Tiny5 } from "next/font/google";
import styled from "styled-components";
import { Navbar } from "@/components/NavbarNew";

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
  background-color: #406e8e;
  height: 100vh;
  width: 100vw;
  max-width: 500px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Content = styled.div`
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding-top: 20px;
`;
