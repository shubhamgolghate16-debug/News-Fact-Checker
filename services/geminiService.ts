
import { GoogleGenAI, Type } from "@google/genai";
import type { GroundingChunk, FactCheckResult } from '../types';

export const factCheckWithGoogleSearch = async (claim: string): Promise<FactCheckResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    As a professional fact-checker, please analyze the following claim or the content from the provided URL and return a JSON object with your findings.
    Your task is to determine its veracity by cross-referencing information with reliable, neutral, and diverse sources from the web.

    Claim/URL to verify: "${claim}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rating: {
              type: Type.STRING,
              description: 'Your final rating of the claim. Must be one of: "True", "False", "Misleading", "Partially True", or "Unverifiable".'
            },
            summary: {
              type: Type.STRING,
              description: 'A clear, concise summary of your findings.'
            },
            justification: {
              type: Type.STRING,
              description: 'A brief justification for your rating based on the evidence found.'
            }
          },
          required: ["rating", "summary", "justification"]
        }
      },
    });

    const analysisResult = JSON.parse(response.text);
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

    const sources: GroundingChunk[] = groundingMetadata?.groundingChunks?.filter(
      (chunk: any): chunk is GroundingChunk => chunk.web && chunk.web.uri && chunk.web.title
    ) || [];
    
    return { ...analysisResult, sources };
  } catch (error) {
    console.error("Error during fact-checking:", error);
    if (error instanceof Error) {
        if (error.name === 'SyntaxError') {
            throw new Error('Failed to parse the AI model\'s response. The format might be invalid.');
        }
        throw new Error(`Failed to get a response from the AI model: ${error.message}`);
    }
    throw new Error("An unknown error occurred during fact-checking.");
  }
};
