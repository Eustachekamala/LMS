import { cn } from "@/lib/utils";

function PageHeader({title, children, className} : {title:string, children? : React.ReactNode, className? : string}) {
    return ( 
        <div className={cn("mb-8 gap-4 flex items-center justify-between", className)}>
            <h1 className="text-2xl font-bold">{title}</h1>
            {children && <div>{children}</div>}
        </div>
     );
}

export default PageHeader;