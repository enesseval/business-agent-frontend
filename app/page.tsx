"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import ApiKeyInput from "@/components/api-key-input";
import FileUpload from "@/components/file-upload";
import LoadingOverlay from "@/components/loading-overlay";
import { useAnalysis } from "@/context/AnalysisContext";

export default function Home() {
   const router = useRouter();
   const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
   const [file, setFile] = useState<File | null>(null);
   const [aiRes, setAiRes] = useState("");
   const [aiStat, setAiStat] = useState<"idle" | "loading" | "done">("idle");
   const [lastRes, setLastRes] = useState<string | undefined>();
   const { setResult } = useAnalysis();

   // Handle API key validation
   const handleApiKeyValidation = (isValid: boolean) => {
      setIsApiKeyValid(isValid);
   };

   // Handle file selection
   const handleFileSelected = (selectedFile: File | null) => {
      setFile(selectedFile);
   };

   const handleAnalyze = async () => {
      if (!file || !isApiKeyValid) return;

      setAiRes("");
      setAiStat("loading");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", localStorage.getItem("geminiApiKey") || "");

      const response = await fetch("http://localhost:8000/upload-stream", {
         method: "POST",
         body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      let lastMessage = "";

      while (true) {
         const { done, value } = await reader.read();
         if (done) break;

         buffer += decoder.decode(value, { stream: true });

         const parts = buffer.split("\n\n");
         buffer = parts.pop() || "";

         for (const part of parts) {
            const line = part.trim();
            if (line.startsWith("data:")) {
               const message = line.replace("data:", "").trim();
               setAiRes(message);
            } else if (line.startsWith("data_last")) {
               const message = line.replace("data_last:", "").trim();
               lastMessage = message;
            }
         }
      }

      try {
         const parsed = JSON.parse(lastMessage);
         setResult(parsed); // bu, context'e uygun FinalResult tipinde olacak
         router.push("/result");
      } catch (error) {
         console.error("Error parsing JSON:", error);
      }

      setAiStat("done");
   };

   return (
      <main className="min-h-screen bg-gradient-to-b from-[#0f1116] to-[#0a0c10] relative">
         <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
               <h1 className="text-4xl font-bold tracking-tight text-[#f0f2f5] sm:text-5xl">
                  Business Agent <span className="text-[#10b981]">AI</span>
               </h1>
               <p className="mt-1 text-base text-[#a0a8b3] max-w-2xl mx-auto">CSV dosyalarınızı yükleyin ve yapay zeka destekli analizler alın</p>
               <p className="mt-3 text-lg text-[#d0d5dd] max-w-2xl mx-auto">Upload your CSV data and get AI-powered insights, visualizations, and actionable recommendations.</p>
            </div>
            <div className="max-w-5xl mx-auto">
               <ApiKeyInput onValidation={handleApiKeyValidation} />

               <FileUpload onFileSelected={handleFileSelected} isApiKeyValid={isApiKeyValid} onAnalyzeClick={handleAnalyze} />
            </div>
         </div>
         {aiStat !== "idle" && <LoadingOverlay message={aiRes} status={aiStat} />}
      </main>
   );
}
