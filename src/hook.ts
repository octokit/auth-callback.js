import {
  AnyResponse,
  EndpointDefaults,
  EndpointOptions,
  RequestInterface,
  RequestParameters,
  Route,
  Callback,
} from "./types";

import { withAuthorizationPrefix } from "./with-authorization-prefix";

export async function hook(
  callback: Callback,
  request: RequestInterface,
  route: Route | EndpointOptions,
  parameters?: RequestParameters
): Promise<AnyResponse> {
  const endpoint: EndpointDefaults = request.endpoint.merge(
    route as string,
    parameters
  );

  const token = (await callback()).replace(/^(token|bearer) +/i, "");
  endpoint.headers.authorization = withAuthorizationPrefix(token);

  return request(endpoint as EndpointOptions);
}
