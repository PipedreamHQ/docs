---
prev: false
---

# What is Pipedream?

Pipedream is the fastest way to process event data for free.

On Pipedream, you build [workflows](#what-are-workflows) to process events. Workflows are authored using basic building blocks — [sources](/notebook/sources/), [code](/notebook/code/), and pre-built [actions](/notebook/actions/).

You can build, test, and deploy workflows in minutes, and you don't have to manage any of the infrastructure required to run them. We manage that for you. You just focus on how your workflow works.

You have full control over your workflow. In addition to pre-built [actions](/notebook/actions/), you can add [Node.js code](/notebook/code/) — JavaScript — at any step, using virtually any `npm` package you want to perform any programming logic.

We've tried hard to simplify the stuff you shouldn't have to care about — the infrastructure — while giving you full control over your workflow. We hope Pipedream will help you solve problems quickly and effortlessly.

## What are workflows?

A workflow is just a script that operates on an event.

Every workflow has a source, or trigger. You can send an event via HTTP / webhook, or trigger a workflow using a [cron job](/cron/).

Then, you can combine pre-built [actions](/notebook/actions/) or [Node.js code](/notebook/code/) to build anything you'd like.

What can you do with Pipedream? Here are some templates to get you started:

- [Run a cron job to kick off Node.js code or send an HTTP request](https://pipedream.com/@tod/cron-scheduler-workflow-free-p_mkC5B1/readme)
- [Search Twitter for a keyword, post new tweets to Slack](https://pipedream.com/@pravin/search-twitter-and-post-new-tweets-to-slack-p_dDCq9m/readme)
- [Send an HTTP request to trigger an email](https://pipedream.com/@pravin/send-yourself-an-email-on-http-request-p_ZJCqj9/readme)
- [Process an HTTP request, return a response to the client](https://pipedream.com/@pravin/return-a-response-from-your-workflow-p_zACJqp/readme)
- [Fan out requests to multiple webhooks](https://pipedream.com/@pravin/fan-out-requests-to-multiple-webhooks-p_4wOCrW/edit?collapse=collapse)

In other tools, you typically have to setup infrastructure to process events — typically you setup an HTTP endpoint, then run a script on a container, or have to manage a serverless function. This takes time to write and maintain.

Pipedream is purpose-built for running workflows on event data, so we take care of the infrastructure and boilerplate configuration for you. **Pipedream lets you focus on _what_ you want done, and we take care of _how_ to do it for you.**

It takes less than 5 minutes to write your first workflow. [Sign up](/sign-up/) to get started.

<Footer />
