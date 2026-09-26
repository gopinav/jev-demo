import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  call_transcript: [
    "Thanks for calling Northwind Audio, this is Sam. How can I help?",
    "Hi. A couple of things, actually. First, I moved last month, so I need to update my address.",
    "Sure, I can do that. What's the new address?",
    "It's 14 Canal Street, apartment 3B.",
    "Got it. And the postcode?",
    "1012 AB.",
    "Perfect, that's updated. What was the other thing?",
    "My Aria headphones stopped charging. I got them a few weeks ago.",
    "Sorry to hear that. Is the light coming on at all?",
    "No.",
    "Have you tried a different cable?",
    "Yeah, two of them.",
    "Okay. Can you hold the power button for fifteen seconds while it's plugged in?",
    "One sec. No, nothing.",
    "Right. That sounds like a faulty battery.",
    "Great. That's the second pair.",
    "I'm really sorry. Let me look at your account. I can see the first pair was replaced in March.",
    "Mm-hm.",
    "So I have two options. I can send a new pair to your new address, or refund you in full.",
    "What would you do?",
    "Honestly, if it's the second one, I'd take the refund. I can also add a ten percent discount code.",
    "Okay.",
    "And would you like me to cancel the charging case you ordered too? It hasn't shipped yet.",
    "Yeah, sure.",
    "Done. So that's a full refund for the headphones, the case is cancelled, and the discount code is in your email.",
    "Thanks.",
    "Is there anything else?",
    "Actually, can I leave a review somewhere? I want to mention how helpful you were.",
    "That's kind of you. There's a link in the email. Have a great day.",
    "You too. Bye.",
  ].join("\n"),
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
