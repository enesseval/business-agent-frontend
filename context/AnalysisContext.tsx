"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Chart = {
   title: string;
   type: "Bar Chart" | "Line Chart" | "Pie Chart";
   x_axis: string;
   y_axis: string;
   grouping?: string;
};

type AnalysisResult = {
   charts: Chart[];
   insights: string;
};

type FinalResult = {
   result: string; // AI'nın orijinal cevabı (ham metin)
   analyze_result: AnalysisResult; // frontend için gerekli grafik ve markdown içeriği
   cleaned_data: Record<string, any>[]; // tablo göstermek için kullanılır
};

type AnalysisContextType = {
   result: FinalResult | null;
   setResult: (data: FinalResult | null) => void;
};

const AnalysisContext = createContext<AnalysisContextType>({
   result: null,
   setResult: () => {},
});

export const useAnalysis = () => useContext(AnalysisContext);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
   const [result, setResult] = useState<FinalResult | null>(null);

   return <AnalysisContext.Provider value={{ result, setResult }}>{children}</AnalysisContext.Provider>;
};
