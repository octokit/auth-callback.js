import { auth } from "./auth";
import { hook } from "./hook";
import { StrategyInterface, Callback, Authentication } from "./types";

export type Types = {
  StrategyOptions: Callback;
  AuthOptions: never;
  Authentication: Authentication;
};

export const createCallbackAuth: StrategyInterface = function createCallbackAuth(
  callback: Callback
) {
  if (!callback) {
    throw new Error(
      "[@octokit/auth-callback] No callback passed to createCallbackAuth"
    );
  }

  if (typeof callback !== "function") {
    throw new Error(
      "[@octokit/auth-callback] Callback passed to createCallbackAuth is not a function"
    );
  }

  return Object.assign(auth.bind(null, callback), {
    hook: hook.bind(null, callback),
  });
};
