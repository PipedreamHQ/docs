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
- [Run any Node.js (JavaScript) code, using almost any npm package](https://pipedream.com/@dylburger/email-the-top-story-from-hacker-news-every-day-p_JZC28O/readme). **This lets you do almost anything you want on a schedule**.

Pipedream manages the servers where these cron jobs run, so you don't have to worry about setting up a server of your own or operating some service just to run code on a schedule. You write the workflow, we take care of the rest.

[[toc]]

## Choosing a cron trigger

To create a cron job, create a new workflow and search for the **Cron Scheduler** source:

<div>
<img alt="Cron Scheduler source" width="400" src="./images/cron-scheduler-source.png">
</div>

By default, your cron job will be turned **Off**. **To enable it, select either of the scheduling options**:

- **Simple** : run the job every N days, hours, minutes (e.g. every 1 day, every 3 hours).
- **Cron expression** : schedule your job using a cron expression. For example, the expression `0 0 * * *` will run the job every day at midnight. Cron expressions can be tied to any timezone.

## Testing a cron job

If you're running a cron job once a day, you probably don't want to wait until the next day's run to test your new code. You can manually run the workflow associated with a cron job at any time by pressing the **Send Test Event** button.

## Future executions of your cron job

You'll see the time your job is scheduled to run next under the **Next Job** section of the [Inspector](/notebook/inspector).

## Job History

You'll see the history of job executions under the **Job History** section of the [Inspector](/notebook/inspector).

Clicking on a specific job shows the execution details for that job — all the logs and observability associated with that run of the workflow.

## Trigger a notification to an external service (email, Slack, etc.)

You can send yourself a notification — for example, an email or a Slack message — at any point in a workflow by using the relevant [Action](/notebook/actions/) or [Destination](/notebook/destinations/).

If you'd like to email yourself when a job finishes successfully, you can use the [Email Destination](/notebook/destinations/email/). You can send yourself a Slack message using the Slack Action, or trigger an [HTTP request](/notebook/destinations/http/) to an external service.

You can also [write code](/notebook/code/) to trigger any complex notification logic you'd like.

## Rate Limit

When you're testing cron jobs, you may encounter **Rate Limit Exceeded** errors. Cron jobs can be tested no more than twice a minute. If you encounter this error, wait one minute and try again.

## Troubleshooting your cron jobs

When you run a cron job, you may need to troubleshoot errors or other execution issues. Pipedream offers built-in, step-level logs that show you detailed execution information that should aid troubleshooting.

Any time a cron job runs, you'll see a new execution appear in the [Inspector](/notebook/inspector/). This shows you when the cron job ran, how long it took to run, and any errors that might have occurred. **Click on any of these lines in the Inspector to view the details for a given run**.

Code steps show [Logs](/notebook/code/#logs) below the step itself. Any time you run `console.log()` or other functions that print output, you should see the logs appear directly below the step where the code ran:

<div>
<img alt="console.log and error messages" width="500" src="../notebook/code/images/console-log-error.png">
</div>

[Actions](/notebook/actions/) and [Destinations](/notebook/destinations/) also show execution details relevant to the specific Action or Destination. For example, when you use the [HTTP Destination](/notebook/destinations/http/) to make an HTTP request, you'll see the HTTP request and response details tied to that Destination step:

<div>
<img alt="HTTP request and response" src="../notebook/destinations/http/images/http-request-response.png">
</div>

## `$event`

Pipedream exposes the event data tied to your workflow's trigger in a global variable called [`$event`](/notebook/dollar-event/). For cron jobs, the "event" is a time-based trigger, so `$event` contains the following:

- The timer configuration (the simple schedule, or cron expression), stored in the `timer_config` property.
- The time this cron job ran, in the `time` property.

You can access these properties in any Action or Code step using `$event.timer_config` and `$event.time`, respectively.

We display the full `$event` object for each execution of your cron job just below the Cron Scheduler source configuration. This will be displayed when you click on a specific execution in the Inspector:

<div>
<img alt="$event shape for cron jobs" width="400" src="./images/cron-dollar-event.png">
</div>

## Limitations

Cron jobs can be run at most once a minute. Any cron expression that specifies a higher frequency will be rejected.

Cron jobs can run for at most 30 seconds. If your workflow takes longer than 30 seconds to execute, you'll see a `TIMEOUT` error for that run, and will be able to review all logs up until the timeout occurred.

When you're testing

There are other limits that apply to all workflows on Pipedream — see our [Limits docs](/limits/#workflows) for more information.

<Footer />
