import { choice, noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const today = new Date("2026-09-26");

function isWithinOneYear(purchasedOn: string) {
  const coveredUntil = new Date(purchasedOn);
  coveredUntil.setFullYear(coveredUntil.getFullYear() + 1);
  return today <= coveredUntil;
}

const tickets = [
  {
    customer: "Maya",
    plan: "Plus",
    purchasedOn: "2026-09-05",
    message: "My Aria headphones stopped charging. I've tried two different cables and the reset button, and nothing works.",
  },
  {
    customer: "Sam",
    plan: "Plus",
    purchasedOn: "2025-08-14",
    message: "The left earbud on my Aria headphones stopped working. The right one is fine. I've reset them twice.",
  },
  {
    customer: "Priya",
    plan: "Standard",
    purchasedOn: "2026-09-18",
    message: "Where's my charging case? The tracking hasn't updated in five days.",
  },
  {
    customer: "Leo",
    plan: "Standard",
    purchasedOn: "2026-09-02",
    message: "I'd like to return the Aria headphones. They're comfortable, but the sound isn't what I expected.",
  },
  {
    customer: "Nina",
    plan: "Plus",
    purchasedOn: "2026-08-28",
    message:
      "You sent the wrong colour, I was charged twice, and now the replacement you sent doesn't turn on either. " +
      "I've been waiting two weeks for this to be sorted.",
  },
];

for (const ticket of tickets) {
  const { answers } = await client.systemOne({
    state: { message: ticket.message },
    questions: {
      intent: choice("What does the customer in `message` need?", {
        faulty_product: "A product they own isn't working properly.",
        order_status: "An update on where an order is.",
        return: "To send back a product that works but they don't want.",
        other: "Anything else.",
      }),
      severalProblems: noul("Does `message` describe several separate problems?"),
    },
  });

  let route = "Send to the general queue";

  if (answers.severalProblems.noul >= 0.8) {
    route = "Send to a support agent";
  } else if (answers.intent.choice === "faulty_product") {
    route =
      ticket.plan === "Plus" && isWithinOneYear(ticket.purchasedOn)
        ? "Send a free replacement"
        : "Send to a support agent";
  } else if (answers.intent.choice === "order_status") {
    route = "Reply with the tracking link";
  } else if (answers.intent.choice === "return") {
    route = "Email a return label";
  }

  console.log(`${ticket.customer}: ${answers.intent.choice}, severalProblems ${answers.severalProblems.noul.toFixed(2)}`);
  console.log(`  -> ${route}`);
}
