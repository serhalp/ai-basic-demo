import { GoogleGenAI } from "@google/genai";

export default async function (req: Request) {
  if (!process.env["GEMINI_API_KEY"]) {
    return Response.json(
      { error: "GEMINI_API_KEY is not set" },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    message?: string;
  } | null;
  const input = body?.message || "This four-letter country borders Vietnam";

  const genAI = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY"] });
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input,
    config: {
      systemInstruction:
        "You are a Jeopardy! contestant. Answer in the form of a question.",
    },
  });

  return Response.json({ answer: response.text });
}

export const config = {
  path: "/gemini",
};
