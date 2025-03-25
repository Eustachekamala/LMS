import { UserTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

// Insert or update a user based on conflict (e.g., on `clerkUserId`)
export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .onConflictDoUpdate({
      target: [UserTable.clerkUserId],
      set: data,
    })
    .returning();

  if (!newUser) throw new Error("Failed to create or update User");

  return newUser;
}

// Update an existing user
export async function updateUser({ clerkUserId }: { clerkUserId: string }, data: Partial<typeof UserTable.$inferInsert>) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (!updatedUser) throw new Error("Failed to update User");

  return updatedUser;
}

// Soft delete a user (mark as deleted)
export async function deleteUser({ clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db
    .delete(UserTable)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (!deletedUser) throw new Error("Failed to delete User");

  return deletedUser;
}
