import OpenAI from "openai";

export default async function (req: Request) {
  if (!process.env["OPENAI_API_KEY"]) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  const input = (await req.text()) || "Spit any hot take of your choice";

  const client = new OpenAI();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });

  return Response.json({ answer: response.choices[0].message.content });
}

export const config = {
  path: "/openai-edge",
};
