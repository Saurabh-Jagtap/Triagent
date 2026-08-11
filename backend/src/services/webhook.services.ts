import type { Request } from "express";
import { processWebhook } from "corsair";
import { corsair } from "../corsair.js";
import { PROVIDERS } from "../constants/providers.js";
import { ConnectedAccountsRepository } from "@repo/db/src/index.js";

export class WebhookService {
    private static async resolveTenant(body: unknown): Promise<string> {
        const email = this.decodeEmailFromPayload(body);

        const account = await ConnectedAccountsRepository.findByProviderAndIdentifier(
            PROVIDERS.GMAIL,
            email,
        );

        if (!account) {
            throw new Error(`No connected account found for ${email}`);
        }

        return account.tenantId;
    }

    private static decodeEmailFromPayload(body: unknown): string {
        if (!body || typeof body !== "object" || !("message" in body)) {
            throw new Error("Invalid Pub/Sub payload");
        }

        const message = body.message as { data?: string };

        if (!message.data) {
            throw new Error("Missing Pub/Sub message data");
        }

        const decoded = JSON.parse(Buffer.from(message.data, "base64").toString("utf8")) as {
            emailAddress?: string;
        };

        if (!decoded.emailAddress) {
            throw new Error("Missing emailAddress");
        }

        return decoded.emailAddress.toLowerCase();
    }

    static async process(req: Request) {

        const headers: Record<string, string> = {};

        Object.entries(req.headers).forEach(([key, value]) => {
            if (typeof value === "string") {
                headers[key] = value;
            } else if (Array.isArray(value)) {
                headers[key] = value.join(",");
            }
        });

        const body = req.body;

        const tenantId = await this.resolveTenant(body);

        console.dir(body, { depth: null });
        const result = await processWebhook(
            corsair,
            headers,
            body,
            { tenantId }
        );

        console.info("[Webhook]", {
            tenantId,
            plugin: result.plugin,
            action: result.action,
            success: result.response?.success,
        });

        return result
    }
}