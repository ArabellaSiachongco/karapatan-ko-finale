import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = import.meta.env.VITE_AI_API_KEY;

async function translateText(text, targetLanguage = "tl") {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.2, // Lower temperature for more accurate translations
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Prompt
  const translationPrompt = `
    You are a translation assistant. 
    Your job is to translate the following text from **English** to **Tagalog** in a simple and easy-to-understand way.

    make the askterisk bold

    **Text to Translate**: ${text}

    Please keep the translation clear and simple, so everyone can easily understand it.
  `;

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(translationPrompt);

  // Function to format the response with bold, italic, and line breaks
  const formatResponse = (response) => {
    // Replace **word** with <b>word</b>
    let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, "$1");
    // Replace *word* with <i>word</i>
    formattedResponse = formattedResponse.replace(/\*(.*?)\*/g, "$1");
    // Replace newline characters with <br> tags (but avoid extra <br> at the end)
    formattedResponse = formattedResponse.replace(/\n/g, "");
    // Remove extra <br> tags that are unnecessary
    formattedResponse = formattedResponse.replace(/(<br>\s*)+$/, ""); // Remove trailing <br> tags
    return formattedResponse;
  };

  // Process and format the response
  const response = result.response;
  const formattedResponse = formatResponse(response.text());

  return formattedResponse; // Return the formatted translated text
}

export default translateText;
