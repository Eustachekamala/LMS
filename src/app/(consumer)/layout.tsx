import { Button } from "@/components/ui/button";
import { canAccessAdminPages } from "@/permissions/general";
import { getCurrentUser } from "@/services/clerk";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

function ConsumerLayout({children} : Readonly<{children : ReactNode}>) {
    return ( 
        <>
            <NavBar/>
            {children}
        </>
     );
}

export default ConsumerLayout;

export function NavBar(){
    return <header className="flex items-center h-16 shadow bg-background z-10">
        <nav className="flex gap-4 container">
            <Link href="/" className="mr-auto text-lg flex items-center hover:underline">Web Dev Simplified</Link>
            <Suspense>
                <SignedIn>
                    <AdminLink/>
                    <Link href="/courses" className="hover:bg-gray-800/10 flex items-center px-3 py-1 rounded-lg">My Courses</Link>
                    <Link href="/purchases" className="hover:bg-gray-800/10 flex items-center px-3 py-1 rounded-lg">Purchase History</Link>
                    <div className="size-8 self-center">
                       <UserButton appearance={{
                        elements : {
                            userButtonAvatarBox : {width: "100%", height: "100%"}
                        }
                       }}/>
                    </div>
                </SignedIn>
            </Suspense>
            <Suspense>
                <SignedOut>
                    <Button className="self-center" asChild>
                        <SignInButton> Sign In</SignInButton>
                    </Button>
                </SignedOut>
            </Suspense>
        </nav>
    </header>
}

async function AdminLink() {
    const user = await getCurrentUser({allData: true});
    console.log(user.user?.name);
    
    if(!canAccessAdminPages(user)) return null
    
    return (
        <Link href="/admin" className="hover:bg-gray-800/10 flex items-center px-3 py-1 rounded-lg">Admin</Link>
    )
}