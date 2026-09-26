import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "The headphones arrived with a cracked case. I'd like my money back.",
  "The case is a bit scratched. Could I get part of my money back and keep them?",
  "These aren't really for me. Could I get store credit instead?",
  "I'm not sure these are for me. Can I send them back?",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      wantsRefund: noul("Does the customer in `message` want a refund?"),
    },
  });

  console.log(answers.wantsRefund.noul.toFixed(2), "", message);
}
