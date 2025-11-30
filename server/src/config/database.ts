import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected via Prisma");
  } catch (error: any) {
    console.error("❌ Prisma connection error:", error);
    process.exit(1);
  }
};
