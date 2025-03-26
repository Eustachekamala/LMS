import { UserRole } from "@/drizzle/schema";

export function canAccessAdminPages({role} : {role : UserRole | unknown}){
    return role === "admin"
}