import { and, eq } from "drizzle-orm";
import { db } from "../index.js";
import { connectedAccounts } from "../schema/connectedAccounts.js";

type CreateConnectedAccount = {
    id: string;
    tenantId: string;
    provider: string;
    externalIdentifier: string;
};

export class ConnectedAccountsRepository {

    static async create(data: CreateConnectedAccount) {
        await db.insert(connectedAccounts).values(data);
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

    static async findByProviderAndIdentifier(
        provider: string,
        externalIdentifier: string
    ) {
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