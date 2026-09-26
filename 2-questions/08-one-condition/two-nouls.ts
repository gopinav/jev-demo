import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I'm really annoyed. The lamp arrived broken. Please just send me a new one.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    isAngry: noul("Is the customer in `message` angry?"),
    wantsRefund: noul("Does the customer in `message` ask for a refund?"),
  },
});

console.log("isAngry:    ", answers.isAngry.noul.toFixed(2));
console.log("wantsRefund:", answers.wantsRefund.noul.toFixed(2));

if (answers.isAngry.noul >= 0.8 && answers.wantsRefund.noul >= 0.8) {
  console.log("Angry refund request: prioritize.");
} else {
  console.log("Not an angry refund request.");
}
