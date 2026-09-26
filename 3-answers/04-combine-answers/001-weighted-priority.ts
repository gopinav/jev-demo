import { score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const openTickets = [
  {
    id: "T-101",
    plan: "Standard",
    hoursWaiting: 30,
    message: "The volume buttons on my Aria headphones feel a bit loose. They still work, just thought you should know.",
  },
  {
    id: "T-102",
    plan: "Plus",
    hoursWaiting: 2,
    message: "My headphones won't turn on at all since this morning. I use them for work calls every day, so I really need this sorted.",
  },
  {
    id: "T-103",
    plan: "Standard",
    hoursWaiting: 26,
    message: "Third time asking. My charging case still hasn't arrived and nobody replies. This is completely unacceptable.",
  },
  {
    id: "T-104",
    plan: "Plus",
    hoursWaiting: 5,
    message: "The left earbud cuts out now and then. Reconnecting fixes it for a while.",
  },
];

type JudgedTicket = (typeof openTickets)[number] & { impact: number; frustration: number };

const tickets: JudgedTicket[] = [];

for (const ticket of openTickets) {
  const { answers } = await client.systemOne({
    state: { message: ticket.message },
    questions: {
      impact: score("How much does the problem in `message` stop the customer from using the product?", [
        "Not at all. Everything still works.",
        "Partly. It works, but something is broken or unreliable.",
        "Completely. The customer can't use it.",
      ]),
      frustration: score("How frustrated is the customer in `message`?", [
        "Not frustrated. Just asking for help.",
        "Disappointed or annoyed, but still polite.",
        "Angry, making complaints or threats.",
      ]),
    },
  });

  // Each Score has 3 levels (0 to 2), so divide by 2 to get a value from 0 to 1.
  tickets.push({
    ...ticket,
    impact: answers.impact.score / 2,
    frustration: answers.frustration.score / 2,
  });
}

type Weights = { impact: number; frustration: number; plan: number; waiting: number };

function rank(weights: Weights) {
  return tickets
    .map((ticket) => {
      const priority =
        ticket.impact * weights.impact +
        ticket.frustration * weights.frustration +
        (ticket.plan === "Plus" ? 1 : 0) * weights.plan +
        Math.min(ticket.hoursWaiting / 24, 1) * weights.waiting;
      return { id: ticket.id, message: ticket.message, priority };
    })
    .sort((a, b) => b.priority - a.priority);
}

console.log("Product-first weights:");
for (const { id, priority, message } of rank({ impact: 0.5, frustration: 0.1, plan: 0.2, waiting: 0.2 })) {
  console.log(`  ${priority.toFixed(2)} ${id} ${message.slice(0, 50)}...`);
}

// New priorities, same answers. No new Jev calls.
console.log("Customer-care weights:");
for (const { id, priority, message } of rank({ impact: 0.2, frustration: 0.4, plan: 0.1, waiting: 0.3 })) {
  console.log(`  ${priority.toFixed(2)} ${id} ${message.slice(0, 50)}...`);
}
