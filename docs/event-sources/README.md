# What are Event Sources?

**Event sources turn any API into an event stream. They can also turn any event stream into an API**.

Sources collect data from services like Github, Stripe, the bitcoin blockchain, RSS feeds, and more. They emit new events produced by the service, which you can consume using Pipedream's APIs.

Event sources run on Pipedream's infrastructure, but you can retrieve emitted events in your own apps using the [Pipedream CLI](/cli/reference/), [REST API](/api/reference/), or [SSE stream tied to your source](/event-sources/consuming-events/).

[[toc]]

## Preview release

::: warning
Pipedream Event Sources are in preview, and we'd love your feedback on how you'd like to use them, and what we can improve. Please reach out on [Slack](https://pipedream.com/community) or raise an issue on our [Github roadmap](https://github.com/PipedreamHQ/roadmap) with any questions or suggestions.

Since this is a preview release, the documentation below, the [REST API](/api/reference), and the [CLI](/cli/reference/) are subject to change based on feedback.
:::

## Example: HTTP source

The simplest event source is an **HTTP source**.

When you create an HTTP source:

- You get a unique HTTP endpoint that you can send any HTTP request to.
- You can view the details of any HTTP request sent to your endpoint: its payload, headers, and more.
- You can delete the source and its associated events once you're done.

HTTP sources are essentially [request bins](https://requestbin.com) that can be managed via API.

HTTP sources are a good example of how you can turn an event stream into an API: the HTTP requests are the **event stream**, generated from your application, client browsers, webhooks, etc. Then, you can retrieve HTTP requests via Pipedream's [**REST API**](/api/reference/), or stream them directly to other apps using the [SSE interface](/event-sources/consuming-events/).

## Create your first HTTP source

[**See the Github quickstart to get started**](https://github.com/PipedreamHQ/pipedream/tree/master/apps/http#quickstart).

## Limits

Event sources are subject to the [same limits as Pipedream workflows](/limits).

<Footer />
