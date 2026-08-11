import "dotenv/config";
import { corsair } from "./corsair.js";

const tenantId = "rLswOphc3mm5H15RQjM3PtcjJAtbAjDZ";

console.log(
    Object.keys(
        corsair.withTenant(tenantId).googlecalendar.db
    )
);

const status =
    await corsair.manage.connectionStatus.get({
        tenantId,
    });

console.dir(status, { depth: null });