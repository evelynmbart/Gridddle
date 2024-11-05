"use client";

import { SignIn } from "@/components/SignIn";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Login() {
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/");
    return null;
  }

  return <SignIn />;
}
