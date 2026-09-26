import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const emails = [
  "Hi, please send the receipt to my work address, priya@northwind.example, not my personal " +
    "one (priya.k@mail.example). I've also cc'd my manager, sam@northwind.example.",
  "Please send the receipt to my work email: priya at northwind dot example.",
];

for (const email of emails) {
  const candidates = email.match(/[\w.+-]+@[\w-]+\.[\w.-]+\w/g) ?? [];

  const { answers } = await client.systemOne({
    state: { email },
    questions: {
      receiptAddress: choice(
        "Which address does the customer in `email` want the receipt sent to?",
        {
          ...Object.fromEntries(candidates.map((address) => [address, null])),
          none: "None of the listed addresses is the one the customer wants.",
        },
      ),
    },
  });

  console.log("Candidates:", candidates);
  console.log("Send receipt to:", answers.receiptAddress.choice);
  console.log();
}
