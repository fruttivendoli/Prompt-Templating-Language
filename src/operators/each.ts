import vm from "vm";
import type ContextCreator from "../utils/context-creator";
import { renderOperators } from "../utils/operator-renderer";

export const regex = /\{#each\s(.+?)\sas\s(.+?)\}.*?\n(.*)\n(.*?)\{\/each\}/gms;

export const render = (content: string, context: ContextCreator) => {
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) return "";

  const [_, list, name, inner, offset] = matches[0];

  // Render list
  const vmContextList = context.createContext();
  const listValue = vm.runInContext(`${list}`, vmContextList);

  if (!Array.isArray(listValue)) {
    console.error(
      `Expected ${list} to be an array, but got ${typeof listValue}`,
    );
    return "";
  }

  // Render inner
  let innerValue = "";
  let isFirst = true;
  for (const item of listValue) {
    context.addParameter(name, item);
    const renderedValue = renderOperators(inner, context);
    innerValue += (isFirst ? "" : offset) + renderedValue.trim() + "\n";
    context.removeParameter(name);
    isFirst = false;
  }
  innerValue = innerValue.slice(0, -1);

  return innerValue;
};
