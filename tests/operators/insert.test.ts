import { describe, it, expect } from "bun:test";
import type { Parameter } from "../../src/types/parameter";
import { render } from "../../src";

describe("Insert Operator", () => {
  it("Insert Operator with single word", () => {
    const prompt = `
      Text before {word} text after
    `;

    const params = new Map<string, Parameter>();
    params.set("word", "inserted");

    const expected = `
      Text before inserted text after
    `;

    const result = render(prompt, params);
    expect(result).toBe(expected);
  });

  it("Insert Operator with javascript expression", () => {
    const prompt = `
      Text before {word.toUpperCase()} text after
    `;

    const params = new Map<string, Parameter>();
    params.set("word", "inserted");

    const expected = `
      Text before INSERTED text after
    `;

    const result = render(prompt, params);
    expect(result).toBe(expected);
  });
});
