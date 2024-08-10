import vm from "vm";
import type ContextCreator from "../utils/context-creator";

export const regex =
  /(\n?\s*?)\{#if\s(.+?)\s?}(.*?)(\{:else\}(.*?))?\{\/if\}/gms;

export const render = (content: string, context: ContextCreator) => {
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) return "";
  console.log(matches[0]);

  const [
    _drop0,
    offset,
    ifCondition,
    inner,
    _drop1 = undefined,
    elseInner = undefined,
  ] = matches[0];

  // Compute if
  const vmContextIf = context.createContext();
  const ifValue = vm.runInContext(`(${ifCondition}) === true`, vmContextIf);
  console.log("ifValue: ", ifValue);

  // Render
  if (ifValue === true) {
    return offset + inner.trim();
  } else if (elseInner !== undefined) {
    return offset + elseInner!.trim();
  }
  return "";
};
