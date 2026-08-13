import "dotenv/config";
import { corsair } from "./corsair.js";

const tenantCorsair = corsair.withTenant(
    "rLswOphc3mm5H15RQjM3PtcjJAtbAjDZ"
);

const gmailRefreshToken =
    await tenantCorsair.gmail.keys.get_refresh_token();

const calendarRefreshToken =
    await tenantCorsair.googlecalendar.keys.get_refresh_token();

console.log("Gmail refresh token exists:", !!gmailRefreshToken);
console.log("Calendar refresh token exists:", !!calendarRefreshToken);