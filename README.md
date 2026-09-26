# Jev TypeScript demo

Examples for using Jev, TypeSafe's System One model, with the TypeScript SDK.

## Setup

Requirements: Node.js 22+, TypeSafe access, and an API key.

```sh
npm ci
cp .env.example .env
```

Add your TypeSafe API key to `.env`. The file is ignored by Git.

## Jev best practices (and mistakes to avoid)

The scenarios are grouped into three parts: preparing the state, writing the
questions, and using the answers in your code. Each scenario has its own folder,
and the files inside it are numbered in the order to run them.

Run any file with the `scenario` script:

```sh
npm run scenario 1-state/01-object-over-string/001-plain-string.ts
```

### 1. State

| Folder | Question |
|---|---|
| `01-object-over-string` | Should the state be plain text or an object? |
| `02-conversation-structure` | How should we structure the state? |
| `03-facts-not-math` | Should we prepare the state before sending it? |
| `04-just-enough` | How much information should we include in the state? |

### 2. Questions

| Folder | Question |
|---|---|
| `01-noul-or-choice` | When should we use Noul or Choice? |
| `02-when-to-score` | When should we use Score instead of Noul? |
| `03-narrow-questions` | Are we asking Jev to judge too many things at once? |
| `04-structured-criteria` | Have we made it clear what each answer should mean? |
| `05-one-call` | Do more questions mean more API calls? |
| `06-pick-a-value` | How can Jev help us extract a value if it doesn't generate text? |

### 3. Answers

| Folder | Question |
|---|---|
| `01-jev-or-code` | Who should make the final decision, Jev or our code? |
| `02-trust-the-answer` | Should our code trust every answer? |
| `03-risk-thresholds` | Does every action need the same level of confidence? |
| `04-combine-answers` | How do we turn several answers into one decision? |

Results are live, not mocked, so the numbers vary slightly between runs. The
thresholds and weights in these files are examples. Choose your own by testing
messages from your application.

## Getting started examples

The two files at the root are from the introduction to Jev.

```sh
npm run demo
```

`demo.ts` asks whether a customer message sounds frustrated.

```sh
npm run all
```

`all-questions.ts` sends Noul, Choice, and Score questions together, then uses an
example threshold to decide whether to flag the message for review.

## Type checking

```sh
npm run check
```

Docs: https://docs.typesafe.ai/sdk/javascript
