import type { Parameter } from "./types/parameter";
import ContextCreator from "./utils/context-creator";
import { renderOperators } from "./utils/operator-renderer";

export const render = (prompt: string, parameters: Map<string, Parameter>) => {
  const context = new ContextCreator(parameters);
  return renderOperators(prompt, context);
};
