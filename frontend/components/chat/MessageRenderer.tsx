import { ChatMessage } from "@repo/db/src/chat";
import { ExecutionPlan } from "@repo/db/src/schema";
import TextMessageCard from "./TextMessageCard";
import ApprovalCard from "./ApprovalCard";
import SummaryMessageCard from "./SummaryMessageCard";

type Props = {
    message: ChatMessage;
    onApprove: (plan: ExecutionPlan) => void;
    onCancel: () => void;
};

export default function MessageRenderer({ message, onApprove, onCancel }: Props) {

    switch (message.type) {

        case "text":
            return (
                <TextMessageCard
                    message={message}
                />
            );

        case "summary":
            return (
                <SummaryMessageCard
                    message={message}
                />
            );

        case "approval":
            return (
                <ApprovalCard
                    plan={message.plan}
                    onApprove={onApprove}
                    onCancel={onCancel}
                />
            );

        default:
            return null;
    }

}