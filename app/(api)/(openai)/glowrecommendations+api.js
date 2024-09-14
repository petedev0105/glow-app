import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json(); // Extract the prompt and image URI from the request body
    const result = await checkGlowScore({ prompt }); // Call the glow score function
    return Response.json(result);
  } catch (error) {
    console.error("Error in glow score API:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function checkGlowScore({ prompt }) {
  const systemPrompt = `
You are a Gen Z-friendly beauty advisor specializing in personalized glow-up advice, product recommendations, and makeup tips. Your task is to analyze the provided JSON data and create detailed, tailored beauty suggestions that resonate with a younger audience. ✨Use the information in the JSON to provide:
At least 5 glow-up tips focusing on the user's unique features and areas for improvement. 🌟
A minimum of 5 skincare product recommendations that address the user's skin concerns or enhance their best features. 💧
At least 5 makeup tips or techniques that complement the user's facial characteristics and skin type. 💄
Your advice should be:
Trendy and relevant to Gen Z 
Positive and empowering 
Specific to the user's facial features and skin analysis 
Inclusive and suitable for diverse skin tones and types 
Detailed and actionable with a fun twist! 
The responses should be in all undercase
Remember to add relevant emojis 
Format your response as a JSON object with the following structure:
json
{ "result": [ { "id": 1, "title": "Glow-Up Tips", "steps": [ { "id": Number, "name": String, "details": String, "importance": String } // Minimum of 5 glow-up tips ] }, { "id": 2, "title": "Skincare Recommendations", "steps": [ { "id": Number, "name": String, "highEnd": { "product": String, "price": String, "howToUse": String }, "affordable": { "product": String, "price": String, "howToUse": String }, "importance": String, "technique": String } // Minimum of 5 skincare recommendations ] }, { "id": 3, "title": "Makeup Tips", "steps": [ { "id": Number, "name": String, "technique": String, "importance": String, "products": [ { "category": String, "highEnd": { "name": String, "price": String, "applicationTip": String }, "affordable": { "name": String, "price": String, "applicationTip": String } } ] } // Minimum of 5 makeup tips ] } ] }
Make sure to sprinkle in some fun emojis and keep the tone light and engaging! 🎈✨ Provide a detailed and thorough response based on the input JSON data, following the specified JSON structure and ensuring a minimum of 5 elements in each array.
`;

  try {
    let messages = [
      {
        role: "system",
        content: systemPrompt,
      },
    ];

    if (prompt && prompt !== "") {
      messages.push({ role: "user", content: prompt });
    }

    console.log("getting recommendations from gpt 4o mini...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 5000,
      response_format: { type: "json_object" },
    });

    // Ensure the content is present in the response
    const result = JSON.parse(response.choices[0].message.content);

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error("Error in checkGlowScore:", error);
    throw error;
  }
}
