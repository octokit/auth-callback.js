import type {
  AnyResponse,
  EndpointDefaults,
  EndpointOptions,
  RequestInterface,
  RequestParameters,
  Route,
  Callback,
} from "./types.js";

import { withAuthorizationPrefix } from "./with-authorization-prefix.js";

export async function hook(
  callback: Callback,
  request: RequestInterface,
  route: Route | EndpointOptions,
  parameters?: RequestParameters,
): Promise<AnyResponse> {
  const endpoint: EndpointDefaults = request.endpoint.merge(
    route as string,
    parameters,
  );

  const result = await callback();
  if (!result) {
    return request(endpoint as EndpointOptions);
  }

  const token = result.replace(/^(token|bearer) +/i, "");
  endpoint.headers.authorization = withAuthorizationPrefix(token);

  return request(endpoint as EndpointOptions);
}
