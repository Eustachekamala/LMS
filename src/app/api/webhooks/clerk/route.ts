import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { env } from "process";
import { syncClerkUserMetadata } from "@/services/clerk";
import { deleteUser, updateUser, insertUser } from "@/features/users/db/users";

export async function POST(req: Request) {
    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id")
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if(!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        })
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    if (!env.CLERK_WEBHOOK_SECRET) {
        throw new Error("CLERK_WEBHOOK_SECRET is not defined in the environment variables.");
    }
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
    let event: WebhookEvent;

    try {
        event = wh.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature
        }) as WebhookEvent
    } catch (error) {
        console.log("Error verifying webhook:", error);
        return new Response("Error occurred", {
            status: 400,
        })
    }

    try {
        switch(event.type) {
            case "user.created":
            case "user.updated": {
                const email = event.data.email_addresses.find(email => email.id == event.data.primary_email_address_id)?.email_address
                const name = `${event.data.first_name} ${event.data.last_name}`.trim()

                if(email == null) return new Response("No Email", {status: 400})
                if(name == "") return new Response("No Name", {status: 400})
                
                if(event.type === "user.created") {
                    const user = await insertUser({
                        clerkUserId: event.data.id,
                        email,
                        name,
                        imageUrl: event.data.image_url,
                        role: "user"
                    });

                    await syncClerkUserMetadata(user);
                } else {
                    const user = await updateUser({ clerkUserId: event.data.id }, {
                        email,
                        name,
                        imageUrl: event.data.image_url,
                        role: event.data.public_metadata.role,
                    });

                    // Return a response instead of the user object
                    return new Response(JSON.stringify(user), { status: 200 });
                }
                break;
            }
            case "user.deleted": {
                if(event.data.id) {
                    await deleteUser({ clerkUserId: event.data.id });
                }
                break;
            }
        }

        return new Response("", { status: 200 });
    } catch (error) {
        console.error("Error handling webhook event:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}