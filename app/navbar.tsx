"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
   const pathname = usePathname();

   return (
      <header className="sticky top-0 z-50 w-full border-b border-[#2a2e37] bg-[#1a1d24]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1d24]/80">
         <div className={cn("container mx-auto flex h-14 items-center", pathname === "/" ? "justify-center" : "")}>
            <div className="mr-4 flex">
               <Link href="/" className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-[#10b981]" />
                  <span className="font-bold text-xl text-[#10b981]">Business Agent AI</span>
               </Link>
            </div>
            {pathname !== "/" && (
               <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <nav className="flex items-center space-x-4">
                     <Link href="/" className={`text-sm font-medium transition-colors hover:text-[#10b981] ${pathname === "/" ? "text-[#10b981]" : "text-[#a0a8b3]"}`}>
                        Ana Sayfa
                     </Link>
                  </nav>
               </div>
            )}
         </div>
      </header>
   );
}
