# Sources

Every pipeline needs data to operate on. Sources are the interface we give you to send data to a pipeline. Sources pass the associated event on to the remaining steps of the pipeline.

Today, we support Webhook sources, and plan to support others — SQL, scheduled code cells, and more — in the future. If there's a source you'd like to see, [let us know](/support/).

[[toc]]

## Webhook Sources

When you create a new **Webhook** source, we create a URL endpoint specific to your pipeline.

While we call the source "Webhook", it's technically a general HTTP source. You can send any HTTP requests to this endpoint, from anywhere on the web. You can configure the endpoint as the destination URL for a webhook or send HTTP traffic from your application - we'll accept any [valid HTTP request](#valid-requests).

## Stripe, Sendgrid, and other SaaS sources

You'll notice a range of other sources available to choose from on new pipelines:

<div>
<img alt="List of SaaS sources" src="./images/list-of-sources.png">
</div>

These sources all utilize webhooks for delivering new events to pipelines, and operate in like a Webhook source in every way. Additionally, each of these sources display information specific to the SaaS app in the Inspector, which can help you better distinguish events sent to a pipeline.

For example, the Github source displays the **Action** and **Repository** contained in the event:

Today we support the following SaaS sources:

- Stripe
- Sendgrid
- Zapier
- Twilio
- Github
- Segment
- Iterable

We're planning to add many more sources in the future. If you'd like to see a specific one, please [let us know on Spectrum](https://spectrum.chat/pipedream/feature-requests?tab=posts).

### Valid Requests

You can send a request to your endpoint using any valid HTTP method: `GET`, `POST`, `HEAD`, and more.

We default to generating HTTPS URLs in the UI for security, but will accept HTTP requests against the same endpoint URL.

Moreover, you can send data to any path on this host, with any query string parameters. We'll display the path in the [Inspector](/notebook/inspector/), and you can access the full URL in [`$event`](/notebook/dollar-event/) if you'd like to write code that interprets requests with different URLs differently.

You can find all of the HTTP request metadata associated with your event in `$event`. Some common properties, like method, headers, URL and body, are included as top-level keys. The rest are included under the `proto` object:

<div>
<img alt="Proto object of $event" width="361" src="./images/proto.png">
</div>

We describe the full format of `$event` in the [associated docs](/notebook/dollar-event/).

You can send data of any [Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml) in the body of your request.

The primary limit we impose is on the size of the request body: we'll issue a `413 Payload Too Large` status when the body [exceeds our specified limit](#request-entity-too-large).

### Cross-Origin HTTP Requests

We return the following headers on HTTP `OPTIONS` requests:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

Thus, your endpoint will accept [cross-origin HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) from any domain, using any standard HTTP method.

### HTTP Responses

When you send a [valid HTTP request](#valid-requests) to your source endpoint URL, you should expect to receive a `200 OK` status code with the following JSON payload:

```json
{ "success": true }
```

See the [Errors](#errors) section for more information on interpreting errors you might receive when sending requests.

### Errors

Occasionally, you may encounter errors when sending requests to your endpoint:

#### Request Entity Too Large

The endpoint will issue a `413 Payload Too Large` status code when the body of your request exceeds `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`.

In this case, the request will still appear in the inspector, with information on the error.

#### API key does not exist

Your API key is the host part of the endpoint, e.g. the `eniqtww30717` in `eniqtww30717.m.pipedream.net`. If you attempt to send a request to an endpoint that does not exist, we'll return a `404 Not Found` error.

#### Too Many Requests

If you send too many requests to your Webhook source within a small period of time, we may issue a `429 Too Many Requests` response. [Review our limits](/limits/) to understand the conditions where you might be throttled.

If you control the application sending requests, you should implement [a backoff strategy](https://medium.com/clover-platform-blog/conquering-api-rate-limiting-dcac5552714d) to temporarily slow the rate of events.

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
