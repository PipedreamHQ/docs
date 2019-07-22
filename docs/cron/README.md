---
prev: false
next: false
---

# Running Cron Jobs on Pipedream

Pipedream allows you to run hosted cron jobs — any code run on a schedule — for free.

We call these cron jobs "[workflows](/what-is-pipedream/#what-are-workflows)". Here, workflows are just scripts that run on a schedule.

You can write a cron job to:

- [Send an HTTP request to any URL on a schedule](https://pipedream.com/@dylburger/send-an-http-post-request-on-a-schedule-p_KwCYBx/readme)
- [Send a scheduled message to email](https://pipedream.com/@dylburger/541cd2a9ef220f04fefa8f2d440c38d2-p_q6CMjp/readme), Slack, Discord, or any messaging app
- Pull data from an API, process it, and send the results to Slack, or even data stores like Amazon S3
- [Run any Node.js (JavaScript) code, using almost any NPM package](https://pipedream.com/@dylburger/email-the-top-story-from-hacker-news-every-day-p_JZC28O/readme). **This lets you do almost anything you want on a schedule**.

Pipedream manages the servers where these cron jobs run, so you don't have to worry about setting up a server or operating some service just to run code on a schedule. You write the workflow, we take care of the rest.

[[toc]]

## Choosing a cron trigger

To create a cron job, create a new workflow and search for the **Cron Scheduler** source:

<div>
<img alt="Cron Scheduler source" width="400" src="./images/cron-scheduler-source.png">
</div>

By default, your cron job will be turned **Off**. To enable it, select either of the scheduling options:

- **Simple** : run the job every N days, hours, minutes (e.g. every 1 day, every 3 hours).
- **Cron expression** : schedule your job using a cron expression. For example, the expression `0 0 * * *` will run the job every day at midnight. Cron expressions can be tied to any timezone.

## Testing a cron job

If you're running a cron job once a day, you probably don't want to wait until the next day's run to test your new code. You can manually run the workflow associated with a cron job at any time by pressing the **Send Test Event** button.

## Trigger a notification

You can send yourself a notification at any point in a workflow by using the relevant [Action](/notebook/actions/) or [Destination](/notebook/destinations/).

For example, if you'd like to email yourself when a job finishes successfully, you can use the [Email Destination](/notebook/destinations/email/). You can send yourself a Slack message using the Slack Action, or trigger an [HTTP request](/notebook/destinations/http/) to an external service.

You can also [write code](/notebook/code/) to trigger any complex notification logic you'd like.

## Troubleshooting your cron jobs

When you run a cron job, you may need to troubleshoot errors or other execution issues. Pipedream offers built-in, step-level logs that show you detailed execution information that should aid troubleshooting.

Any time a cron job runs, you'll see a new execution appear in the [Inspector](https://docs.pipedream.com/notebook/inspector/). This shows you when the cron job ran, how long it took to run, and any errors that might have occurred. **Click on any of these lines in the Inspector to view the details for a given run**.

Code steps show [Logs](https://docs.pipedream.com/notebook/code/#logs) below the step itself. Any time you run `console.log()` or other functions that print output, you should see the logs appear directly below the step where the code ran:

<div>
<img alt="console.log and error messages" width="500" src="../notebook/code/images/console-log-error.png">
</div>

[Actions](/notebook/actions/) and [Destinations](/notebook/destinations/) also show execution details relevant to the specific Action or Destination. For example, when you use the [HTTP Destination](/notebook/destinations/http/) to make an HTTP request, you'll see the HTTP request and response details tied to that Destination step:

<div>
<img alt="HTTP request and response" src="../notebook/destinations/http/images/http-request-response.png">
</div>

## Limitations

Cron jobs can be run at most once a minute. Any cron expression that specifies a higher frequency will be rejected.

Cron jobs can run for at most 30 seconds. If your workflow takes longer than 30 seconds to execute, you'll see a `TIMEOUT` error for that run, and will be able to review all logs up until the timeout occurred.

There are other limits that apply to all workflows on Pipedream — see our [Limits docs](https://docs.pipedream.com/limits/#workflows) for more information.

<Footer />
