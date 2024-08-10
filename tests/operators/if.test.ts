import { describe, it, expect } from "bun:test";
import type { Parameter } from "../../src/types/parameter";
import { render } from "../../src";

describe("If Operator", () => {
  it("If Operator with simple boolean expression", () => {
    const prompt = `
      Some text before the if operator
      {#if truly == true}
        This content is rendered
      {/if}
      {#if truly == false}
        This content is not rendered
      {/if}
      Some text after the if operator
    `;

    const params = new Map<string, Parameter>();
    params.set("truly", true);

    const expected = `
      Some text before the if operator
      This content is rendered
      Some text after the if operator
    `;

    const result = render(prompt, params);
    expect(result).toBe(expected);
  });

  it("If Operator with javascript expression", () => {
    const prompt = `
      Some text before the if operator
      {#if words.length == 3}
        There are exactly 3 words in the list
      {/if}
      Some text after the if operator
    `;

    const params = new Map<string, Parameter>();
    params.set("words", ["apple", "banana", "cherry"]);
    // 3 elements in 'words' array => words.length == 3 is truthy

    const expected = `
      Some text before the if operator
      There are exactly 3 words in the list
      Some text after the if operator
    `;

    const result = render(prompt, params);
    expect(result).toBe(expected);
  });

  it("If Operator with else part", () => {
    const prompt = `
      Some text before the if operator
      {#if words.length == 3}
        There are exactly 3 words in the list
      {:else}
        There are not exactly 3 words in the list
      {/if}
      Some text after the if operator
    `;

    const params = new Map<string, Parameter>();
    params.set("words", ["apple", "banana", "cherry", "orange"]);

    const expected = `
      Some text before the if operator
      There are not exactly 3 words in the list
      Some text after the if operator
    `;

    const result = render(prompt, params);
    expect(result).toBe(expected);
  });
});
