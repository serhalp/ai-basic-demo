import OpenAI from "openai";

export default async function (req: Request) {
  if (!process.env["OPENAI_API_KEY"]) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  const { next_run } = await req.json();
  console.log("Scheduled function triggered! Next invocation at:", next_run);

  const input = "Give me a scheduled hot take";
  console.log("Making scheduled OpenAI request with input:", input);

  const client = new OpenAI({});
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
    "Scheduled OpenAI response:",
    response.choices[0].message.content,
  );

  console.log("Scheduled function completed");
}

export const config = {
  schedule: "* * * * *", // Every minute (minimum interval)
};
