import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  customer_message: "Hi, just checking whether my replacement has shipped.",
  agent_note: "Angry customer. Shouted at me on the phone about the broken headphones.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    isAngry: noul("Is the customer angry in `customer_message`?"),
  },
});

console.log("isAngry:", answers.isAngry.noul.toFixed(2));
