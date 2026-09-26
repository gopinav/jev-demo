import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const messages = [
  "Hi, my Aria headphones stopped charging. The light doesn't come on at all. Could you help?",
  "I tried the reset you suggested and it still doesn't charge. This is the second pair that's broken this year, which is pretty disappointing.",
  "This is ridiculous. Third time I'm writing about this and nobody has fixed it. If I don't hear back today I'm cancelling my Plus plan and leaving a review.",
];

for (const message of messages) {
  const { answers } = await client.systemOne({
    state: { message },
    questions: {
      isFrustrated: noul("Is the customer frustrated in `message`?"),
    },
  });

  console.log(answers.isFrustrated.noul.toFixed(2), "", message.slice(0, 60) + "...");
}
