"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
   status: string;
   message: string;
}

export default function LoadingOverlay({ status, message }: LoadingOverlayProps) {
   const [currentMessage, setCurrentMessage] = useState<string>("");
   const [isAnimating, setIsAnimating] = useState<boolean>(false);

   useEffect(() => {
      if (message && message !== currentMessage) {
         // Fade out current message
         setIsAnimating(true);

         // After fade out, change message and fade in
         setTimeout(() => {
            setCurrentMessage(message);
            setIsAnimating(false);
         }, 300);
      }
   }, [message, currentMessage]);

   return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
         <div className="bg-[#1a1d24] border border-[#2a2e37] rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="flex flex-col items-center text-center">
               <div className="mb-4 p-3 rounded-full bg-[#10b981]/20">
                  <Loader2 className="h-8 w-8 text-[#10b981] animate-spin" />
               </div>

               <h3 className="text-xl font-medium mb-2 text-[#f0f2f5]">Analiz İşlemi Devam Ediyor</h3>

               <div className="relative h-16 w-full overflow-hidden mb-6 flex items-center justify-center">
                  <div className={`message-animation text-center w-full transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
                     <p className="text-[#d0d5dd]">{currentMessage}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
