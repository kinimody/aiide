import { inngest } from "@/inngest/client";

const Prompt = "tell me in one sentence who how to get rich";
export async function POST() {
  await inngest.send({ 
    name:"demo/generate",
    data: {
        prompt: Prompt
    }
   });

  return Response.json({ status: "started" });
};