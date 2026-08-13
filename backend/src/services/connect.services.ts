import { generateOAuthUrl, processOAuthCallback } from "corsair/oauth";
import { corsair } from "../corsair.js";
import { PROVIDERS } from "../constants/providers.js";
import { ConnectedAccountsRepository } from "@repo/db";

type ConnectParams = {
    plugin: string;
    tenantId: string;
    redirectUri: string;
};

type CompleteConnectionParams = {
    code: string;
    state: string;
    redirectUri: string;
};

type GmailProfile = {
    emailAddress: string;
};

type GoogleProfile = {
    email: string;
};

export class ConnectService {
    static async generateConnectionUrl({ plugin, tenantId, redirectUri }: ConnectParams) {
        const { url, state } = await generateOAuthUrl(corsair, plugin, {
            tenantId,
            redirectUri,
        });

        return { url, state };
    }

    static async completeConnection({ code, state, redirectUri }: CompleteConnectionParams) {
        const result = await processOAuthCallback(corsair, {
            code,
            state,
            redirectUri,
        });

        // Only Gmail needs this mapping for webhook resolution
        if (result.plugin === PROVIDERS.GMAIL) {
            const profile = await this.getGmailProfile(result.tenantId);

            await this.saveConnectedAccount(
                result.tenantId,
                PROVIDERS.GMAIL,
                profile.emailAddress.toLowerCase(),
            );
        }

        if (result.plugin === PROVIDERS.GOOGLE_CALENDAR) {
            await this.saveConnectedAccount(
                result.tenantId,
                PROVIDERS.GOOGLE_CALENDAR,
                result.tenantId,
                "Google Calendar",
            );
        }

        return result;
    }

    private static async getGmailProfile(tenantId: string): Promise<GmailProfile> {
        const tenantCorsair = corsair.withTenant(tenantId);

        const accessToken = await tenantCorsair.gmail.keys.get_access_token();

        const response = await fetch(
            "https://gmail.googleapis.com/gmail/v1/users/me/profile",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Gmail profile");
        }

        return (await response.json()) as GmailProfile;
    }

    private static async saveConnectedAccount(
        tenantId: string,
        provider: string,
        externalIdentifier: string,
        displayName?: string
    ) {
        await ConnectedAccountsRepository.upsert({
            id: crypto.randomUUID(),
            tenantId,
            provider,
            externalIdentifier,
            ...(displayName !== undefined && { displayName }),
        });
    }

    static async getConnections(userId: string) {
        const accounts = await ConnectedAccountsRepository.findByTenant(userId);

        return {
            gmail: {
                connected: accounts.some(
                    (account) =>
                        account.provider === PROVIDERS.GMAIL
                ),
            },

            googleCalendar: {
                connected: accounts.some(
                    (account) =>
                        account.provider === PROVIDERS.GOOGLE_CALENDAR
                ),
            },
        };
    }

    private static async revokeGoogleToken(refreshToken: string) {
    const response = await fetch(
        "https://oauth2.googleapis.com/revoke",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                token: refreshToken,
            }),
        },
    );

    // Google returns 200 when the token was successfully revoked.
    // 400 can mean the token was already invalid/revoked.
    if (!response.ok && response.status !== 400) {
        throw new Error("Failed to revoke Google authorization");
    }
}

static async disconnect(tenantId: string,provider: string) {
    const tenantCorsair = corsair.withTenant(tenantId);

    const refreshToken =
        provider === PROVIDERS.GMAIL
            ? await tenantCorsair.gmail.keys.get_refresh_token()
            : provider === PROVIDERS.GOOGLE_CALENDAR
                ? await tenantCorsair.googlecalendar.keys.get_refresh_token()
                : null;

    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    await this.revokeGoogleToken(refreshToken);

    if (provider === PROVIDERS.GMAIL) {
        await tenantCorsair.gmail.keys.set_refresh_token("");
        await tenantCorsair.gmail.keys.set_access_token("");
    }

    if (provider === PROVIDERS.GOOGLE_CALENDAR) {
        await tenantCorsair.googlecalendar.keys.set_refresh_token("");
        await tenantCorsair.googlecalendar.keys.set_access_token("");
    }

    await ConnectedAccountsRepository.deleteByTenantAndProvider(
        tenantId,
        provider,
    );
}
}