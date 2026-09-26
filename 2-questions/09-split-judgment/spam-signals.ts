import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  message: {
    sender: { display_name: "Acme Payroll", email: "rewards@claim-bonus.example" },
    subject: "Urgent: claim your employee bonus",
    body:
      "Congratulations! You've been selected for a $500 employee bonus. " +
      "Confirm your login details within 24 hours to claim it.",
    links: [{ text: "Claim bonus", url: "http://claim-bonus.example/acme" }],
  },
};

const { answers } = await client.systemOne({
  state,
  questions: {
    requestsCredentials: noul("Does `message.body` ask the recipient for a password or login details?"),
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
