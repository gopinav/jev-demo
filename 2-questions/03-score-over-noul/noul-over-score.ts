import { noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

const client = new TypeSafeClient();

const state = {
  resume:
    "Data analyst at Northwind, 2022 to present. Built the weekly sales reports in Excel " +
    "and Tableau. Completed an online Python course and use it for personal projects.",
};

const { answers } = await client.systemOne({
  state,
  questions: {
    pythonSkill: score("How much Python experience does `resume` show?", [
      "No Python experience.",
      "Some familiarity, such as courses or personal projects.",
      "Uses Python regularly at work.",
      "Deep expertise, such as leading Python projects or building libraries.",
    ]),
    usedPythonAtWork: noul("Does `resume` state that the candidate has used Python at work?"),
  },
});

console.log("pythonSkill:     ", answers.pythonSkill.score.toFixed(2));
console.log("usedPythonAtWork:", answers.usedPythonAtWork.noul.toFixed(2));

// The job requires Python at work. That's a yes/no condition.
if (answers.usedPythonAtWork.noul >= 0.8) {
  console.log("Move to the next round.");
} else {
  console.log("Doesn't meet the Python-at-work requirement.");
}
