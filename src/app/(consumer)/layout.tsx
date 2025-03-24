import Link from "next/link";
import { ReactNode } from "react";

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
    return <header className="flex h-12 shadow bg-background z-10">
        <nav className="flex gap-4 container">
            <Link href="/" className="mr-auto text-lg flex items-center hover:underline px-2">Web Dev Simplified</Link>
        </nav>
    </header>
}