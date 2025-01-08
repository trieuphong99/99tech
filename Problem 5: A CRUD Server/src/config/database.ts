import { DataSource } from "typeorm";
import { Resource } from "../models/resource";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.db",
  synchronize: true, // Automatically creates database schema on startup
  logging: false,
  entities: [Resource], // Specify all entity models here
  subscribers: [],
  migrations: [],
});
