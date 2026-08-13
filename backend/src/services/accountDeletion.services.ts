import {
    db,
    eq,
    user,
    inArray,
    verification,
    connectedAccounts,
    emails,
    corsairAccounts,
    corsairEntities,
    corsairEvents,
} from "@repo/db";

import { corsair } from "../corsair.js";
import { PROVIDERS } from "../constants/providers.js";

export class AccountDeletionService {

    static async deleteAccount(userId: string) {
        // 1. Find the user
        const [currentUser] = await db
            .select({
                id: user.id,
                email: user.email,
            })
            .from(user)
            .where(eq(user.id, userId));

        if (!currentUser) {
            throw new Error("User not found");
        }

        const tenantId = currentUser.id;

        // 2. Revoke Google integrations before deleting credentials
        await this.revokeGoogleIntegrations(tenantId);

        // 3. Delete all application-owned data
        await db.transaction(async (tx) => {

            // Find Corsair accounts belonging to this tenant
            const corsairTenantAccounts = await tx
                .select({
                    id: corsairAccounts.id,
                })
                .from(corsairAccounts)
                .where(eq(corsairAccounts.tenantId, tenantId));

            const corsairAccountIds =
                corsairTenantAccounts.map(
                    (item) => item.id
                );

            // Delete Corsair child records first
            if (corsairAccountIds.length > 0) {
                await tx
                    .delete(corsairEntities)
                    .where(
                        inArray(
                            corsairEntities.accountId,
                            corsairAccountIds
                        )
                    );

                await tx
                    .delete(corsairEvents)
                    .where(
                        inArray(
                            corsairEvents.accountId,
                            corsairAccountIds
                        )
                    );

                await tx
                    .delete(corsairAccounts)
                    .where(
                        inArray(
                            corsairAccounts.id,
                            corsairAccountIds
                        )
                    );
            }

            // Delete stored emails
            await tx
                .delete(emails)
                .where(eq(emails.tenantId, tenantId));

            // Delete integration mapping
            await tx
                .delete(connectedAccounts)
                .where(
                    eq(
                        connectedAccounts.tenantId,
                        tenantId
                    )
                );

            // Verification records are identified by email
            await tx
                .delete(verification)
                .where(
                    eq(
                        verification.identifier,
                        currentUser.email
                    )
                );

            // Sessions and Better Auth accounts will
            // be removed automatically when user is deleted.
            await tx
                .delete(user)
                .where(eq(user.id, userId));
        });

        return {
            success: true,
        };
    }

    private static async revokeGoogleIntegrations(
        tenantId: string
    ) {
        const tenantCorsair = corsair.withTenant(
            tenantId
        );

        await this.revokeProvider(
            PROVIDERS.GMAIL,
            async () =>
                tenantCorsair.gmail.keys.get_refresh_token()
        );

        await this.revokeProvider(
            PROVIDERS.GOOGLE_CALENDAR,
            async () =>
                tenantCorsair.googlecalendar.keys.get_refresh_token()
        );
    }

    private static async revokeProvider(
        provider: string,
        getRefreshToken: () => Promise<string | null>
    ) {
        let refreshToken: string | null = null;

        try {
            refreshToken = await getRefreshToken();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : String(error);

            if (
                message.includes("Account not found") &&
                message.includes("integration")
            ) {
                console.log(
                    `Corsair account already missing for ${provider}. Continuing account deletion.`
                );

                return;
            }

            throw error;
        }

        if (!refreshToken) {
            console.log(
                `No refresh token found for ${provider}. Continuing.`
            );

            return;
        }

        const response = await fetch(
            "https://oauth2.googleapis.com/revoke",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    token: refreshToken,
                }),
            }
        );

        if (
            !response.ok &&
            response.status !== 400
        ) {
            throw new Error(
                `Failed to revoke ${provider} authorization`
            );
        }

        console.log(
            `Google authorization revoked: ${provider}`
        );
    }
}