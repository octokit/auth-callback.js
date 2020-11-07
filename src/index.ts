import { VERSION } from "./version";

type Octokit = any;
type Options = {
  [option: string]: any;
};

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */
export function createCallbackAuth(octokit: Octokit, options: Options) {}
createCallbackAuth.VERSION = VERSION;
