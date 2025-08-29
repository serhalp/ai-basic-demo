import OpenAI from "openai";

export default async function (req: Request) {
  if (!process.env["OPENAI_API_KEY"]) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  console.log("Background function started");

  const body = (await req.json().catch(() => null)) as {
    message?: string;
  } | null;
  const input = body?.message || "This four-letter country borders Vietnam";
  console.log("Making background OpenAI request with input:", input);

  const client = new OpenAI();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a Jeopardy! contestant. Answer in the form of a question.",
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  console.log(
    "Background OpenAI response:",
    response.choices[0].message.content,
  );
  console.log("Background function completed");
}
