"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ResultLayout({ children }: Readonly<{ children: ReactNode }>) {
   const { rawResult, processingDate, cleanedData, analysis, fileName } = useAnalysis();

   const router = useRouter();

   useEffect(() => {
      if (!rawResult || !processingDate || !cleanedData || !analysis || !fileName) {
         router.push("/");
      }
   }, [rawResult, processingDate, cleanedData, analysis, fileName, router]);

   // Eğer veriler eksikse yükleniyor göster, tam ise children render et
   if (!rawResult || !processingDate || !cleanedData || !analysis || !fileName) {
      return (
         <div className="w-full min-h-screen flex items-center justify-center">
            <div className="mb-4 p-3 rounded-full bg-[#10b981]/20">
               <Loader2 className="h-40 w-40 text-[#10b981] animate-spin" />
            </div>
         </div>
      );
   }

   return <>{children}</>;
}
