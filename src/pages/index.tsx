import { Feed } from "@/components/Feed";
import { Navbar } from "@/components/NavbarNew";
import { Prompt } from "@/components/Prompt";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Prompt />
      <Link href="/canvas">Submit a drawing to this prompt</Link>
      <Feed />
    </>
  );
}
