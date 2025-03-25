import { UserRole } from "@/drizzle/schema";

export {}

declare global {
    interface CustomJwtSessionClaims {
        dbId? : string,
        role? : string
    }

    interface UserPublicMetadat {
        dbId? : string,
        role? : UserRole
    }
}