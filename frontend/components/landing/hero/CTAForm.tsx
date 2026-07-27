export function CTAForm() {
  return (
    <form className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
      <input
        type="email"
        placeholder="Enter your work email"
        className="
          h-14
          flex-1
          rounded-xl
          border
          border-[#E4E0D2]
          bg-white
          px-5
          text-[15px]
          outline-none
          transition
          placeholder:text-[#9295A3]
          focus:border-[#161A2B]
        "
      />

      <button
        className="
          h-14
          rounded-xl
          bg-[#161A2B]
          px-7
          font-medium
          text-white
          transition-all
          hover:bg-[#20263B]
        "
      >
        Get Started →
      </button>
    </form>
  );
}