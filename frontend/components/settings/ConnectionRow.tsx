type ConnectionRowProps = {
  name: string;
  connected: boolean;
  isLoading: boolean;
  isDisconnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
};

export function ConnectionRow({
  name,
  connected,
  isLoading,
  isDisconnecting,
  onConnect,
  onDisconnect,
}: ConnectionRowProps) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span
        className={[
          "w-1.5 h-1.5 rounded-full shrink-0",
          connected ? "bg-[#2A7A4B]" : "bg-[#9AA8B2]",
        ].join(" ")}
      />

      <span className="text-[13px] text-[#1A2B35]">
        {name}
      </span>

      <div className="ml-auto flex items-center gap-2">
        {isLoading ? (
          <span className="text-[11px] text-[#9AA8B2]">
            Loading...
          </span>
        ) : connected ? (
          <>
            <span className="text-[11px] text-[#2A7A4B] bg-[#EAF5EF] px-2 py-0.5 rounded-full">
              Connected
            </span>

            <button
              type="button"
              onClick={onDisconnect}
              disabled={isDisconnecting}
              className="text-[11px] text-[#8B5E5E] hover:text-[#6F3F3F] disabled:opacity-50 transition-colors"
            >
              {isDisconnecting
                ? "Disconnecting..."
                : "Disconnect"}
            </button>
          </>
        ) : (
          <>
            <span className="text-[11px] text-[#6B7280] bg-[#E8ECF0] px-2 py-0.5 rounded-full">
              Not connected
            </span>

            <button
              type="button"
              onClick={onConnect}
              className="text-[11px] text-[#8A6A25] hover:text-[#6F531D] transition-colors"
            >
              Connect
            </button>
          </>
        )}
      </div>
    </div>
  );
}