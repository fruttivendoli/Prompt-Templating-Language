import { regex as regexEach, render as renderEach } from "../operators/each";
import {
  regex as regexInsert,
  render as renderInsert,
} from "../operators/insert";
import type ContextCreator from "./context-creator";

const operators = new Map<
  RegExp,
  (partialPrompt: string, context: ContextCreator) => string
>();

operators.set(regexEach, renderEach);
operators.set(regexInsert, renderInsert);

export const renderOperators = (prompt: string, context: ContextCreator) => {
  operators.forEach((operator, regex) => {
    // Replace most inner operators first
    while (prompt.match(regex)) {
      prompt = prompt.replace(regex, (match, ...args) => {
        return operator(match, context);
      });
    }
  });

  return prompt;
};
