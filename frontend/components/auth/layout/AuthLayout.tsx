import BackgroundPattern from "@/components/shared/BackgroundPattern";
import Brand from "@/components/shared/Brand";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F6F2] px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
      <BackgroundPattern variant="auth" />

      <div className="flex w-full flex-col items-center justify-center px-6">
        <Brand className="mb-6 sm:mb-8" />
        {children}
      </div>
    </main>
  );
}