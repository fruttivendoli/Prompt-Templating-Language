import { test, expect } from "bun:test";
import { render } from "../src";

test("No parameter in prompt", () => {
  const prompt = "This is a simple prompt with no parameters at all";
  const params = new Map();

  const result = render(prompt, params);

  expect(result).toBe(prompt);
});
