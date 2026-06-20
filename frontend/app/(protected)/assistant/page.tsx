import { Suspense } from "react";
import AssistantContent from "./AssistantContent";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssistantContent />
    </Suspense>
  );
}