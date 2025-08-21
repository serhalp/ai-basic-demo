import OpenAI from "openai";

export default async function (req: Request): Promise<Response> {
  console.debug(process.env);

  if (!process.env["OPENAI_API_KEY"]) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  });

  const input = (await req.text()) || "Spit any hot take of your choice";
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a very spicy but also fair hot take machine",
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  return Response.json({ answer: response.choices[0].message.content });
}

export const config = {
  path: "/openai-no-user-env",
};
