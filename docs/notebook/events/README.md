# What are events?

Events trigger workflow executions. The event that triggers your workflow depends on the trigger you select for your workflow:

- [Webhook triggers](/notebook/sources/#webhook-sources) execute your workflow on HTTP requests.

- [Cron triggers](/cron/) execute your workflow on a time schedule (e.g., on an interval).


<!--
 `$event` contains data from the HTTP request and Pipedream-provided metadata. For example, `$event.body` contains the HTTP payload; `$event.headers` contains the HTTP request headers.


 `$event` contains the schedule of your cron job and the time the current job was triggered.

 **You can save any data in the `$event` object in a code or an action. This allows you to share data across the steps of your workflow.** [Just save the data as a new property of `$event`](https://docs.pipedream.com/notebook/dollar-event/#modifying-event), or change the value of an existing property, referencing it in a later step.

`$event` is a global variable. You can access or mutate it in any [code](/notebook/code/) or [action](/notebook/actions/) steps of your workflow.

[[toc]]

-->

## Trigger events

When you send an event to your workflow, we take the source data — for example, the HTTP payload, headers, etc. — and add our own Pipedream metadata to it. That collection of data is exposed as a JavaScript object named `event` you can use in the rest of your workflow.

When you click on a given event in the Inspector, we show you the contents the associated `event` variable:

You can reference `event` in any [code](/notebook/code/) step, or reference it in [actions](/notebook/actions/). See those docs or the general [docs on passing data between steps](/notebook/) for more information.

## Event observability

Pipedream provides observability for the event that triggered your workflow, including into the trigger event and step-level workflow execution — just select an event from the inspector.


<Footer />
