import type * as OctokitTypes from "@octokit/types";

export type AnyResponse = OctokitTypes.OctokitResponse<any>;
export type StrategyInterface = OctokitTypes.StrategyInterface<
  [StrategyOption],
  [],
  Authentication
>;
export type EndpointDefaults = OctokitTypes.EndpointDefaults;
export type EndpointOptions = OctokitTypes.EndpointOptions;
export type RequestParameters = OctokitTypes.RequestParameters;
export type RequestInterface = OctokitTypes.RequestInterface;
export type Route = OctokitTypes.Route;

export type Token = string;
export type Callback = () => Token | undefined | Promise<Token | undefined>;
export type StrategyOption = { callback: Callback };

export type UnauthenticatedAuthentication = {
  type: "unauthenticated";
};
export type OAuthTokenAuthentication = {
  type: "token";
  tokenType: "oauth";
  token: Token;
};
export type InstallationTokenAuthentication = {
  type: "token";
  tokenType: "installation";
  token: Token;
};
export type AppAuthentication = {
  type: "token";
  tokenType: "app";
  token: Token;
};
export type Authentication =
  | UnauthenticatedAuthentication
  | OAuthTokenAuthentication
  | InstallationTokenAuthentication
  | AppAuthentication;
