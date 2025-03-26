import { UserTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { revalidateUserCache } from "./cache";

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

  if (newUser == null) throw new Error("Failed to create or update User");
  revalidateUserCache(newUser.id)

  return newUser;
}

// Update an existing user
export async function updateUser({ clerkUserId }: { clerkUserId: string }, data: Partial<typeof UserTable.$inferInsert>) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (updatedUser == null) throw new Error("Failed to update User");
  revalidateUserCache(updatedUser.id)
  return updatedUser;
}

// Soft delete a user (mark as deleted)
export async function deleteUser({ clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db
    .update(UserTable)
    .set({
      deletedAt : new Date(),
      email : "redacted@gmail.com",
      name : "Deleted User",
      clerkUserId : "deleted",
      imageUrl: null
    })
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (deletedUser == null ) throw new Error("Failed to delete User");
  revalidateUserCache(deletedUser.id)
  return deletedUser;
}
