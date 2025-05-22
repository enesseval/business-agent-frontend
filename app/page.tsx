"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import ApiKeyInput from "@/components/api-key-input";

export default function Home() {
   const router = useRouter();
   const [apiKey, setApiKey] = useState<string>("");
   const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
   const [file, setFile] = useState<File | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [loadingStatus, setLoadingStatus] = useState<string>("");
   const [loadingProgress, setLoadingProgress] = useState<number>(0);
   const [loadingMessages, setLoadingMessages] = useState<string[]>([]);

   // Simulated processing function
   const simulateProcessing = async () => {
      setIsLoading(true);
      setLoadingProgress(0);
      setLoadingMessages([]);

      // Step 1: Data cleaning
      setLoadingStatus("Veriler temizleniyor...");
      setLoadingMessages((prev) => [...prev, "Veriler temizleniyor..."]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingProgress(20);

      // Step 2: Data cleaned
      setLoadingStatus("Veriler temizlendi. Veri yapısı analiz ediliyor...");
      setLoadingMessages((prev) => [...prev, "Veriler temizlendi. Veri yapısı analiz ediliyor..."]);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoadingProgress(40);

      // Step 3: Getting insights
      setLoadingStatus("İç görüler alınıyor...");
      setLoadingMessages((prev) => [...prev, "İç görüler alınıyor..."]);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setLoadingProgress(60);

      // Step 4: Creating charts
      setLoadingStatus("Grafikler oluşturuluyor...");
      setLoadingMessages((prev) => [...prev, "Grafikler oluşturuluyor..."]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingProgress(80);

      // Step 5: Finalizing
      setLoadingStatus("İşlem tamamlanıyor...");
      setLoadingMessages((prev) => [...prev, "İşlem tamamlanıyor..."]);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoadingProgress(100);

      // Complete
      setLoadingMessages((prev) => [...prev, "Analiz tamamlandı! Sonuçlar yükleniyor..."]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);

      // Redirect to demo dashboard
      router.push("/demo");
   };

   // Handle API key validation
   const handleApiKeyValidation = (key: string, isValid: boolean) => {
      setApiKey(key);
      setIsApiKeyValid(isValid);
   };

   // Handle file selection
   const handleFileSelected = (selectedFile: File | null) => {
      setFile(selectedFile);
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
               <ApiKeyInput />
            </div>
         </div>
      </main>
   );
}
