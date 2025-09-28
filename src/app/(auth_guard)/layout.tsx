import AuthGuard from "@/components/AuthGuard";

export default function AuthGuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}