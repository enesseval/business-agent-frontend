import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useAnalysis } from "@/context/AnalysisContext";
import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { Button } from "./ui/button";

function DataQualitySummary() {
   const { analysis, fileName } = useAnalysis();
   if (!analysis || !fileName)
      return (
         <div className="container mx-auto px-4 py-8">
            <Card className="bg-gray-800 border-gray-700 text-gray-100 flex items-center justify-center h-80 font-bold text-3xl">Veriler Yüklenirken bir hata oluştu</Card>
         </div>
      );

   return (
      <div className="container mx-auto px-4 py-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
               <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 mb-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Ana Sayfaya Dön
               </Link>
               <h1 className="text-3xl font-bold tracking-tight text-gray-100">
                  Dashboard Önizleme: <span className="text-emerald-500">{fileName}</span>
               </h1>
               <p className="text-gray-300 mt-1">
                  {analysis.satir_sayisi} satır • {analysis.sutun_sayisi} sütun • İşlenme tarihi:{new Date().getDate()}
               </p>
            </div>
            <div className="flex gap-3">
               <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Download className="h-4 w-4" />
                  Raporu İndir
               </Button>
            </div>
         </div>

         <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700 text-gray-100">
               <CardHeader>
                  <CardTitle className="text-xl">Veri Kalitesi Özeti</CardTitle>
                  <CardDescription className="text-gray-300">Veri setinizin kalitesi ve yapısına genel bakış</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                     <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-300 mb-1">Kalite Puanı</div>
                        <div className="flex items-center">
                           <span className={cn("text-2xl font-bold mr-2", analysis.kalite_puani >= 80 ? "text-green-500" : analysis.kalite_puani >= 60 ? "text-yellow-500" : "text-red-500")}>
                              {analysis.kalite_puani}%
                           </span>
                           <Badge
                              className={cn(
                                 analysis.kalite_puani >= 80 ? "bg-green-900/30 text-green-400" : analysis.kalite_puani >= 60 ? "bg-yellow-900/30 text-yellow-400" : "bg-red-900/30 text-red-400"
                              )}
                           >
                              {analysis.kalite_puani >= 80 ? "İyi" : analysis.kalite_puani >= 60 ? "Orta" : "Zatıf"}
                           </Badge>
                        </div>
                     </div>
                     <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-300 mb-1">Tamlık</div>
                        <div className="text-2xl font-bold">{analysis.tamlik}%</div>
                     </div>
                     <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-300 mb-1">Eksik Değerler</div>
                        <div className="text-2xl font-bold">{analysis.eksik_degerler}</div>
                     </div>
                     <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-300 mb-1">Yinelenen Satırlar</div>
                        <div className="text-2xl font-bold">{analysis.yinelenen_satirlar}</div>
                     </div>
                  </div>

                  <div className="mb-4">
                     <h4 className="text-sm font-medium text-gray-300 mb-2">Veri Tipleri</h4>
                     <div className="flex flex-wrap gap-2">
                        {analysis.veri_tipleri.map((type, index) => (
                           <Badge key={index} variant="outline" className="bg-gray-900 border-gray-700 text-gray-300">
                              {type.name} : {type.count}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

export default DataQualitySummary;
