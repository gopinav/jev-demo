# Jev TypeScript demo

Dependencies are installed. Add your TypeSafe API key to `.env`, then run:

```sh
npm run demo
```

`demo.ts` asks whether the customer sounds frustrated. Change the message to
"Thanks for the update. Everything is working now." and rerun to compare.

```sh
npm run all
```

`all-questions.ts` sends Noul, Choice, and Score questions together, then uses
an illustrative threshold to print a support-review decision.

Both examples show the full response (including token usage) and elapsed request
time. Results are live, not mocked. The threshold only controls console output.

```sh
npm run check
```

Requirements: Node.js 22+, TypeSafe access, and an API key. `.env` is ignored by Git.
If recreating the project, run `npm ci` and copy `.env.example` to `.env`.

For recording: start with the installed project, show the placeholder environment
file before entering a real key, then open `demo.ts`. Use `all-questions.ts` as the
completed example after introducing Choice and Score. Do not show your real key.

Docs: https://docs.typesafe.ai/sdk/javascript
