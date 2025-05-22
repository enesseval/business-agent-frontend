import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Key } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

function ApiKeyInput() {
   return (
      <Card className="mb-6 border-2 bg-[#1a1d24] border-[#2a2e37] text-[#f0f2f5]">
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
                  <Input type="password" placeholder="API anahtarınızı girin" className="h-10 bg-[#0f1116] border-[#2a2e37] text-[#f0f2f5] placeholder:text-[#a0a8b3]" />
               </div>
               <Button>
                  Doğrula
                  {/* {isValidating ? (
                     <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Doğrulanıyor
                     </>
                  ) : isValidated ? (
                     <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Doğrulandı
                     </>
                  ) : (
                     "Doğrula"
                  )} */}
               </Button>
            </div>

            {/* {error && (
              <Alert variant="destructive" className="mt-3 bg-red-900/50 border-red-800 text-red-200">
                 <AlertCircle className="h-4 w-4" />
                 <AlertDescription>{error}</AlertDescription>
              </Alert>
           )} */}

            {/* {isValidated && (
              <Alert className="mt-3 bg-[#10b981]/20 border-[#10b981]/30 text-[#d0d5dd]">
                 <CheckCircle className="h-4 w-4 text-[#10b981]" />
                 <AlertDescription>API anahtarı başarıyla doğrulandı. Şimdi CSV dosyanızı yükleyebilirsiniz.</AlertDescription>
              </Alert>
           )} */}
         </CardContent>
      </Card>
   );
}

export default ApiKeyInput;
