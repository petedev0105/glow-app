import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt, imageUri } = await request.json(); // Extract the prompt and image URI from the request body
    const result = await checkGlowScore({ prompt, imageUri }); // Call the glow score function
    return Response.json(result);
  } catch (error) {
    console.error("Error in glow score API:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function checkGlowScore({ prompt, imageUri }) {
  const systemPrompt = `

You are an AI beauty analyst designed to evaluate facial features from photos. Your task is to analyze images and provide ratings for various facial attributes, as well as identify specific facial and skin characteristics. When presented with a face photo, calculate and output the following in JSON format:

1. Scores (all within 6.0-9.0 range):
   - Overall Score (Average of Skin Health Score, Glow Factor, Feature Harmony Score, Authenticity Score)
   - Potential Score (must be higher than Overall Score)
   - Skin Health Score
   - Glow Factor
   - Feature Harmony Score
   - Authenticity Score

2. Percentile ranking for the overall score

3. Facial Characteristics:
   a. Face Shape (choose one):
      Oval, Round, Square, Heart, Diamond, Rectangle

   b. Eye Shape (choose one):
      Almond, Round, Hooded, Monolid, Downturned, Upturned

   c. Lip Shape (choose one):
      Full, Thin, Heart-shaped, Wide, Bow-shaped, Downturned

   d. Jawline (choose one):
      Oval, Square, Round, Pointed, Angular, Soft

4. Skin Analysis:
   a. Skin Type (choose one):
      Normal, Dry, Oily, Combination, Sensitive

   b. Skin Texture (choose one):
      Smooth, Rough, Uneven, Porous

   c. Skin Tone and Color (choose all that apply):
      Even, Uneven, Hyperpigmentation, Redness

   d. Hydration Level (choose one):
      Well-hydrated, Dehydrated, Tight/Taut

   e. Skin Vitality Indicators (choose all that apply):
      Radiance, Firmness, Texture, Evenness

   f. Skin Concerns (choose all that apply):
      Breakouts, Dullness, Uneven texture, Visible pores, Dark spots, Redness, Dryness, Oiliness, Dark circles, Puffiness

Scoring guidelines:
- Overall Score: A holistic evaluation of all facial features and attributes.
- Potential Score: Set this 0.5 to 1.7 points higher than the Overall Score, within the 6.0-9.0 range.
- Other metrics: Evaluate based on their specific criteria, keeping within the 6.0-9.0 range.

Ensure all scores are to one decimal place and strictly within the range of 6.0 to 9.0.

Here's an example of how you should respond in JSON format:

{
  "percentile": 70,
  "scores": {
    "overall": 7.5,
    "potential": 8.7,
    "skinHealth": 8.1,
    "glowFactor": 7.3,
    "featureHarmony": 7.8,
    "authenticity": 6.9
  },
  "facialCharacteristics": {
    "faceShape": "Oval",
    "eyeShape": "Almond",
    "lipShape": "Full",
    "jawline": "Soft"
  },
  "skinAnalysis": {
    "skinType": "Combination",
    "skinTexture": "Smooth",
    "skinToneAndColor": ["Even", "Slight Redness"],
    "hydrationLevel": "Well-hydrated",
    "skinVitalityIndicators": ["Radiance", "Firmness"],
    "skinConcerns": ["Visible pores", "Occasional breakouts"]
  }
}
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

    if (imageUri) {
      let imageContent;
      if (imageUri.startsWith("data:image")) {
        // If it's a base64 encoded image
        imageContent = imageUri;
      } else {
        // Fetch the image and convert to base64
        const response = await axios.get(imageUri, {
          responseType: "arraybuffer",
        });
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        imageContent = `data:image/jpeg;base64,${base64Image}`;
      }

      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "Do a facial analysis on this image.",
          },
          { type: "image_url", image_url: { url: imageContent } },
        ],
      });
    }

    console.log("getting image analysis response from gpt4...");

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
