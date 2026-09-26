import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "Hi, just checking on the status of my order.",
  "This is the second time my order has been late. Not great.",
  "This is ridiculous. Third late order in a row. I'm done with you.",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      frustration: score("How much frustration does `message` express?", [
        "Makes a request without expressing frustration.",
        "Expresses dissatisfaction without strong anger.",
        "Expresses strong anger.",
      ]),
    },
  });

  console.log(answers.frustration.score.toFixed(2), "", message);
}
