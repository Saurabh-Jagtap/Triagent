// src/test.ts

import "dotenv/config";
import { EmailSyncService } from "./services/emailSync.services.js";
import { db, emails } from "@repo/db";


async function main() {
    const res = await EmailSyncService.syncInbox(
        "DeUVIK6sT71ju7stdd7fMCSEYM3LoIrb"
    );
    const syncedEmails = await db.select().from(emails);

console.log(syncedEmails);
}

main().catch(console.error);