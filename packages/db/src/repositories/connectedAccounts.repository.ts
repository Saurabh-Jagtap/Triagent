import { and, eq } from "drizzle-orm";
import { db } from "../index.js";
import { connectedAccounts } from "../schema/connectedAccounts.js";

type CreateConnectedAccount = {
    id: string;
    tenantId: string;
    provider: string;
    externalIdentifier: string;
    displayName?: string;
};

export class ConnectedAccountsRepository {

    static async create(data: CreateConnectedAccount) {
        await db.insert(connectedAccounts).values(data);
    }

    static async upsert(data: CreateConnectedAccount) {
        const existing = await db.query.connectedAccounts.findFirst({
            where: and(
                eq(connectedAccounts.provider, data.provider),
                eq(
                    connectedAccounts.externalIdentifier,
                    data.externalIdentifier,
                ),
            ),
        });

        if (existing) {
            return db
                .update(connectedAccounts)
                .set({
                    tenantId: data.tenantId,
                    displayName: data.displayName,
                })
                .where(eq(connectedAccounts.id, existing.id))
                .returning();
        }

        return db
            .insert(connectedAccounts)
            .values(data)
            .returning();
    }

    static async deleteByTenantAndProvider(tenantId: string, provider: string) {
        return db
            .delete(connectedAccounts)
            .where(
                and(
                    eq(connectedAccounts.tenantId, tenantId),
                    eq(connectedAccounts.provider, provider),
                ),
            );
    }

    static async findByProviderAndIdentifier(provider: string, externalIdentifier: string) {
        return await db.query.connectedAccounts.findFirst({
            where: and(
                eq(connectedAccounts.provider, provider),
                eq(
                    connectedAccounts.externalIdentifier,
                    externalIdentifier.toLowerCase()
                )
            ),
        });
    }

    static async findByTenant(tenantId: string) {
        return await db.query.connectedAccounts.findMany({
            where: eq(
                connectedAccounts.tenantId,
                tenantId
            ),
        });
    }
}