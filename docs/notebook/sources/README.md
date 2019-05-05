# Sources

Every pipeline needs data to operate on. Sources are the interface we give you to send data to a pipeline.

## Webhook Sources

When you create a new webhook source, we create a URL endpoint specific to your pipeline.

You can send any HTTP requests to this endpoint, from anywhere on the web. You can configure the endpoint as the destination URL for a webhook or send HTTP traffic from your application - we'll accept any [valid HTTP request](#valid-requests).

### Valid Requests

You can send a request to your endpoint using any valid HTTP method: `GET`, `POST`, `HEAD`, and more.

You can send data of any [Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml) in the body of your request.

The primary limit we impose is on the size of the request body: we'll issue a `413 Payload Too Large` status when the body [exceeds our specified limit](#request-entity-too-large).

See the [Errors](#errors) section for more information on interpreting errors you might receive when sending requests.

## Cross-Origin HTTP Requests

We return the following headers on HTTP `OPTIONS` requests:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

Thus, your endpoint will accept [cross-origin HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) from any domain, using any standard HTTP method.

## Errors

Occasionally, you may encounter errors when sending requests to your endpoint:

### Request Entity Too Large

The endpoint will issue a `413 Payload Too Large` status code when the body of your request exceeds `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`.

In this case, the request will still appear in the inspector, with information on the error.

### API key does not exist

Your API key is the host part of the endpoint, e.g. the `eniqtww30717` in `eniqtww30717.m.pipedream.net`. If you attempt to send a request to an endpoint that does not exist, we'll issue a `404 Not Found` status.
