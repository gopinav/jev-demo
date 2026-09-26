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
      asksForManager: noul("Does `message` ask to speak to a manager or someone senior?"),
      threatensToLeave: noul("Does `message` threaten to cancel, leave, or stop being a customer?"),
      legalOrChargeback: noul("Does `message` mention legal action or disputing a charge with a bank?"),
      repeatContact: noul("Does `message` say the customer has contacted support about this before?"),
    },
  });

  // Our escalation policy: any one of these signals is enough.
  const shouldEscalate = Object.values(answers).some(
    (answer) => answer.noul >= 0.8,
  );

  console.log(message);
  for (const [signal, answer] of Object.entries(answers)) {
    console.log(`  ${signal}:`, answer.noul.toFixed(2));
  }
  console.log("  Escalate:", shouldEscalate ? "yes" : "no");
}
