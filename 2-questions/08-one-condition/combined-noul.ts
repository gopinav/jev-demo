import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "I'm really annoyed. The lamp arrived broken. Please just send me a new one.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    angryAndWantsRefund: noul("Is the customer in `message` angry and asking for a refund?"),
  },
});

console.log("angryAndWantsRefund:", answers.angryAndWantsRefund.noul.toFixed(2));
