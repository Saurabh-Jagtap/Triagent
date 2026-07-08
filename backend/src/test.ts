import { corsair } from "./corsair.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const status = await corsair.manage.connectionStatus.get({
    tenantId: "DeUVIK6sT71ju7stdd7fMCSEYM3LoIrb",
  });

  console.dir(status, {
    depth: null,
  });
}

main().catch(console.error);