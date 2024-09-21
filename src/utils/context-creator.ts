import vm from "node:vm";
import type { Parameter } from "../types/parameter";
import { reservedWords } from "./reserved-words";

export default class ContextCreator {
  private parameters: Map<string, Parameter>;
  private prefixes?: Map<string, string>;

  constructor(
    parameters: Map<string, Parameter>,
    prefixes?: Map<string, string>,
  ) {
    reservedWords.forEach((word) => {
      if (parameters.has(word)) {
        console.error(
          `Parameter name "${word}" is a reserved word. Rejecting it for context creation.`,
        );
        parameters.delete(word);
      }
    });
    this.parameters = parameters;
    this.prefixes = prefixes;
  }

  addParameter(key: string, param: Parameter, prefix?: string) {
    this.parameters.set(key, param);
    if (prefix) {
      if (!this.prefixes) {
        this.prefixes = new Map();
      }
      this.prefixes.set(key, prefix);
    }
  }

  removeParameter(key: string) {
    this.parameters.delete(key);
    if (this.prefixes) {
      this.prefixes.delete(key);
    }
  }

  getPrefix(key: string) {
    return this.prefixes?.get(key);
  }

  createContext() {
    const params = {} as { [key: string]: Parameter };
    this.parameters.forEach((param, key) => {
      params[key] = param;
    });

    return vm.createContext(params);
  }
}
