import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  call_transcript: {
    customer: [
      "Hi. A couple of things, actually. First, I moved last month, so I need to update my address.",
      "It's 14 Canal Street, apartment 3B.",
      "1012 AB.",
      "My Aria headphones stopped charging. I got them a few weeks ago.",
      "No.",
      "Yeah, two of them.",
      "One sec. No, nothing.",
      "Great. That's the second pair.",
      "Mm-hm.",
      "What would you do?",
      "Okay.",
      "Yeah, sure.",
      "Thanks.",
      "Actually, can I leave a review somewhere? I want to mention how helpful you were.",
      "You too. Bye.",
    ],
    agent: [
      "Thanks for calling Northwind Audio, this is Sam. How can I help?",
      "Sure, I can do that. What's the new address?",
      "Got it. And the postcode?",
      "Perfect, that's updated. What was the other thing?",
      "Sorry to hear that. Is the light coming on at all?",
      "Have you tried a different cable?",
      "Okay. Can you hold the power button for fifteen seconds while it's plugged in?",
      "Right. That sounds like a faulty battery.",
      "I'm really sorry. Let me look at your account. I can see the first pair was replaced in March.",
      "So I have two options. I can send a new pair to your new address, or refund you in full.",
      "Honestly, if it's the second one, I'd take the refund. I can also add a ten percent discount code.",
      "And would you like me to cancel the charging case you ordered too? It hasn't shipped yet.",
      "Done. So that's a full refund for the headphones, the case is cancelled, and the discount code is in your email.",
      "Is there anything else?",
      "That's kind of you. There's a link in the email. Have a great day.",
    ],
  },
};

const { answers } = await client.systemOne({
  state,
  questions: {
    askedForRefund: noul("Did the customer ask for a refund?"),
    agreedToCancel: noul("Did the customer agree to cancel the charging case?"),
  },
});

console.log("askedForRefund:", answers.askedForRefund.noul.toFixed(2));
console.log("agreedToCancel:", answers.agreedToCancel.noul.toFixed(2));
