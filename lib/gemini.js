import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Replace YOUR_API_KEY with environment variable

export async function generateEntrySummary(content) {
  try {
    // Use the model "gemini-2.0-flash" and pass the journal content
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Adjust the model as necessary
      contents: `Summarize this journal entry in one to three simple and easy sentences, maintaining a neutral tone to the author of the journal, use you etc. to refer to the author of the journal: ${content.slice(0, 30000)}`, // Truncate content
    });

    // Return the generated text
    return response?.text || null;
  } catch (error) {
    console.error("Error generating entry summary:", error.message);
    return null;
  }
}