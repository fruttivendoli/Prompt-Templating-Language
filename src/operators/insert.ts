import vm from "node:vm";
import type ContextCreator from "../utils/context-creator";

export const regex = /\{([^}]*)\}/gms; // Match all comments

export const render = (content: string, context: ContextCreator) => {
  const matches = [...content.matchAll(regex)];

  const argument = matches[0][1];

  const vmContext = context.createContext();

  return vm.runInContext(argument, vmContext);
};
