import OpenAI from "openai";

export default async function (req: Request) {
  if (!process.env["OPENAI_API_KEY"]) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  console.log("Background function started");

  const input =
    (await req.text()) || "Give me a background processing hot take";
  console.log("Making background OpenAI request with input:", input);

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

  console.log(
    "Background OpenAI response:",
    response.choices[0].message.content,
  );
  console.log("Background function completed");
}
