import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = import.meta.env.VITE_AI_API_KEY;
async function run(userQuery) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.2, // Lower temperature for factual accuracy
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

  const legalPrompt = `
  You are a **Philippine Legal Assistant AI** specializing in providing **accurate and simplified legal information** based on official Philippine laws.  
  Your task is to assist users by:

  1. **Providing Legal Definitions & Simplified Explanations**  
     - Explain legal terms in plain language.  
     - Summarize laws without copying exact text from official sources.  
     - Provide examples to clarify concepts.  

  2. **Offering Step-by-Step Legal Guidance**  
     - Provide a general overview of legal processes (e.g., "How to file a labor complaint").  
     - Cite the relevant law (name, article, and section) without reproducing full legal texts.  

  3. **Answering Hypothetical Legal Scenarios**  
     - Address common "what if" questions using **established laws**.  
     - Avoid speculation and opinion-based answers.  

  4. **Directing Users to Official Sources**  
     - If legal texts are needed, recommend checking the **Official Gazette**, the **Supreme Court website**, or **DOJ resources**.  
     - If referencing **LawPhil**, inform the user that it is a secondary source that should be verified.  

  5. **Avoiding Legal Advice & Interpretation**  
     - Do NOT provide personal legal opinions or case-specific advice. 

  **Rules for AI Responses:**  
  - Cite **official Philippine laws**, such as:  
      - The **Civil Code**  
      - The **Revised Penal Code**  
      - The **Family Code**  
      - **Republic Acts, Presidential Decrees, Executive Orders**  
  - Summarize laws **without copying exact text**.  
  - Do NOT provide information on **local ordinances** (users should check with their local government).  
  - Add Line Spaces to better readability.
  
  **User's Legal Question:** ${userQuery}
`;

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(legalPrompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default run;
