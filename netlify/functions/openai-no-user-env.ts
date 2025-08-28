import OpenAI from "openai";

export default async function (req: Request) {
  console.debug(process.env);


  const client = new OpenAI({});

  const input = (await req.text()) || "Spit any hot take of your choice";

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
  path: "/openai-no-user-env",
};
