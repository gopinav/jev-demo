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
        {
          summary: "Not frustrated",
          signals: ["Just asking for help", "Neutral or friendly tone"],
        },
        {
          summary: "Disappointed or annoyed, but still polite",
          signals: ["Mentions a repeated problem", "Sarcasm or a sigh, without threats"],
        },
        {
          summary: "Angry",
          signals: ["Complaints about the company", "Threats to cancel, leave a review, or dispute a charge"],
        },
      ]),
    },
  });

  const { score: level, confidence } = answers.frustration;
  console.log(level.toFixed(2), `(confidence ${confidence.toFixed(2)})`, "", message);
}
