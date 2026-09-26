import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  report: "The dashboard takes about 20 seconds to load, but it does load eventually.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    severity: score("How severe is the bug in `report`?", ["Low", "Medium", "High"]),
  },
});

console.log("severity:  ", answers.severity.score.toFixed(2));
console.log("confidence:", answers.severity.confidence.toFixed(2));
console.log("probabilities:", answers.severity.probabilities);
