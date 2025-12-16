import { GoogleGenAI, Type } from "@google/genai";
import { GeminiModel } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLessonPlan = async (topic: string, gradeLevel: string): Promise<any> => {
  if (!apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: `Create a structured lesson plan for a Madrasah class. Topic: "${topic}", Grade Level: "${gradeLevel}".
      Return a JSON object with the following structure:
      {
        "title": "Lesson Title",
        "objectives": ["obj1", "obj2"],
        "materials": ["mat1", "mat2"],
        "activities": [
          {"time": "10 mins", "description": "Activity description"}
        ],
        "assessment": "How to assess learning"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  description: { type: Type.STRING },
                }
              }
            },
            assessment: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Lesson Plan Error:", error);
    throw error;
  }
};

export const getAiTutorResponse = async (question: string, context: string = ''): Promise<string> => {
  if (!apiKey) return "AI Service Unavailable (Missing API Key)";

  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: `Context: You are a knowledgeable and kind Islamic studies tutor at Ayaat Madrasah.
      Current User Context: ${context}
      Student Question: ${question}
      Provide a clear, concise, and educational answer. Use formatted text (markdown) where appropriate.`,
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Tutor Error:", error);
    return "An error occurred while contacting the AI Tutor.";
  }
};

export const getDailyVerse = async (): Promise<{ arabic: string, translation: string, reference: string }> => {
    if (!apiKey) return { arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", translation: "In the name of Allah, the Most Gracious, the Most Merciful", reference: "Al-Fatiha 1:1" };

    try {
        const response = await ai.models.generateContent({
            model: GeminiModel.FLASH,
            contents: "Give me a beautiful, inspiring verse from the Quran suitable for students. Return JSON with 'arabic', 'translation', and 'reference'.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        arabic: { type: Type.STRING },
                        translation: { type: Type.STRING },
                        reference: { type: Type.STRING }
                    }
                }
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) {
        return { arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", translation: "In the name of Allah, the Most Gracious, the Most Merciful", reference: "Al-Fatiha 1:1" };
    }
}
