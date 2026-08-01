// src/test.ts
// https://diagnoses-caliber-gullible.ngrok-free.dev/api/webhooks?tenantId=DeUVIK6sT71ju7stdd7fMCSEYM3LoIrb
// PS C:\Users\hp\Downloads\ngrok-v3-stable-windows-amd64 (2)>
import "dotenv/config";
import { EmailSyncService } from "./services/emailSync.services.js";
import { db, emails } from "@repo/db";
import { corsair } from "./corsair.js";
import { EmailService } from "./services/email.services.js";

// type HandlerArg = Parameters<typeof handler>[0];
// const handler = corsair
//   .withTenant("dev")
//   .gmail
//   .webhooks
//   .messageChanged
//   .handler;
//   const arg: HandlerArg = {} as any;

  const tenantId = "rLswOphc3mm5H15RQjM3PtcjJAtbAjDZ";
async function main() {
//     const res = await EmailSyncService.syncInbox(
//         "DeUVIK6sT71ju7stdd7fMCSEYM3LoIrb"
//     );
//     const syncedEmails = await db.select().from(emails);

// console.log(syncedEmails);
// const handler =
//   corsair
//     .withTenant("DeUVIK6sT71ju7stdd7fMCSEYM3LoIrb")
//     .gmail
//     .webhooks
//     .messageChanged
//     .handler;
//     console.log(handler)
// console.log(Object.keys(corsair.withTenant("test").gmail));
// console.log(corsair.withTenant("test").gmail);

// const webhook = corsair
//   .withTenant("dev")
//   .gmail
//   .webhooks
//   .messageChanged;

// console.dir(webhook, { depth: 5 });
// console.log("handler.length =", webhook.handler.length);
// console.log("match.length =", webhook.match.length);

const messages = await EmailService.getMessagesForSummary(
    tenantId,
    "today"
  );

  console.log("Messages for summary:", messages);
}

main().catch(console.error);