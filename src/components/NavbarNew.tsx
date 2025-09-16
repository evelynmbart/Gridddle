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
        redirectTo: window.location.origin,
      },
    });
  };

  const tabs = [
    { label: "Feed", href: "/" },
    { label: "Canvas", href: "/canvas" },
    ...(user ? [{ label: "Profile", href: "/profile" }] : []),
  ];

  return (
    <Container>
      <Left>
        {tabs.map((tab, index) => (
          <Tab selected={pathname === tab.href} href={tab.href} key={index}>
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
  height: 60px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 480px) {
    padding: 0 16px;
    height: 50px;
  }
`;

const Left = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Right = styled.button`
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const Tab = styled(Link)<{ selected: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.selected ? "white" : "black")};
  background: ${(props) => (props.selected ? "black" : "none")};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  // border: 1px solid
  //   ${(props) =>
    props.selected ? "rgba(102, 126, 234, 0.3)" : "transparent"};

  &:hover {
    cursor: pointer;
    color: white;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;
