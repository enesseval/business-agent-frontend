import React from "react";
import { useState, useCallback } from "react";
import { Upload, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FileUploadProps {
   onFileSelected: (file: File | null) => void;
   isApiKeyValid: boolean;
   onAnalyzeClick: () => void;
}

function FileUpload({ onFileSelected, isApiKeyValid, onAnalyzeClick }: FileUploadProps) {
   const [file, setFile] = useState<File | null>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const fileInputRef = React.useRef<HTMLInputElement | null>(null);

   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
   }, []);

   const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
   }, []);

   const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
         e.preventDefault();
         setIsDragging(false);
         setError(null);

         const droppedFile = e.dataTransfer.files?.[0];
         if (droppedFile) {
            setFile(droppedFile);
            onFileSelected(droppedFile);
         }
      },
      [onFileSelected]
   );

   const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setError(null);
         const selectedFile = e.target.files?.[0];
         if (selectedFile) {
            setFile(selectedFile);
            onFileSelected(selectedFile);
         }
      },
      [onFileSelected]
   );

   const handleRemoveFile = () => {
      setFile(null);
      onFileSelected(null);
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
   };

   return (
      <Card className="mb-8 border-2 border-dashed border-[#2a2e37] bg-[#1a1d24] text-[#f0f2f5]">
         <CardContent className="p-6 relative">
            <div
               className={`flex flex-col items-center justify-center p-8 rounded-lg transition-colors ${isDragging ? "bg-[#10b981]/20" : "bg-[#0f1116]"}`}
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
            >
               <div className="mb-4 p-4 rounded-full bg-[#10b981]/20">
                  <Upload className="h-8 w-8 text-[#10b981]" />
               </div>
               <h3 className="text-lg font-medium mb-2 text-[#f0f2f5]">{file ? file.name : "CSV dosyanızı sürükleyip bırakın"}</h3>
               <p className="text-sm text-[#a0a8b3] mb-4 text-center">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB - Analize hazır` : "veya dosya seçmek için tıklayın (maks 10MB)"}</p>

               {!file && (
                  <div className="flex flex-wrap gap-3 justify-center">
                     <input
                        id="file-upload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={(ref) => {
                           // ref ile butondan tetiklenecek
                           if (ref) fileInputRef.current = ref;
                        }}
                     />
                     <Button variant="outline" className="cursor-pointer mt-2 border-[#2a2e37] text-[#d0d5dd] hover:bg-[#2a2e37]" onClick={() => fileInputRef.current?.click()}>
                        CSV Dosyası Seç
                     </Button>
                  </div>
               )}

               {file && (
                  <Button onClick={onAnalyzeClick} className="cursor-pointer mt-2 bg-[#10b981] hover:bg-[#059669] text-white" disabled={!isApiKeyValid}>
                     {!isApiKeyValid ? "API anahtarı gerekli" : "Yapay Zeka ile Analiz Et"}
                  </Button>
               )}
            </div>
            {file && (
               <Button
                  onClick={handleRemoveFile}
                  variant={"ghost"}
                  size={"icon"}
                  className="absolute top-8 right-7 cursor-pointer text-[#f87171] hover:text-red-700 hover:scale-125 duration-300 transition-all"
               >
                  <X className="w-5 h-5" />
               </Button>
            )}
         </CardContent>
      </Card>
   );
}

export default FileUpload;
