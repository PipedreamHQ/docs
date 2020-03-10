# Logs

Sources can produce log using `console` statements, and can throw errors. These logs show up in the UI for each source, under **LOGS**.

[Like events](/event-sources/consuming-events/), logs can also be consumed programmatically:

- Connecting to the [SSE stream](#sse) directly
- Using the [`pd logs`](#pd-logs) CLI command

## SSE

### What is SSE?

[See the docs on SSE here](/event-sources/consuming-events/#what-is-sse).

### Connecting to the SSE stream directly

[Just like for events](/event-sources/consuming-events/#connecting-to-the-sse-stream-directly), logs are published to a source-specific SSE stream.

To connect to this stream, you'll need to:

- Get the SSE URL for your source using [`pd list streams`](/cli/reference/#pd-list)
- Connect to the SSE stream, passing your Pipedream API key in the `Authorization` HTTP header using [Bearer Auth](/api/auth/#authorizing-api-requests).

```text
λ pd list streams

  NAME                  TYPE   VISIBILITY  SSE
  http                  http   private     https://rt.pipedream.com/sse/dc/dc_abc123/emits
```

This SSE URL points to the `/emits` stream, which contains your source's events. **Change `/emits` to `/observations` to connect to the logs stream**.

[**See this repo**](https://github.com/PipedreamHQ/node-sse-example) for an example Node.js app that processes events from a Pipedream SSE stream.

Most programming languages have SSE clients that facilitate connecting to SSE streams and processing events from those streams. For example, the Node.js example repo uses the [`eventsource` npm package](https://www.npmjs.com/package/eventsource), which implements the [`EventSource` API](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events).

## `pd logs`

To stream new logs for a source, run:

```bash
pd logs <source-id-or-name>
```

The CLI will print new logs as the source produces them.

## Limits

Pipedream stores the last 100 logs (standard output and standard error) for each source.

<Footer />
