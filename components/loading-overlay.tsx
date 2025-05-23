"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({ status, aiResponse }: { status: "idle" | "loading" | "done"; aiResponse?: string }) {
   console.log("dwa");
   return (
      <AnimatePresence>
         {status !== "idle" && (
            <motion.div
               id="deneme"
               className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/20"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
               <motion.div
                  className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-center relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
               >
                  {/* Spinner */}
                  <motion.div
                     className="w-10 h-10 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center"
                     initial={{ scale: 0 }}
                     animate={{ scale: 1.2 }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </motion.div>

                  {/* Text animation */}
                  <div className="h-10 overflow-hidden relative">
                     <AnimatePresence mode="wait">
                        {status === "loading" && (
                           <motion.p
                              key="loading"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 40 }}
                              transition={{ duration: 0.5 }}
                              className="text-gray-700 text-base"
                           >
                              Dosyanız analiz ediliyor...
                           </motion.p>
                        )}
                        {status === "done" && aiResponse && (
                           <motion.p
                              key="response"
                              initial={{ opacity: 0, y: -30 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6 }}
                              className="text-gray-800 font-medium text-base"
                           >
                              {aiResponse}
                           </motion.p>
                        )}
                     </AnimatePresence>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
