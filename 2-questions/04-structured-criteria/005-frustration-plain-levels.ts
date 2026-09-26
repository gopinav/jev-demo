import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "Great, the second pair broke too. Love that for me.",
  "Oh wonderful, another week without headphones. Thanks so much.",
  "If this breaks again I'm done with you guys.",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      frustration: score("How frustrated is the customer in `message`?", [
        "Not frustrated. Just asking for help.",
        "Disappointed or annoyed, but still polite.",
        "Angry, making complaints or threats.",
      ]),
    },
  });

  const { score: level, confidence } = answers.frustration;
  console.log(level.toFixed(2), `(confidence ${confidence.toFixed(2)})`, "", message);
}
