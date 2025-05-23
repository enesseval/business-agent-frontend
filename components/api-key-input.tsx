import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, Key, XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import checkGeminiApi from "@/api/gemini";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ApiKeyInputProps {
   onValidation: (isValid: boolean) => void;
}

function ApiKeyInput({ onValidation }: ApiKeyInputProps) {
   const [apiKey, setApiKey] = useState("");
   const [isValidating, setIsValidating] = useState(false);
   const [isValidated, setIsValidated] = useState(false);
   const [error, setError] = useState(false);

   const checkApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
      setApiKey(e.target.value);
      setIsValidated(false);
      setError(false);
      localStorage.removeItem("geminiApiKey");
      onValidation(false);
   };

   const checkApiKey = async () => {
      setIsValidating(true);
      setIsValidated(false);
      setError(false);

      try {
         const res = await checkGeminiApi(apiKey);
         console.log(res);
         if (res?.success) {
            setIsValidated(true);
            onValidation(true);
            localStorage.setItem("geminiApiKey", apiKey);
            toast.success("API Anahtarı doğrulandı.Lütfen CSV dosyanızı yükleyiniz.");
         } else {
            setIsValidated(false);
            setError(true);
            onValidation(false);
            toast.error(`API Anahtarı doğrulanamadı.Lütfen geçerli bir API Anahtarı giriniz.`);
         }
      } catch (error) {
         setIsValidated(false);
         setError(true);
         onValidation(false);
         toast.error(`API Anahtarı doğrulanamadı.Lütfen geçerli bir API Anahtarı giriniz.`);
      } finally {
         setIsValidating(false);
      }
   };

   return (
      <Card className="mb-6 border-2 bg-[#1a1d24] border-[#2a2e37] text-[#f0f2f5] gap-2">
         <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
               <Key className="h-5 w-5 mr-2 text-[#10b981]" />
               API Anahtarı
            </CardTitle>
            <CardDescription className="text-[#a0a8b3]">Analiz için Gemini API anahtarınızı girin.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
               <div className="flex-1">
                  <Input
                     onChange={checkApiKeyChange}
                     value={apiKey}
                     type="password"
                     placeholder="API anahtarınızı girin"
                     className={cn("h-10 bg-[#0f1116] border-[#2a2e37] text-[#f0f2f5] placeholder:text-[#a0a8b3]", isValidated && "border-[#10b981]", error && "border-red-500")}
                  />
               </div>
               <Button
                  disabled={isValidating || !apiKey}
                  className={cn("h-10 cursor-pointer hover:bg-[#2a2e37]", isValidated && "border-[#10b981]", error && "border-red-500")}
                  variant={"outline"}
                  onClick={checkApiKey}
               >
                  {isValidating ? (
                     <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Doğrulanıyor
                     </>
                  ) : isValidated ? (
                     <>
                        <CheckCircle className={cn("h-4 w-4 mr-2", isValidated && "text-[#10b981]", error && "text-red-500")} />
                        Doğrulandı
                     </>
                  ) : error ? (
                     <>
                        <XCircle className="h-4 w-4 mr-2 text-red-500" />
                        Doğrulanamadı
                     </>
                  ) : (
                     "Doğrula"
                  )}
               </Button>
            </div>
         </CardContent>
      </Card>
   );
}

export default ApiKeyInput;
