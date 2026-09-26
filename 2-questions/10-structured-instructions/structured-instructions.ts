import { choice, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message:
    "I ordered the standing desk two weeks ago and tracking still says label created. Was I even charged?",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    team: choice(
      {
        question: "Which team should handle `message`?",
        focus: "Classify the customer's primary request, not every topic mentioned.",
        secondary: "Questions about the charge, when the customer is mainly asking about delivery.",
      },
      {
        billing: "Charges, invoices, refunds, or subscriptions.",
        orders: "Order status, delivery, cancellation, or returns.",
        account: "Login, password, profile, or security.",
      },
    ),
  },
});

console.log("Send to:", answers.team.choice);
console.log("probabilities:", answers.team.probabilities);
