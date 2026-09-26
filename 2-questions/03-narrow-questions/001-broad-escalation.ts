import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "Hi, my Aria headphones stopped charging. Could you help?",
  "This is the third time I've contacted you about the same problem. I want to speak to a manager.",
  "I've disputed the charge with my bank. If this isn't sorted by Monday I'll be talking to a lawyer.",
  "Honestly, I'm really disappointed. I love the sound, but this is the second pair that broke.",
  "Cancel my Plus subscription. I'm done.",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      shouldEscalate: noul("Should this ticket be escalated?"),
    },
  });

  console.log(answers.shouldEscalate.noul.toFixed(2), "", message);
}
