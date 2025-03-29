import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function getMoodRecommendations(averageScore) {
  try {
    // Determine mood category based on score
    let moodCategory = "";
    if (averageScore <= 3) moodCategory = "low";
    else if (averageScore <= 7) moodCategory = "medium";
    else moodCategory = "high";

    // Generate all recommendations in parallel
    const [entertainmentRes, healthRes, quoteRes] = await Promise.all([
      generateEntertainment(moodCategory, averageScore),
      generateHealthTips(moodCategory, averageScore),
      generateQuote(moodCategory, averageScore)
    ]);

    return {
      entertainment: entertainmentRes,
      healthTips: healthRes,
      quote: quoteRes
    };
  } catch (error) {
    console.error("Error generating mood recommendations:", error.message);
    return {
      entertainment: "Recommendations will appear here",
      healthTips: "Health tips will appear here",
      quote: "Stay positive!"
    };
  }
}

async function generateEntertainment(moodCategory, score) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Based on a mood score of ${score}/10 (${moodCategory} mood), suggest 2-4 books/movies/TV shows/anime/albums/something else that might be appropriate. just provide  Try watching/reading and the name of the book/movie/TV show, etc. without any additional text or symbols, basic plain text.`
    
  });
  return response?.text || "No entertainment recommendations available";
}

async function generateHealthTips(moodCategory, score) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Provide 3 brief mental or physical health tips or activities, fun , and stuff (each 10-20 words) for someone with a ${moodCategory} mood (score ${score}/10). 
    just provide  the tips without any additional text or symbols, basic plain text. do not add * etc.`
  });
  return response?.text || "No health tips available";
}

async function generateQuote(moodCategory, score) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Provide a inspirational/cool/motivation quote appropriate for someone with a ${moodCategory} mood (score ${score}/10). 
    Just provide the quote itself without any additional text.`
  });
  return response?.text?.replace(/"/g, '').trim() || "Stay positive!";
}