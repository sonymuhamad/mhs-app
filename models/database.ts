import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, // Replace with your database host
    dialect: process.env.DATABASE_DIALEC, // Replace with your database dialect (e.g., postgres, mysql, etc.)
  }
);
