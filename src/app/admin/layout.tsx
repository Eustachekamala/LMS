import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode} from "react";

function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default AdminLayout;

export function NavBar() {
  return (
    
      <header className="flex items-center h-16 shadow bg-background z-10">
        <nav className="flex gap-4 container">
            <div className="mr-auto flex items-center gap-2">
                <Link href="/" className="text-lg hover:underline">
                    Web Dev Simplified
                </Link>
                <Badge>Admin</Badge>
            </div>
            <Link
                href="/admin/courses"
                className="hover:bg-gray-800/10 flex items-center px-3 py-1 rounded-lg"
            >
                Courses
            </Link>
            <Link
                href="/admin/products"
                className="hover:bg-gray-800/10 flex items-center px-3 py-1 rounded-lg"
            >
                Products
            </Link>
            <Link
                href="/admin/sales"
                className="hover:bg-gray-800/10 flex items-center px-3 py-1 rounded-lg"
            >
                Sales
            </Link>
          <div className="size-8 self-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: "100%", height: "100%" },
                },
              }}
            />
          </div>
        </nav>
      </header>
  );
}
