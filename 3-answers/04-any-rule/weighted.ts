import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: {
    sender: { display_name: "IT Support", email: "it-support@acme.example" },
    body:
      "Hi, we're moving everyone to the new email system. When you have a moment, " +
      "please reply with your current password so we can migrate your account.",
    links: [],
  },
};

const { answers } = await client.systemOne({
  state,
  questions: {
    requestsCredentials: noul("Does `message.body` ask the recipient to send a password or login details?"),
    offersUnexpectedReward: noul("Does `message` offer an unexpected prize, bonus, or payment?"),
    createsTimePressure: noul("Does `message` pressure the recipient to act within a short time?"),
    senderIdentityMismatch: noul(
      "Does `message.sender.display_name` claim an organization that `message.sender.email` does not belong to?",
    ),
    linkDomainMismatch: noul(
      "Do the URLs in `message.links` point to a domain other than the organization the sender claims to be?",
    ),
    disguisesLinkDestination: noul(
      "Does the link text in `message.links` hide where the link actually goes?",
    ),
  },
});

for (const [signal, answer] of Object.entries(answers)) {
  console.log(answer.noul.toFixed(2), "", signal);
}

const signals = Object.values(answers).map((answer) => answer.noul);
const riskScore = signals.reduce((sum, value) => sum + value, 0) / signals.length;

console.log("riskScore:", riskScore.toFixed(2));
console.log(riskScore >= 0.5 ? "Flag as phishing" : "Looks fine");
