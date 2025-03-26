import { revalidateTag } from "next/cache"
import { getGlobalTag, getIdTag } from "@/lib/dataCache"

export function getUserGlobal(){
    return getGlobalTag("users")
}

export function getUserIdTag(id: string){
    return getIdTag("users", id)
}

export function revalidateUserCache(id: string){
    revalidateTag(getUserGlobal())
    revalidateTag(getUserIdTag(id))
}