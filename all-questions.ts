import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

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
    requestType: choice("What is the main request in `message`?", {
      update: "Asks for an update or progress on an existing request.",
      refund: "Asks for money to be returned.",
      replacement: "Asks for a replacement product.",
      other: "The main request does not fit the other options.",
    }),
    frustrationLevel: score("How much frustration does `message` express?", [
      "Makes a request without expressing frustration.",
      "Expresses dissatisfaction without strong anger.",
      "Expresses strong anger.",
    ]),
  },
});
const elapsedMs = performance.now() - startedAt;

console.dir(response, { depth: null });
console.log(`Elapsed: ${elapsedMs.toFixed(0)} ms`);

const reviewThreshold = 0.8; // Illustrative demo threshold.
if (response.answers.isFrustrated.noul >= reviewThreshold) {
  console.log("Flag this message for support review.");
} else {
  console.log("Leave this message in the normal support queue.");
}
