import { generateOAuthUrl, processOAuthCallback } from "corsair/oauth";
import { corsair } from "../corsair.js";
import { PROVIDERS } from "../constants/providers.js";
import { ConnectedAccountsRepository } from "@repo/db/src/index.js";

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

            await this.saveConnectedAccount(result.tenantId, profile.emailAddress);
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

    private static async saveConnectedAccount(tenantId: string, email: string) {
        await ConnectedAccountsRepository.create({
            id: crypto.randomUUID(),
            tenantId,
            provider: PROVIDERS.GMAIL,
            externalIdentifier: email.toLowerCase(),
        });
    }
}