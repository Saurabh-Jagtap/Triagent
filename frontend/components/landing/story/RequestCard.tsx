export function RequestCard() {
    return (
        <div
            className="
        w-full max-w-[260px]
        -rotate-3
        rounded-2xl
        border border-black/5
        bg-gradient-to-b
        from-white
        to-[#FBFAF7]
        p-5 md:p-6
        shadow-[0_18px_40px_-28px_rgba(19,41,75,0.18)]
      "
        >
            <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#A9822E]" />

                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A9822E]">
                    Your Request
                </span>
            </div>
            <p className="font-newsreader text-base md:text-lg italic leading-snug text-[#13294B]">
                "Schedule lunch with Sarah next Thursday."
            </p>
        </div>
    );
}