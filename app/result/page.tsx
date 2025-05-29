"use client";

import DataQualitySummary from "@/components/data-quality-summary";
import DynamicCharts from "@/components/dynamic-charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/context/AnalysisContext";
import React from "react";

function Result() {
   const { rawResult } = useAnalysis();
   return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative mt-14">
         <DataQualitySummary />
         <div className="container mx-auto px-4 py-8">
            <Card className="bg-gray-800 border-gray-700 text-gray-100">
               <CardHeader>
                  <CardTitle className="text-xl">Veri Görselleştirmeleri</CardTitle>
                  <CardDescription className="text-gray-300">Veri setinizden çıkarılan önemli görselleştirmeler</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                     {rawResult?.charts.map((chart, idx) => (
                        <DynamicCharts key={idx} chartConfig={chart} />
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </main>
   );
}

export default Result;
