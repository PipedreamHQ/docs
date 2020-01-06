---
prev: false
next: false
---

# Limits

Currently, [Pipedream is free](/pricing/) for all users, subject to the technical limits noted below.

**These limits are subject to change at any time**.

[[toc]]

## Number of Workflows

**Currently, you can create an unlimited number of workflows**, as long as each operates under the limits below.

## HTTP Triggers

The following limits apply to [HTTP triggers](/workflows/steps/triggers/#http).

### HTTP Request Body Size

**The body of HTTP requests sent to a source is limited to `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`**.

Your endpoint will issue a `413 Payload Too Large` status code when the body of your request exceeds `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`.

### QPS (Queries Per Second)

Generally the rate of HTTP requests sent to an endpoint is quantified by QPS, or _queries per second_. A query in this context refers to an HTTP request.

**You can send an average of 10 requests per second to your HTTP trigger**. Any requests that exceed that threshold may trigger rate limiting. If you're rate limited, we'll return a `429 Too Many Requests` response. If you control the application sending requests, you should retry the request with [exponential backoff](https://cloud.google.com/storage/docs/exponential-backoff) or a similar technique.

Generally, we'll also accept short bursts of traffic, as long as you remain around an average of 10 QPS (e.g. sending a batch of 50 requests every 30 seconds should not trigger rate limiting).

## Email Triggers

Currently, the same limits that apply to HTTP triggers also apply to [email triggers](/workflows/steps/triggers/#email). We limit the total size of the email body, headers, and attachments, and the rate at which emails can be sent.

See the [HTTP limits above](#http-triggers) for the specific limits.

## Workflows

### Time per execution

Every event sent to a workflow triggers a new execution of that workflow. Workflows have a default execution limit that varies with the trigger type:

- HTTP and Email-triggered workflows default to **30 seconds** per execution.
- Cron-triggered workflows default to **60 seconds** per execution.

If your code exceeds your workflow-level limit, we'll throw a `TIMEOUT` error and stop your workflow. Any partial logs and observability associated with code cells that ran successfully before the timeout will be attached to the event in the UI, so you can examine the state of your workflow and troubleshoot where it may have failed.

**You can change this default timeout in your [workflow's settings](/workflows/settings/), up to 300 seconds (5 minutes), or down to 1 second**.

Events that trigger a `TIMEOUT` error will appear in red in the [Inspector](/workflows/events/inspect/). You'll see the timeout error, also in red, in the cell at which the code timed out.

If you need to run a workflow that exceeds 5 minutes, please [reach out to our team](/support/).

### Execution time per day

**You have a total execution quota of 30 minutes (1,800,000 milliseconds) per day across all workflows in your account.**

You can view your current quota usage in your [Settings](https://pipedream.com/settings/billing).

Your quota is reset, daily, at 00:00 (midnight) UTC.

Pipedream records a minimum of `100ms` per execution. For example, if your workflow runs for `50ms`, you'll incur `100ms` of time towards your daily quota.

You'll receive an email when you exhaust 80% and 100% of your daily quota. Again, this quota will be reset every day at 00:00 UTC.

If this quota isn't sufficient for you use case, [reach out to our team](/support/) so we can learn more.

### Memory

**You should expect to have access to at least `192 MB` of memory for your code and libraries** during workflow execution.

### Disk

Your code, or a third party library, may need access to disk during the execution of your workflow. **Your workflow has access to `512 MB` of disk in the `/tmp` directory**.

## Acceptable Use

We ask that you abide by our [Acceptable Use](https://pipedream.com/terms/#b-acceptable-use) policy. In short this means: don't use Pipedream to break the law; don't abuse the platform; and don't use the platform to harm others.

<Footer />
