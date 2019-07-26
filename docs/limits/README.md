---
prev: false
next: false
---

# Limits

Currently, [Pipedream is free](/pricing/) for all users, subject to the technical limits noted below.

[[toc]]

## Number of Workflows

**Currently, you can create an unlimited number of workflows**, as long as each operates under the limits below.

## Webhook Sources

The following limits apply to [Webhook sources](/notebook/sources/#webhook-sources).

### HTTP Request Body Size

**The body of HTTP requests sent to a source is limited to `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`**.

Your endpoint will issue a `413 Payload Too Large` status code when the body of your request exceeds `{{$site.themeConfig.PAYLOAD_SIZE_LIMIT}}`.

### QPS (Queries Per Second)

Generally the rate of HTTP requests sent to an endpoint is quantified by QPS, or _queries per second_. A query in this context refers to an HTTP request.

**You can send an average of 10 requests per second to your webhook source**. Any requests that exceed that threshold may trigger rate limiting. If you're rate limited, we'll return a `429 Too Many Requests` response. If you control the application sending requests, you should retry the request with [exponential backoff](https://cloud.google.com/storage/docs/exponential-backoff) or a similar technique.

Generally, we'll also accept short burts of traffic, as long as you remain around an average of 10 QPS (e.g. sending a batch of 50 requests every 30 seconds should not trigger rate limiting).

## Workflows

### Time

Every event you send to a workflow triggers the execution of that workflow. **Workflow code is limited to 10 seconds per execution for HTTP triggers, and 30 seconds for cron triggers**.

If your code exceeds this limit, we'll throw a `TIMEOUT` error and stop your workflow. Any partial logs and observability associated with code cells that ran successfully before the timeout will be attached to the event in the UI, so you can examine the state of your workflow and troubleshoot where it may have failed.

Events that trigger a `TIMEOUT` error will appear in red in the [Inspector](/notebook/inspector/):

<div>
<img alt="timeout error in inspector" width="436" src="./images/timeout-err-inspector.png">
</div>

You'll see the timeout error, also in red, in the cell at which the code timed out:

<div>
<img alt="timeout error in cell" width="436" src="./images/timeout-err-cell.png">
</div>

### Memory

**You should expect to have access to at least `192 MB` of memory for your code and libraries** during workflow execution.

### Disk

Your code, or a third party library, may need access to disk during the execution of your workflow. **Your workflow has access to `512 MB` of disk in the `/tmp` directory**.

## Acceptable Use

We ask that you abide by our [Acceptable Use](https://pipedream.com/terms/#b-acceptable-use) policy. In short this means: don't use Pipedream to break the law; don't abuse the platform; and don't use the platform to harm others.

<Footer />
