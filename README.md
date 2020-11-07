# auth-callback.js

> GitHub API authentication using a callback method

[![@latest](https://img.shields.io/npm/v/@octokit/auth-callback.svg)](https://www.npmjs.com/package/@octokit/auth-callback)
[![Build Status](https://github.com/octokit/auth-callback.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-callback.js/actions?query=workflow%3ATest+branch%3Amain)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=octokit/auth-callback.js)](https://dependabot.com/)

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
const auth = createCallbackAuth(
  () => "1234567890abcdef1234567890abcdef12345678"
);
const authentication = await auth();
// {
//   type: 'token',
//   token: '1234567890abcdef1234567890abcdef12345678'
// }
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
