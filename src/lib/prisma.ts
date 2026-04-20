import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../generated/prisma/client" 
import { Pool } from 'pg';

export const pool =  new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};
export default prisma;