import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = `postgresql://neondb_owner:npg_nl5MXBTshpk3@ep-late-pond-a1ekdyug-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };