import type { Request } from "express";
import { processWebhook } from "corsair";
import { corsair } from "../corsair.js";

export class WebhookService {
    private static resolveTenant(req: Request): string {
        const tenantId = req.query.tenantId;

        if (typeof tenantId !== "string") {
            throw new Error("Missing tenantId");
        }

        return tenantId;
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

        const tenantId = this.resolveTenant(req);

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