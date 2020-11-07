import { createCallbackAuth } from "../src";

describe("Smoke test", () => {
  it("is a function", () => {
    expect(createCallbackAuth).toBeInstanceOf(Function);
  });

  it("createCallbackAuth.VERSION is set", () => {
    expect(createCallbackAuth.VERSION).toEqual("0.0.0-development");
  });
});
