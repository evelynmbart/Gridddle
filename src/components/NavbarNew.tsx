import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

export function Navbar() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const pathname = usePathname();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const tabs = [
    { label: "Feed", href: "/" },
    { label: "Canvas", href: "/canvas" },
    ...(user ? [{ label: "Profile", href: "/profile" }] : [])
  ];

  return (
    <Container>
      <Left>
        {tabs.map((tab) => (
          <Tab selected={pathname === tab.href} href={tab.href}>
            {tab.label}
          </Tab>
        ))}
      </Left>
      {user ? (
        <Right onClick={signOut}>Sign out</Right>
      ) : (
        <Right onClick={signIn}>Login</Right>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 30px;
  background-color: gainsboro;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 2px solid black;
  margin-bottom: 10px;
`;

const Left = styled.div`
  display: flex;
  gap: 2px;
`;

const Right = styled.div`
  font-size: 20px;
  margin: 0 4px 2px 0;
  &:hover {
    cursor: pointer;
  }
`;

const Tab = styled(Link)<{ selected: boolean }>`
  text-decoration: none;
  color: black;
  background: ${(props) => (props.selected ? "lightsteelblue" : "lightgrey")};
  height: 80%;
  padding: 2px 6px;
  border-radius: 5px 5px 0 0;
  border: 2px solid black;
  border-bottom: 2px solid
    ${(props) => (props.selected ? "lightsteelblue" : "black")};
  margin-bottom: -2px;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`;
