import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const ticketHistory = [
  {
    subject: "Headphones arrived broken",
    opened: "2026-03-04",
    messages: [
      { from: "customer", text: "My new Aria headphones arrived and the left side doesn't work. Pretty disappointing for $129." },
      { from: "agent", text: "Sorry about that! A replacement pair is on its way." },
      { from: "customer", text: "It's been ten days and nothing has arrived. This is really frustrating." },
      { from: "agent", text: "Apologies, it was held at the warehouse. It ships today." },
      { from: "customer", text: "Fine. Finally." },
    ],
  },
  {
    subject: "Charged twice",
    opened: "2026-06-12",
    messages: [
      { from: "customer", text: "I was charged twice for my charging case order. I'm getting tired of these problems." },
      { from: "agent", text: "You're right, we charged you twice. The duplicate charge has been refunded." },
      { from: "customer", text: "The refund still isn't on my card after a week. Why does everything take so long?" },
      { from: "agent", text: "It was sent on June 13. It can take up to 10 days to appear." },
    ],
  },
  {
    subject: "Headphones stopped charging",
    opened: "2026-09-22",
    messages: [
      { from: "customer", text: "My headphones stopped charging. This is the second pair that's broken on me." },
      { from: "agent", text: "I'm sorry, Maya. I've sent you a replacement pair, and it should arrive by Friday." },
      { from: "customer", text: "The replacement arrived today and works perfectly. Thanks for sorting it out so quickly!" },
    ],
  },
];

const { answers, usage } = await client.systemOne({
  state: {
    customer: { name: "Maya Chen", plan: "Plus" },
    ticket: ticketHistory[ticketHistory.length - 1],
  },
  questions: {
    isFrustrated: noul("Is the customer frustrated?"),
  },
});

console.log("isFrustrated:", answers.isFrustrated.noul.toFixed(2));
console.log("Input tokens:", usage.input_tokens);
