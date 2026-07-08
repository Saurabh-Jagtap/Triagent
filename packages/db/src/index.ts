import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./client.js";

import * as schema from "./schema/index.js";

export const db = drizzle(pool, {
  schema,
});

export { pool };

export { schema };

// Re-export all tables directly
export * from "./schema/index.js";