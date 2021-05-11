import { auth } from "./auth";
import { hook } from "./hook";
import { StrategyInterface, StrategyOption, Authentication } from "./types";

export type Types = {
  StrategyOptions: StrategyOption;
  AuthOptions: never;
  Authentication: Authentication;
};

export const createCallbackAuth: StrategyInterface =
  function createCallbackAuth(options: StrategyOption) {
    if (!options || !options.callback) {
      throw new Error(
        "[@octokit/auth-callback] No options.callback passed to createCallbackAuth"
      );
    }

    if (typeof options.callback !== "function") {
      throw new Error(
        "[@octokit/auth-callback] options.callback passed to createCallbackAuth is not a function"
      );
    }

    return Object.assign(auth.bind(null, options.callback), {
      hook: hook.bind(null, options.callback),
    });
  };
