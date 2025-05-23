import { GoogleGenAI } from "@google/genai";

export default async function checkGeminiApi(apiKey: string) {
   const ai = new GoogleGenAI({ apiKey: apiKey });

   try {
      const res = await ai.models.generateContent({
         model: "gemini-2.5-flash-preview-04-17",
         contents: "api doğrulamak için gönderilmiştir. kısa bir cevap vermen yeterli",
      });

      if (res.text)
         return {
            success: true,
         };
   } catch (error: any) {
      return {
         success: false,
         message: error,
      };
   }
}
