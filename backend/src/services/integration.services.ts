import { pool } from "@repo/db";
import { corsair } from "../corsair.js";

export class IntegrationService {
  async disconnect(tenantId: string,plugin: string) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Find integration
      const integrationResult = await client.query(
        `
        SELECT id
        FROM corsair_integrations
        WHERE name = $1
        LIMIT 1
        `,
        [plugin]
      );

      if (integrationResult.rowCount === 0) {
        throw new Error("Plugin not found.");
      }

      const integrationId =
        integrationResult.rows[0].id;

      console.log({
        tenantId,
        plugin,
        integrationId,
      });
      // Find connected account
      const accountResult = await client.query(
        `
        SELECT id
        FROM corsair_accounts
        WHERE tenant_id = $1
          AND integration_id = $2
        LIMIT 1
        `,
        [tenantId, integrationId]
      );

      const accounts = await client.query(
        `
  SELECT
    id,
    tenant_id,
    integration_id
  FROM corsair_accounts
  `
      );

      console.table(accounts.rows);

      const integrations = await client.query(`
  SELECT id, name
  FROM corsair_integrations
`);

      console.table(integrations.rows);

      if (accountResult.rowCount === 0) {
        throw new Error("Plugin is not connected.");
      }

      const accountId = accountResult.rows[0].id;

      // Delete synced events
      await client.query(
        `
        DELETE FROM corsair_events
        WHERE account_id = $1
        `,
        [accountId]
      );

      // Delete synced entities
      await client.query(
        `
        DELETE FROM corsair_entities
        WHERE account_id = $1
        `,
        [accountId]
      );

      // Delete oauth account
      await client.query(
        `
        DELETE FROM corsair_accounts
        WHERE id = $1
        `,
        [accountId]
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async getConnectionStatus(tenantId: string) {
    const status = await corsair.manage.connectionStatus.get({ tenantId });

    return status;
  }
}

export const integrationService =
  new IntegrationService();