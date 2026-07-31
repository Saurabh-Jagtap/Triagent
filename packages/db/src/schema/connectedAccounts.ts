import { pgTable, text, timestamp, unique, index } from "drizzle-orm/pg-core";

export const connectedAccounts = pgTable(
    "connected_accounts",
    {
        id: text("id").primaryKey(),
        tenantId: text("tenant_id").notNull(),
        provider: text("provider").notNull(),
        externalIdentifier: text("external_identifier").notNull(),
        displayName: text("display_name"),

        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
    },

    (table) => [
        unique("connected_accounts_provider_identifier_unique").on(
            table.provider,
            table.externalIdentifier
        ),

        index("connected_accounts_tenant_idx").on(table.tenantId),
        index("connected_accounts_provider_idx").on(table.provider),
    ]
);