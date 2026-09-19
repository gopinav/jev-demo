import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

if (!process.env.TYPESAFE_API_KEY) {
  console.error("Add your TypeSafe API key to .env before running the demo.");
  process.exit(1);
}

const client = new TypeSafeClient();

const state = {
  message: "I've contacted you three times, and I'm still waiting.",
};

const startedAt = performance.now();
const response = await client.systemOne({
  state,
  questions: {
    isFrustrated: noul("Does `message` express frustration?"),
  },
});
const elapsedMs = performance.now() - startedAt;

console.dir(response, { depth: null });
console.log(`Elapsed: ${elapsedMs.toFixed(0)} ms`);
