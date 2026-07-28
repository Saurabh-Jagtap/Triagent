import Brand from "@/components/shared/Brand";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F6F2] px-5 py-16">
      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[650px]
          w-[650px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(169,130,46,0.10),transparent_65%)]
          md:h-[800px]
          md:w-[800px]
        "
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Brand />
        {children}
      </div>
    </main>
  );
}