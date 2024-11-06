// Imports necessary modules for Google Generative AI, base64 conversion, data storage, and toast messages.
import { GoogleGenerativeAI } from "@google/generative-ai";
// Asynchronous function to generate a file summary using Google Gemini.
export default async function getMathsSolution(file) {
  // Creates a new Google Generative AI instance.
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  // Gets the Gemini 1.5 Flash model with summarization instructions.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a nobel winning mathematician with indepth knowledge of mathematics and calculus. You use your knowledge to help break down and solve any given mathematical problem showing step by step solution with great accuracy and well formatted in markdown."
  });

  // Defines the prompt for the summarization task.
  const prompt = "Solve the mathematical question with step by step guide and workings in the image data below: ";

  // Asynchronous function to convert a file to a Generative AI compatible format.
  async function fileToGenerativePart(file) {
    // Extracts data and mime type from base64 string.
    const data = file.split(",")[1];
    const mimeType = file.split(",")[0].split(";")[0].split(":")[1];
    // Returns the file data in the format required by Google Generative AI.
    return {
      inlineData: {
        data,
        mimeType
      },
    };
  }

  try {
    // Converts the file to the required format.
    const filePart = await fileToGenerativePart(file);
    // Generates content using the model, file data, and prompt.
    const generatedContent = await model.generateContent([filePart, prompt]);
    // Extracts the text from the response.
    const response = generatedContent.response.text();
    // Returns the generated summary.
    return response;
  } catch (e) {
    console.log("Error occured");
    console.log(e.message);
    return false;
  }
}