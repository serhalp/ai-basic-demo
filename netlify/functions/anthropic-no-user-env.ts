import Anthropic from "@anthropic-ai/sdk";

export default async function (req: Request) {
  console.debug(process.env);

  if (!process.env["ANTHROPIC_API_KEY"]) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not set" },
      { status: 500 },
    );
  }

  const anthropic = new Anthropic({});

  console.log(` Making Anthropic request`, {
    model: "claude-3-5-haiku-20241022",
    apiKey: process.env["ANTHROPIC_API_KEY"]?.substring(0, 10) + "..."
  });

  const input = (await req.text()) || "Give me a spicy hot take of your choice";

  const response = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });

  return Response.json({ answer: response.content[0].text });
}

export const config = {
  path: "/anthropic-no-user-env",
};
