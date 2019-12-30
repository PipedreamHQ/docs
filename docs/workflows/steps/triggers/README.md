# Triggers

**Triggers** define the type of event that runs your workflow. Workflows execute on every trigger event.

For example, HTTP triggers expose a URL where you can send any HTTP requests. We'll run your workflow on each request. The Cron Scheduler trigger runs your workflow on a schedule.

Today, we support [HTTP](#http), [Cron Scheduler](#cron-scheduler), and [email](#email) triggers. In the future we plan to support SQL, AMQP, and more. If there's a trigger you'd like supported, please [let us know](/support/).

[[toc]]

## HTTP

When you select the **HTTP** trigger, we create a URL endpoint specific to your workflow.

You can send any HTTP requests to this endpoint, from anywhere on the web. You can configure the endpoint as the destination URL for a webhook or send HTTP traffic from your application - we'll accept any [valid HTTP request](#valid-requests).

### Accessing HTTP request data

You can access properties of the HTTP request, like the method, payload, headers, and more, in [the `event` object](/workflows/events/#event-format), accessible in any [code](/workflows/steps/code/) or [action](/workflows/steps/actions/) step.

### Valid Requests

You can send a request to your endpoint using any valid HTTP method: `GET`, `POST`, `HEAD`, and more.

We default to generating HTTPS URLs in the UI, but will accept HTTP requests against the same endpoint URL.

You can send data to any path on this host, with any query string parameters. You can access the full URL in the `event` object if you'd like to write code that interprets requests with different URLs differently.

You can send data of any [Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml) in the body of your request.

The primary limit we impose is on the size of the request body: we'll issue a `413 Payload Too Large` status when the body [exceeds our specified limit](#request-entity-too-large).

### How Pipedream handles JSON payloads

JSON is the main data exchange format on the web today. Pipedream optimizes for the case where you've sent JSON as the source event to a workflow.

When you send JSON in the HTTP payload, or when JSON data is sent in the payload from a webhook provider, **Pipedream converts that JSON to its equivalent JavaScript object**. The trigger data can be referenced using either `event` or the `steps` object.

You can confirm this JSON -> JavaScript object conversion occurred by examining the `event.inferred_body_type` property. If this is JSON, we correctly recognized the payload as such, and converted `event.body` to an object accordingly.

In the [Inspector](/workflows/events/inspect/), we present `event.body` cleanly, indenting nested properties, to make the payload easy to read. Since `event.body` is a JavaScript object, it's easy to reference and manipulate properties of the payload using dot-notation.

### Cross-Origin HTTP Requests

We return the following headers on HTTP `OPTIONS` requests:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

Thus, your endpoint will accept [cross-origin HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) from any domain, using any standard HTTP method.

### HTTP Responses

#### Default HTTP response

By default, when you send a [valid HTTP request](#valid-requests) to your endpoint URL, you should expect to receive a `200 OK` status code with the following payload:

```
<p><b>Success!</b></p>
<p>To customize this response, check out our docs <a href="https://docs.pipedream.com/workflows/steps/triggers/#http-responses">here</a></p>
```

When you're processing HTTP requests, you often don't need to issue any special response to the client. We issue this default response so you don't have to write any code to do it yourself.

#### Customizing the HTTP response

If you need to issue a custom HTTP response from a workflow, **you can use the `$respond()` function in a Code or Action step**.

`$respond()` takes a single argument: an object with properties that specify the body, headers, and HTTP status code you'd like to respond with:

```javascript
$respond({
  status: 200,
  headers: { "my-custom-header": "value" },
  body: { message: "My custom response" } // This can be any string, object, or Buffer
});
```

The value of the `body` property can be either a string, object, or [Buffer](https://nodejs.org/api/buffer.html#buffer_buffer) (binary data). Attempting to return any other data may yield an error.

You can **Copy** [this example workflow](https://pipedream.com/@dylburger/issue-an-http-response-from-a-workflow-p_ljCRdv/edit) and make an HTTP request to its endpoint URL to experiment with this.

#### Timing of `$respond()` execution

You may notice some response latency calling workflows that use `$respond()` from your HTTP client. By default, `$respond()` is called at the end of your workflow, after all other code is done executing, so it may take some time to issue the response back.

If you need to issue an HTTP response in the middle of a workflow, see the section on [returning a response immediately](#returning-a-response-immediately).

#### Returning a response immediately

You can issue an HTTP response within a worklow, and continue the rest of the workflow execution, by setting the `immediate` property to `true`:

```javascript
$respond({
  immediate: true,
  status: 200,
  headers: { "my-custom-header": "value" },
  body: { message: "My custom response" }
});
```

Passing `immediate: true` tells `$respond()` to issue a response back to the client at this point in the workflow. After the HTTP response has been issued, the remaining code in your workflow runs.

This can be helpful, for example, when you're building a Slack bot. When you send a message to a bot, Slack requires a `200 OK` response be issued immediately, to confirm receipt:

```javascript
$respond({
  immediate: true,
  status: 200,
  body: ""
});
```

Once you issue the response, you'll probably want to process the message from the user and respond back with another message or data requested by the user.

[Here's an example workflow](https://pipedream.com/@dylburger/issue-http-response-immediately-continue-running-workflow-p_pWCWGJ) that shows how to use `immediate: true` and run code after the HTTP response is issued.

#### Errors with HTTP Responses

If you use `$respond()` in a workflow, **you must always make sure `$respond()` is called in your code**. If you make an HTTP request to a workflow, and run code where `$respond()` is _not_ called, your endpoint URL will issue a `400 Bad Request` error with the following body:

```
No $respond called in workflow
```

This might happen if:

- You call `$respond()` conditionally, where it does not run under certain conditions.
- Your workflow throws an Error before you run `$respond()`.
- You return data in the `body` property that isn't a string, object, or Buffer.

If you can't handle the `400 Bad Request` error in the application calling your workflow, you can implement `try` / `finally` logic to ensure `$respond()` always gets called with some default message. For example:

```javascript
try {
  // Your code here that might throw an exception or not run
} finally {
  $respond({
    status: 200,
    body: {
      msg: "Default response"
    }
  });
}
```

### Errors

Occasionally, you may encounter errors when sending requests to your endpoint:

#### Request Entity Too Large

The endpoint will issue a `413 Payload Too Large` status code when the body of your request exceeds `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`.

In this case, the request will still appear in the inspector, with information on the error.

#### API key does not exist

Your API key is the host part of the endpoint, e.g. the `eniqtww30717` in `eniqtww30717.m.pipedream.net`. If you attempt to send a request to an endpoint that does not exist, we'll return a `404 Not Found` error.

We'll also issue a 404 response on workflows with an HTTP trigger that have been [deactivated](/workflows/managing/#deactivating-workflows).

#### Too Many Requests

If you send too many requests to your HTTP source within a small period of time, we may issue a `429 Too Many Requests` response. [Review our limits](/limits/) to understand the conditions where you might be throttled.

You can also [reach out](/support/) to inquire about raising this rate limit.

If you control the application sending requests, you should implement [a backoff strategy](https://medium.com/clover-platform-blog/conquering-api-rate-limiting-dcac5552714d) to temporarily slow the rate of events.

## Webhook

A **Webhook** trigger is an alias for the [HTTP](#http) trigger. They are equivalent in every way. You can trigger workflows on HTTP requests using either the HTTP or Webhook trigger.

## Cron Scheduler

Pipedream allows you to run hosted cron jobs — any code run on a schedule — for free.

We call these cron jobs "[workflows](/what-is-pipedream/#what-are-workflows)". Workflows are just scripts that run on a schedule.

You can write a cron job to:

- [Send an HTTP request to any URL on a schedule](https://pipedream.com/@dylburger/send-an-http-post-request-on-a-schedule-p_KwCYBx/readme)
- [Send a scheduled message to email](https://pipedream.com/@dylburger/541cd2a9ef220f04fefa8f2d440c38d2-p_q6CMjp/readme), Slack, Discord, or any messaging app
- Pull data from an API, process it, and send the results to Slack, or even data stores like Amazon S3
- [Run any Node.js (JavaScript) code, using almost any npm package](https://pipedream.com/@dylburger/email-the-top-story-from-hacker-news-every-day-p_JZC28O/readme). **This lets you do almost anything you want on a schedule**.

Pipedream manages the servers where these cron jobs run, so you don't have to worry about setting up a server of your own or operating some service just to run code on a schedule. You write the workflow, we take care of the rest.

### Choosing a cron trigger

To create a cron job, create a new workflow and search for the **Cron Scheduler** trigger:

<div>
<img alt="Cron Scheduler source" width="400" src="./images/cron-scheduler-source.png">
</div>

By default, your cron job will be turned **Off**. **To enable it, select either of the scheduling options**:

- **Simple** : run the job every N days, hours, minutes (e.g. every 1 day, every 3 hours).
- **Cron expression** : schedule your job using a cron expression. For example, the expression `0 0 * * *` will run the job every day at midnight. Cron expressions can be tied to any timezone.

### Testing a cron job

If you're running a cron job once a day, you probably don't want to wait until the next day's run to test your new code. You can manually run the workflow associated with a cron job at any time by pressing the **Send Test Event** button.

### Future executions of your cron job

You'll see the time your job is scheduled to run next under the **Next Job** section of the [Inspector](/workflows/events/inspect/).

### Job History

You'll see the history of job executions under the **Job History** section of the [Inspector](/workflows/events/inspect/).

Clicking on a specific job shows the execution details for that job — all the logs and observability associated with that run of the workflow.

### Trigger a notification to an external service (email, Slack, etc.)

You can send yourself a notification — for example, an email or a Slack message — at any point in a workflow by using the relevant [Action](/workflows/steps/actions/) or [Destination](/destinations/).

If you'd like to email yourself when a job finishes successfully, you can use the [Email Destination](/destinations/email/). You can send yourself a Slack message using the Slack Action, or trigger an [HTTP request](/destinations/http/) to an external service.

You can also [write code](/workflows/steps/code/) to trigger any complex notification logic you'd like.

### Rate Limit

When you're testing cron jobs, you may encounter **Rate Limit Exceeded** errors. Cron jobs can be tested no more than twice a minute. If you encounter this error, wait one minute and try again.

### Troubleshooting your cron jobs

When you run a cron job, you may need to troubleshoot errors or other execution issues. Pipedream offers built-in, step-level logs that show you detailed execution information that should aid troubleshooting.

Any time a cron job runs, you'll see a new execution appear in the [Inspector](/workflows/events/inspect/). This shows you when the cron job ran, how long it took to run, and any errors that might have occurred. **Click on any of these lines in the Inspector to view the details for a given run**.

Code steps show [Logs](/workflows/steps/code/#logs) below the step itself. Any time you run `console.log()` or other functions that print output, you should see the logs appear directly below the step where the code ran.

[Actions](/workflows/steps/actions/) and [Destinations](/destinations/) also show execution details relevant to the specific Action or Destination. For example, when you use the [HTTP Destination](/destinations/http/) to make an HTTP request, you'll see the HTTP request and response details tied to that Destination step:

### Limitations

Cron jobs can be run at most once a minute. Any cron expression that specifies a higher frequency will be rejected.

Cron jobs can run for at most 30 seconds. If your workflow takes longer than 30 seconds to execute, you'll see a `TIMEOUT` error for that run, and will be able to review all logs up until the timeout occurred.

There are other limits that apply to all workflows on Pipedream — see our [Limits docs](/limits/#workflows) for more information.

## Email

When you select the **Email** trigger, we create an email address specific to your workflow. Any email sent to this address triggers your workflow.

[Read more about the shape of the email trigger event](/workflows/events/#email).

### Limitations

See the [Email Trigger section of our Limits doc](/limits/#email-triggers) to learn more about the limits of the email trigger.

## Don't see a trigger you need?

If you don't see a trigger you'd like us to support, please [let us know](https://pipedream.com/community/).

<Footer />
