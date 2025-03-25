import { UserTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export async function inserUser(data : typeof UserTable.$inferInsert){
    const users = await db.insert(UserTable).values(data).returning()
    return users
}