import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: "The headphones arrived with a cracked case. Could I get a refund, please?",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    angryAndWantsRefund: noul("Is the customer angry and asking for a refund?"),
    isAngry: noul("Is the customer angry in `message`?"),
    wantsRefund: noul("Does `message` ask for a refund?"),
  },
});

console.log("Combined:");
console.log("  angryAndWantsRefund:", answers.angryAndWantsRefund.noul.toFixed(2));
console.log("Separate:");
console.log("  isAngry:    ", answers.isAngry.noul.toFixed(2));
console.log("  wantsRefund:", answers.wantsRefund.noul.toFixed(2));
