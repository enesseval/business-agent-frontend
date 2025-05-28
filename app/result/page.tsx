"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import React from "react";

function Result() {
   const { result } = useAnalysis();
   console.log(result);
   return <div>Result</div>;
}

export default Result;
