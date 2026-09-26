import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: {
    sender: { display_name: "Acme Payroll", email: "rewards@claim-bonus.example" },
    subject: "Urgent: claim your employee bonus",
    body:
      "Congratulations! You've been selected for a $500 employee bonus. " +
      "Confirm your login details within 24 hours to claim it.",
    links: [{ text: "Claim bonus", url: "http://claim-bonus.example/acme" }],
  },
};

const { answers } = await client.systemOne({
  state,
  questions: {
    isSpam: noul("Is `message` spam?"),
  },
});

console.log("isSpam:", answers.isSpam.noul.toFixed(2));
