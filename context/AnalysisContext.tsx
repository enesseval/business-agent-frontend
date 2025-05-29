"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type Chart = {
   title: string;
   chart_type: "Bar Chart" | "Line Chart" | "Pie Chart";
   x_axis: {
      original_col_name: string;
      replaced_col_name: string;
   };
   y_axis: {
      original_col_name: string;
      replaced_col_name: string;
   };
   grouping?: string;
};

type AnalysisResult = {
   eksik_degerler: number;
   kalite_puani: number;
   satir_sayisi: number;
   sutun_sayisi: number;
   tamlik: number;
   yinelenen_satirlar: number;
   veri_tipleri: [{ name: string; count: number }, { name: string; count: number }, { name: string; count: number }, { name: string; count: number }];
};

type RawResult = {
   charts: Chart[];
   insights: string;
};

type FinalResult = {
   result: RawResult;
   analyze_result: AnalysisResult;
   cleaned_data: Record<string, any>[];
   file_name: string;
   processing_date: string;
};

type AnalysisContextType = {
   setResult: (data: FinalResult | null) => void;
   rawResult?: RawResult;
   analysis?: AnalysisResult;
   cleanedData?: Record<string, any>[];
   fileName?: string;
   processingDate?: string;
};

const AnalysisContext = createContext<AnalysisContextType>({
   setResult: () => {},
});

export const useAnalysis = () => useContext(AnalysisContext);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
   const [result, setResult] = useState<FinalResult | null>(null);

   const contextValue = useMemo(
      () => ({
         setResult,
         rawResult: result?.result,
         analysis: result?.analyze_result,
         cleanedData: result?.cleaned_data,
         fileName: result?.file_name,
         processingDate: result?.processing_date,
      }),
      [result]
   );

   return <AnalysisContext.Provider value={contextValue}>{children}</AnalysisContext.Provider>;
};
