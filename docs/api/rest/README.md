# REST API

[[toc]]

## Overview

Use REST APIs to create and manage sources and source events. Workflow development and management is not currently supported via API.

::: warning
Sources and related APIs are current currently available for developers to preview. During the preview period features and APIs may change without advance notice. Please reach out on [Slack](https://pipedream.com/community) or raise an issue on our [Github roadmap](https://github.com/PipedreamHQ/roadmap) with any questions or suggestions.
:::

## Base URL

The base URL for all requests is:

```text
https://api.pipedream.com/v1
```

## Authentication

Pipedream uses [Bearer Authentication](https://oauth.net/2/bearer-tokens/) to authorize your access to the API. When you make API requests, pass an `Authorization` header of the following format:

```text
Authorization: Bearer <api key>
```

For example, here's how you can use `cURL` to fetch profile information for the authenticated user:

```bash
curl 'https://api.pipedream.com/v1/users/me' \
  -H 'Authorization: Bearer <api_key>'
```

Learn more about [API authentication](/api/auth)

## Errors

Pipedream uses conventional HTTP response codes to indicate the success or failure of an API request. Codes in the **2xx** range indicate success. Codes in the **4xx** range indicate an error that failed (e.g., a required parameter was omitted). Codes in the **5xx** range indicate an error with Pipedream’s server.

<!--
## Rate Limits
The API preview does not currently implement rate limiting of requests.
-->

## Operations

### Users

#### GET /users/me

**Request**

```
curl 'https://api.pipedream.com/v1/users/me' \
    -H 'Authorization: Bearer {api_key}'
```

**Example Response**

```
{
  "data": {
    "id": "...",
    "email": "...",
    "username": "...",
    "lambda_time_quota": 1800000,
    "api_key": "...",
    "lambda_time_used": 500000
  }
}
```

### Sources

#### List sources for a user

```
GET /users/me/sources/
```

#### Create a Source

```
POST /sources/
```

| Field          | Type   | Required | Description                                                                                                                                                                                    | Default Value |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| component_url  | string | optional | URL to the component. This may be a Github URL (e.g., `https://github.com/PipedreamHQ/pipedream/blob/master/components/http/http.js`). Either `component_url` or `component_code` is required. |               |
| component_code | string | optional | Inline component code. Either `component_url` or `component_code` is required.                                                                                                                 |               |
| name           | string | optional |                                                                                                                                                                                                |               |

#### Update a source

```
PUT /sources/{id}
```

| Field          | Type   | Required | Description                                                                                                                                                                                    | Default Value |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| component_url  | string | optional | URL to the component. This may be a Github URL (e.g., `https://github.com/PipedreamHQ/pipedream/blob/master/components/http/http.js`). Either `component_url` or `component_code` is required. |               |
| component_code | string | optional | Inline component code. Either `component_url` or `component_code` is required.                                                                                                                 |               |
| name           | string | optional |                                                                                                                                                                                                |               |

#### Delete a source

```
DELETE /sources/{id}
```

### Events

#### Get Source Events

Retrieve the last 100 events emitted by a source:

```
GET /sources/{id}/event_summaries
```

The event data for events larger than `1KB` may get truncated in the response. If you're processing larger events, and need to see the full event data, pass `?expand=event`:

```
GET /sources/{id}/event_summaries?expand=event
```

Pass `?limit=N` to retrieve the last **N** events:

```
GET /sources/{id}/event_summaries?limit=10
```

#### Delete source events

```
DELETE /sources/{id}/events
```

<Footer />
