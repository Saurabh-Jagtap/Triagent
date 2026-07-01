import { ChatMessage } from "@/types/pending-action";

type Props = {
  message: ChatMessage;
};

export default function TextMessage({ message }: Props) {
  return (
    <div
      className={`flex ${
        message.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={
          message.role === "user"
            ? "max-w-[78%] bg-[#2D4A5E] text-[#DCE7EE] text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-sm whitespace-pre-wrap"
            : "max-w-[70%] text-[13px] leading-relaxed text-[#1A2B35] whitespace-pre-wrap"
        }
      >
        {message.content}
      </div>
    </div>
  );
}