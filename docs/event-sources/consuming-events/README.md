# Consuming events from sources

You can consume events from a source in one of three ways:

- In real-time, using the [SSE stream](#sse) linked to your source
- In real-time, via the CLI's [`pd events` command](/event-sources/consuming-events/#subscribe-to-new-events-using-the-pipedream-cli)
- In batch, using the [HTTP API](#http-api)

## SSE

As soon as you deploy an event source, Pipedream creates a private [SSE stream](#what-is-sse) linked to the source. Each event emitted by the source is published to this SSE stream, so your application can subscribe to the stream to process new events.

### What is SSE?

[Server-sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) (SSE) is a spec that dictates how servers can send events directly to clients that subscribe to those events, similar to [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and related server-to-client push technologies.

Unlike WebSockets, SSE enables one-way communication from server to clients (WebSockets enable bidirectional communication between server and client, allowing you to pass messages back and forth). Luckily, if you only need a client to subscribe to events from a server, and don't require bidirectional communication, SSE is simple way to make that happen.

### Connecting to the SSE stream directly

To process events from your source's SSE stream, you'll need to:

- Get the SSE URL for your source's events using [`pd list streams`](/cli/reference/#pd-list)
- Connect to the SSE stream, passing your Pipedream API key in the `Authorization` HTTP header using [Bearer Auth](/api/auth/#authorizing-api-requests).

[**See this repo**](https://github.com/PipedreamHQ/node-sse-example) for an example Node.js app that processes events from a Pipedream SSE stream.

Most programming languages have SSE clients that facilitate connecting to SSE streams and processing events from those streams. For example, the Node.js example repo uses the [`eventsource` npm package](https://www.npmjs.com/package/eventsource), which implements the [`EventSource` API](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events).

### Subscribe to new events using the Pipedream CLI

The [`pd events` command](/cli/reference/#pd-events) makes it easy to quickly stream events from a source:

```bash
pd events -f <source-id-or-name>
```

This connects to the SSE stream for the source and prints new events as they're emitted.

### `:sse-handshake` messages

Every 15 seconds, we'll send a message with the `:sse-handshake` comment to keep open SSE connections alive. These comments should be automatically ignored when you're listening for messages using the [`EventSource` API](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events).

We send these because [the SSE spec](https://www.w3.org/TR/2009/WD-eventsource-20090421/#notes) notes that

> Legacy proxy servers are known to, in certain cases, drop HTTP connections after a short timeout. To protect against such proxy servers, authors can include a comment line (one starting with a ':' character) every 15 seconds or so.

## HTTP API

You can retrieve events via the [HTTP API](/api/reference/), too. The API stores the last 100 events sent to a source.

See the [API docs](/api/reference/) for more information and code samples.

<Footer />
