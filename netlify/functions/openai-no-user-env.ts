import OpenAI from "openai";

export default async function (req: Request): Promise<Response> {
  process.env["DEBUG"] = "openai-agents:*"
  console.debug(process.env);

  if (!process.env["OPENAI_API_KEY"]) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  const client = new OpenAI({
    timeout: 10000
  });

  console.log(` Making OpenAI request`, {
    model: "gpt-4o",
    apiKey: client.apiKey,
    baseURL: client.baseURL
  });

  // // const input = (await req.text()) || "Spit any hot take of your choice";
  // // const response = await client.chat.completions.create({
  // //   model : "gpt-4o-mini",
  // //   messages : [ {role : "user", content : "Respond with `Hello world!`"} ],
  // // });

  // return Response.json({ answer: response.choices[0].message.content });

  const list = await client.models.list();
  console.log("Available Open AI models:"); 
  for await (const model of list) {
    console.log(model.id)
  }

  return Response.json({ answer: "all good" });
}

export const config = {
  path: "/openai-no-user-env",
};
