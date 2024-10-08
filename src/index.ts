import type { Parameter } from "./types/parameter";
import ContextCreator from "./utils/context-creator";
import { renderOperators } from "./utils/operator-renderer";

export const render = (
  prompt: string,
  parameters: Map<string, Parameter>,
  prefixes?: Map<string, string>,
) => {
  const context = new ContextCreator(parameters, prefixes);
  return renderOperators(prompt, context);
};
