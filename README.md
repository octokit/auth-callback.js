# auth-callback.js

> GitHub API authentication using a callback method

[![@latest](https://img.shields.io/npm/v/@octokit/auth-callback.svg)](https://www.npmjs.com/package/@octokit/auth-callback)
[![Build Status](https://github.com/octokit/auth-callback.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-callback.js/actions?query=workflow%3ATest+branch%3Amain)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `@octokit/auth-callback` directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { createCallbackAuth } from "https://cdn.pika.dev/@octokit/auth-callback";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/auth-callback`

```js
const { createCallbackAuth } = require("@octokit/auth-callback");
```

</td></tr>
</tbody>
</table>

```js
let token;

const auth = createCallbackAuth({ callback: () => token });
await auth();
// {
//   type: 'unauthenticated'
// }
token = "secret123";
await auth();
// {
//   type: 'token',
//   token: 'secret123',
//   tokenType: 'oauth'
// }
```

## `createCallbackAuth(options)`

The `createCallbackAuth` method accepts a single `options` parameter

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>options.callback</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>
        <strong>Required</strong>. A method that returns or resolves with a token string.
      </td>
    </tr>
  </tbody>
</table>

## `auth()`

The async `auth()` method does not accept any arguments

## Authentication object

The async `auth()` method resolves to one of two possible authentication objects

1. **Unauthenticated** if the `callback()` returns or resolves a falsy value
2. **Token authentication** if the `callback()` returns or resolves with a string value

### Unauthenticated

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>type</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"unauthenticated"</code>
      </td>
    </tr>
  </tbody>
</table>

### Token authentication

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>type</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"token"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The personal access token
      </td>
    </tr>
    <tr>
      <th>
        <code>tokenType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>

One of:

1. <code>"oauth"</code> (if returned string is an OAuth or personal access tokens)
2. <code>"installation"</code> (if returned string is an installation access tokens)
3. <code>"app"</code> (if returned string is a JSON Web Token (JWT) for GitHub App authentication)

</td>
    </tr>
  </tbody>
</table>

## `auth.hook(request, route, parameters)` or `auth.hook(request, options)`

`auth.hook()` hooks directly into the request life cycle. It amends the request to authenticate correctly based on the request URL.

The `request` option is an instance of [`@octokit/request`](https://github.com/octokit/request.js#readme). The `route`/`options` parameters are the same as for the [`request()` method](https://github.com/octokit/request.js#request).

`auth.hook()` can be called directly to send an authenticated request

```js
const { data: user } = await auth.hook(request, "GET /user");
```

Or it can be passed as option to [`request()`](https://github.com/octokit/request.js#request).

```js
const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook,
  },
});

const { data: user } = await requestWithAuth("GET /user");
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
