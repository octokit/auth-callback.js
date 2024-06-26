import { auth } from "./auth.js";
import { hook } from "./hook.js";
import type {
  StrategyInterface,
  StrategyOption,
  Authentication,
} from "./types.js";

export type Types = {
  StrategyOptions: StrategyOption;
  AuthOptions: never;
  Authentication: Authentication;
};

export const createCallbackAuth: StrategyInterface =
  function createCallbackAuth(options: StrategyOption) {
    if (!options || !options.callback) {
      throw new Error(
        "[@octokit/auth-callback] No options.callback passed to createCallbackAuth",
      );
    }

    if (typeof options.callback !== "function") {
      throw new Error(
        "[@octokit/auth-callback] options.callback passed to createCallbackAuth is not a function",
      );
    }

    return Object.assign(auth.bind(null, options.callback), {
      hook: hook.bind(null, options.callback),
    });
  };
