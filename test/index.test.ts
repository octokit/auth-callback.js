import { request } from "@octokit/request";
import fetchMock, { MockMatcherFunction } from "fetch-mock";
import { Octokit } from "@octokit/core";

import { createCallbackAuth } from "../src/index";

test("README example", async () => {
  let token: string | undefined;

  const auth = createCallbackAuth({ callback: () => token });
  expect(await auth()).toEqual({
    type: "unauthenticated",
  });

  token = "secret123";
  expect(await auth()).toEqual({
    type: "token",
    token: "secret123",
    tokenType: "oauth",
  });
});

test("installation token", async () => {
  const auth = createCallbackAuth({
    callback: () => "v1.1234567890abcdef1234567890abcdef12345678",
  });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "v1.1234567890abcdef1234567890abcdef12345678",
    tokenType: "installation",
  });
});

test("JSON Web Token (GitHub App Authentication)", async () => {
  const auth = createCallbackAuth({
    callback: () =>
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
  });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    tokenType: "app",
  });
});

test("invalid token", async () => {
  const auth = createCallbackAuth({ callback: () => "whatislove" });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "whatislove",
    tokenType: "oauth",
  });
});

test("no callback", async () => {
  try {
    // @ts-ignore
    const auth = createCallbackAuth();
    throw new Error("Should not resolve");
  } catch (error: any) {
    expect(error.message).toMatch(
      /no options.callback passed to createCallbackAuth/i
    );
  }
});

test("callback is not a function", async () => {
  try {
    // @ts-ignore
    const auth = createCallbackAuth({ callback: {} });
    throw new Error("Should not resolve");
  } catch (error: any) {
    expect(error.message).toMatch(
      /options.callback passed to createCallbackAuth is not a function/i
    );
  }
});

test("OAuth token with prefix", async () => {
  const auth = createCallbackAuth({
    callback: () =>
      "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
  });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    tokenType: "app",
  });
});

test("JWT with prefix", async () => {
  const auth = createCallbackAuth({
    callback: () => "token 1234567890abcdef1234567890abcdef12345678",
  });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "1234567890abcdef1234567890abcdef12345678",
    tokenType: "oauth",
  });
});

test("JWT with capitalized prefix", async () => {
  const auth = createCallbackAuth({
    callback: () => "Token 1234567890abcdef1234567890abcdef12345678",
  });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "1234567890abcdef1234567890abcdef12345678",
    tokenType: "oauth",
  });
});

test("JWT with capitalized prefix", async () => {
  const auth = createCallbackAuth({
    callback: () =>
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
  });
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    tokenType: "app",
  });
});

test('auth.hook(request, "GET /user")', async () => {
  const expectedRequestHeaders = {
    accept: "application/vnd.github.v3+json",
    authorization: "token 1234567890abcdef1234567890abcdef12345678",
    "user-agent": "test",
  };

  const matchGetUser: MockMatcherFunction = (url, { headers }) => {
    expect(url).toEqual("https://api.github.com/user");
    expect(headers).toStrictEqual(expectedRequestHeaders);
    return true;
  };

  const mock = fetchMock.sandbox().getOnce(matchGetUser, { id: 123 });

  const requestMock = request.defaults({
    headers: {
      "user-agent": "test",
    },
    request: {
      fetch: mock,
    },
  });

  const { hook } = createCallbackAuth({
    callback: () => "1234567890abcdef1234567890abcdef12345678",
  });
  const { data } = await hook(requestMock, "GET /user");

  expect(data).toStrictEqual({ id: 123 });
});

test("auth.hook() with JWT", async () => {
  const expectedRequestHeaders = {
    accept: "application/vnd.github.v3+json",
    authorization:
      "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    "user-agent": "test",
  };

  const matchGetUser: MockMatcherFunction = (url, { headers }) => {
    expect(url).toEqual("https://api.github.com/user");
    expect(headers).toStrictEqual(expectedRequestHeaders);
    return true;
  };

  const mock = fetchMock.sandbox().getOnce(matchGetUser, { id: 123 });

  const requestMock = request.defaults({
    headers: {
      "user-agent": "test",
    },
    request: {
      fetch: mock,
    },
  });

  const { hook } = createCallbackAuth({
    callback: () =>
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
  });
  const { data } = await hook(requestMock, "GET /user");

  expect(data).toStrictEqual({ id: 123 });
});

test("auth.hook() unauthenticated", async () => {
  const expectedRequestHeaders = {
    accept: "application/vnd.github.v3+json",
    "user-agent": "test",
  };

  const matchGetUser: MockMatcherFunction = (url, { headers }) => {
    expect(url).toEqual("https://api.github.com/");
    expect(headers).toStrictEqual(expectedRequestHeaders);
    return true;
  };

  const mock = fetchMock.sandbox().getOnce(matchGetUser, { id: 123 });

  const requestMock = request.defaults({
    headers: {
      "user-agent": "test",
    },
    request: {
      fetch: mock,
    },
  });

  const { hook } = createCallbackAuth({ callback: () => undefined });
  const { data } = await hook(requestMock, "GET /");

  expect(data).toStrictEqual({ id: 123 });
});

test("https://github.com/Belco90/octoclairvoyant/issues/22", async () => {
  new Octokit({
    authStrategy: createCallbackAuth,
    auth: {
      callback: () => "test",
    },
  });
});
