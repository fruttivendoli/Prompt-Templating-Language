import vm from "node:vm";
import type { Parameter } from "../types/parameter";
import { reservedWords } from "./reserved-words";

export default class ContextCreator {
  private parameters: Map<string, Parameter>;

  constructor(parameters: Map<string, Parameter>) {
    reservedWords.forEach((word) => {
      if (parameters.has(word)) {
        console.error(
          `Parameter name "${word}" is a reserved word. Rejecting it for context creation.`,
        );
        parameters.delete(word);
      }
    });
    this.parameters = parameters;
  }

  addParameter(key: string, param: Parameter) {
    this.parameters.set(key, param);
  }

  removeParameter(key: string) {
    this.parameters.delete(key);
  }

  createContext() {
    const params = {} as { [key: string]: Parameter };
    this.parameters.forEach((param, key) => {
      params[key] = param;
    });

    return vm.createContext(params);
  }
}
