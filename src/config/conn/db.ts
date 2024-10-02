import { Pool } from "pg";
import envConfig from "../env";

const pool: Pool = new Pool({
  connectionString: envConfig.DATABASE_URL,
});

export default pool;