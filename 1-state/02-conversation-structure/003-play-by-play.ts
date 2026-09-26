import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  call_transcript: [
    { speaker: "agent", text: "Thanks for calling Northwind Audio, this is Sam. How can I help?" },
    { speaker: "customer", text: "Hi. A couple of things, actually. First, I moved last month, so I need to update my address." },
    { speaker: "agent", text: "Sure, I can do that. What's the new address?" },
    { speaker: "customer", text: "It's 14 Canal Street, apartment 3B." },
    { speaker: "agent", text: "Got it. And the postcode?" },
    { speaker: "customer", text: "1012 AB." },
    { speaker: "agent", text: "Perfect, that's updated. What was the other thing?" },
    { speaker: "customer", text: "My Aria headphones stopped charging. I got them a few weeks ago." },
    { speaker: "agent", text: "Sorry to hear that. Is the light coming on at all?" },
    { speaker: "customer", text: "No." },
    { speaker: "agent", text: "Have you tried a different cable?" },
    { speaker: "customer", text: "Yeah, two of them." },
    { speaker: "agent", text: "Okay. Can you hold the power button for fifteen seconds while it's plugged in?" },
    { speaker: "customer", text: "One sec. No, nothing." },
    { speaker: "agent", text: "Right. That sounds like a faulty battery." },
    { speaker: "customer", text: "Great. That's the second pair." },
    { speaker: "agent", text: "I'm really sorry. Let me look at your account. I can see the first pair was replaced in March." },
    { speaker: "customer", text: "Mm-hm." },
    { speaker: "agent", text: "So I have two options. I can send a new pair to your new address, or refund you in full." },
    { speaker: "customer", text: "What would you do?" },
    { speaker: "agent", text: "Honestly, if it's the second one, I'd take the refund. I can also add a ten percent discount code." },
    { speaker: "customer", text: "Okay." },
    { speaker: "agent", text: "And would you like me to cancel the charging case you ordered too? It hasn't shipped yet." },
    { speaker: "customer", text: "Yeah, sure." },
    { speaker: "agent", text: "Done. So that's a full refund for the headphones, the case is cancelled, and the discount code is in your email." },
    { speaker: "customer", text: "Thanks." },
    { speaker: "agent", text: "Is there anything else?" },
    { speaker: "customer", text: "Actually, can I leave a review somewhere? I want to mention how helpful you were." },
    { speaker: "agent", text: "That's kind of you. There's a link in the email. Have a great day." },
    { speaker: "customer", text: "You too. Bye." },
  ],
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
