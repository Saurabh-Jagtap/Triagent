import TimezoneSync from "@/components/auth/TimezoneSync";
import { AppLayout } from "@/components/layout/AppLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TimezoneSync />
      
      <AppLayout>
        {children}
      </AppLayout>
    </>
  );
}