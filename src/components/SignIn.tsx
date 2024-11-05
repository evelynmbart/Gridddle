import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function SignIn() {
  const supabase = useSupabaseClient();

  const signIn = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "github"
    });
    console.log(res);
  };

  return (
    <div>
      <button onClick={signIn}>Login with Github</button>
    </div>
  );
}