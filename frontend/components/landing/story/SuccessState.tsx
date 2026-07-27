export function SuccessState() {
  return (
    <div className="flex flex-col items-center">
      {/* Success Badge */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-cyan-950 shadow-[0_8px_24px_rgba(16,185,129,0.12)]">
        <svg
          className="h-5 w-5 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          />
        </svg>
      </div>

      <h3 className="mt-6 font-newsreader text-[34px] italic leading-none text-[#13294B]">
        Invite sent.
      </h3>

      <p className="mt-2 text-[15px] text-[#6B7280]">
        Calendar updated.
      </p>
    </div>
  );
}