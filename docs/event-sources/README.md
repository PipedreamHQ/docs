# What are Event Sources?

**Event sources turn any API into an event stream. They can also turn any event stream into an API**.

Event sources run on Pipedream's infrastructure and collect data from services like Github, Stripe, the bitcoin blockchain, RSS feeds, and more. They emit new events produced by the service, which you can inspect in the UI or consume using [batch](/api/rest/) or [real-time](/api/sse/) APIs.

::: warning
Pipedream Event Sources are in preview, and we'd love your feedback on how you'd like to use them, and what we can improve. Please reach out on [Slack](https://pipedream.com/community) or raise an issue on our [Github roadmap](https://github.com/PipedreamHQ/roadmap) with any questions or suggestions.

Since this is a preview release, the documentation below, the [REST API](/api/rest/), and the [CLI](/cli/reference/) are subject to change based on feedback.
:::

[[toc]]

## Consuming events from sources

You can view the events for a source in the sources UI, under the **EVENTS** section of that source.

You can also consume events programmatically from a source in one of three ways:

- In batch, using the [REST API](#rest-api)
- In real-time, using the [SSE stream](/api/sse/) linked to your source
- In real-time, via the CLI's [`pd events` command](/api/sse/#subscribe-to-new-events-using-the-pipedream-cli)

## Example: HTTP source

The simplest event source is an **HTTP source**.

When you create an HTTP source:

- You get a unique HTTP endpoint that you can send any HTTP request to.
- You can view the details of any HTTP request sent to your endpoint: its payload, headers, and more.
- You can delete the source and its associated events once you're done.

HTTP sources are essentially [request bins](https://requestbin.com) that can be managed via API.

HTTP sources are a good example of how you can turn an event stream into an API: the HTTP requests are the **event stream**, generated from your application, client browsers, webhooks, etc. Then, you can retrieve HTTP requests via Pipedream's [**REST API**](/api/rest/), or stream them directly to other apps using the [SSE interface](/api/sse/).

[**See the Github quickstart for more information on HTTP event sources**](https://github.com/PipedreamHQ/pipedream/tree/master/components/http#quickstart).

## Example: Cron jobs

You can also use event sources to run any Node code on a schedule, allowing you to poll a service or API for data and emit that data as an event. The emitted events can trigger Pipedream workflows, and can be retrieved using Pipedream's [**REST API**](/api/rest/) or [SSE interface](/api/sse/).

[**See the Github quickstart for more information and documentation**](https://github.com/PipedreamHQ/pipedream/tree/master/interfaces/timer).

## Example: RSS

You can run an event source that polls an RSS for new items and emits them in real time as formatted JSON.

[**Learn more here**](https://rss.pipedream.com/).

## Limits

Event sources are subject to the [same limits as Pipedream workflows](/limits).

<Footer />
