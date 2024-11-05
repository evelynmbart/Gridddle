import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function SignOut() {
  const supabase = useSupabaseClient();

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    console.log(res);
  };

  return (
    <div>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
