import dotenv from "dotenv";
type NodeEnvironment = ("dev" | "production");

// It should load the env file based on the NODE_ENV
const _NODE_ENV: NodeEnvironment = <NodeEnvironment>(process.env.NODE_ENV || "dev");

dotenv.config({ path: `.env.${_NODE_ENV}` });

console.log("Booting in NODE_ENV: ", _NODE_ENV);

interface IConfig {
  DATABASE_URL: string;
  JWT_SECRET: string;
  PORT: number;
}

const config: IConfig = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  PORT: parseInt(process.env.PORT || "3000")
};

// Checks for env keys if not appropriately set
if (!config.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (!config.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export default config;