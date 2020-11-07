import { Callback, Authentication } from "./types";

export async function auth(callback: Callback): Promise<Authentication> {
  const result = await callback();

  if (!result) {
    return {
      type: "unauthenticated",
    };
  }

  const token = result.replace(/^(token|bearer) +/i, "");

  const tokenType =
    token.split(/\./).length === 3
      ? "app"
      : /^v\d+\./.test(token)
      ? "installation"
      : "oauth";

  return {
    type: "token",
    token: token,
    tokenType,
  };
}
