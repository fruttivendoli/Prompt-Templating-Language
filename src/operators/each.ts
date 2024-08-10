import vm from "vm";
import type ContextCreator from "../utils/context-creator";
import { renderOperators } from "../utils/operator-renderer";

export const regex = /(\n?\s*?)\{#each\s(.+?)\sas\s(.+?)\}(.*)\{\/each\}/gms;

export const render = (content: string, context: ContextCreator) => {
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) return "";

  const [_, offset, list, name, inner] = matches[0];

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
  for (let i = 0; i < listValue.length; i++) {
    const item = listValue[i];
    context.addParameter(name, item);
    const renderedValue = renderOperators(inner, context);
    innerValue += offset + renderedValue.trim();
    context.removeParameter(name);
  }

  return innerValue;
};
