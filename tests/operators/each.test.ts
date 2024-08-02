import { describe, it, expect } from "bun:test";
import type { Parameter } from "../../src/types/parameter";
import { render } from "../../src";

describe("Each Operator", () => {
  it("Each Operator with simple list", () => {
    const prompt = `
      Some text before the each operator
      {#each words as word}
        Current list item: {word}
      {/each}
      Some text after the each operator
    `;

    const params = new Map<string, Parameter>();
    params.set("words", ["apple", "banana", "cherry"]);

    const expected = `
      Some text before the each operator
      Current list item: apple
      Current list item: banana
      Current list item: cherry
      Some text after the each operator
    `;

    const result = render(prompt, params);
    expect(result).toBe(expected);
  });
});
