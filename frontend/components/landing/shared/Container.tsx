type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 xl:px-12 ${className}`}
    >
      {children}
    </div>
  );
}