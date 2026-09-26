import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "Hi, could you send the invoice for my headphones to my work email, maya@brightlane.example? " +
    "Please don't use my personal address (maya.chen@mail.example). " +
    "My manager, jordan@brightlane.example, will approve the expense.",
  "Please send the invoice to my work email instead: maya at brightlane dot example. Thanks!",
];

for (const message of messages) {
  const candidates = message.match(/[\w.+-]+@[\w-]+\.[\w.-]+\w/g) ?? [];

  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      invoiceEmail: choice("Which email address does the customer in `message` want the invoice sent to?", {
        ...Object.fromEntries(candidates.map((address) => [address, null])),
        none: "None of these is the address the customer wants.",
      }),
    },
  });

  console.log("Candidates:", candidates);
  console.log("Send invoice to:", answers.invoiceEmail.choice);
  console.log();
}
