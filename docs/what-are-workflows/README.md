---
prev: false
---

# What are workflows?

Workflows make it easy to integrate your apps, data, and APIs — all with no servers or infrastructure to manage!

- Workflows are composed of code that is organized and executed as a sequence of linear [**steps**](/notebook/).

- Trigger your workflow on any event (e.g., [HTTP requests](/notebook/sources/#webhook-sources) or a [schedule](/cron/)).

- Add steps to run Node.js [code](/notebook/code/) (using virtually any [`npm`](/notebook/code/#using-npm-packages) package) and [pre-built actions](/notebook/actions/).

- Steps are executed in the order they appear in your workflow.

- Export values for each step and access them via the `steps` object.

Workflow code is [public](/public-workflows/) so the community can discover and fork it. Your workflow execution and event data is **private**.

<!--
### Why build your workflows on Pipedream?

#### No servers or infrastructure to manage
In other tools, you typically have to setup infrastructure to process events — typically you setup an HTTP endpoint, then run a script on a container, or have to manage a serverless function. This takes time to write and maintain.

Pipedream is purpose-built for running workflows on event data, so we take care of the infrastructure and boilerplate configuration for you. **Pipedream lets you focus on _what_ you want done, and we take care of _how_ to do it for you.**

#### Run any Node code
Write Node.js [code](/notebook/code/) and require `npm` packages. event contains your trigger event data. Exported step data, along with standard output, appears under each code step for inline observability.

#### Iterate quickly with inline observability, automatic versioning and instant deploys
See events and debug execution details in real time. Output, errors, timing, and return values appear below each step. Time travel to previous versions of code, at the time the event occurred.

#### Connect to APIs without writing any code
[Actions](/notebook/actions/) are pre-defined code steps built by the Pipedream community. Send a message to Slack or Discord, store data in S3 or Snowflake, and more, all without writing any code.

#### Auth made easy
Auth apps once, connect to those apps in any workflow. Pipedream supports OAuth and key-based auth, and handles the OAuth flow and token refresh for you. Just link accounts to steps and reference the relevant auth info in code.

#### It's free!
We believe anyone should be able to run simple, low-volume workflows at [no cost](/pricing/), sharing their workflows with the public so everyone benefits from the work of others. We also want to foster a positive community where people feel good about sharing their work and where everyone can learn from one another.

-->

<!--
## What can you do with Pipedream?

Here are some templates to get you started:

- [Run a cron job to kick off Node.js code or send an HTTP request](https://pipedream.com/@tod/cron-scheduler-workflow-free-p_mkC5B1/readme)
- [Search Twitter for a keyword, post new tweets to Slack](https://pipedream.com/@pravin/search-twitter-and-post-new-tweets-to-slack-p_dDCq9m/readme)
- [Send an HTTP request to trigger an email](https://pipedream.com/@pravin/send-yourself-an-email-on-http-request-p_ZJCqj9/readme)
- [Process an HTTP request, return a response to the client](https://pipedream.com/@pravin/return-a-response-from-your-workflow-p_zACJqp/readme)
- [Fan out requests to multiple webhooks](https://pipedream.com/@pravin/fan-out-requests-to-multiple-webhooks-p_4wOCrW/edit?collapse=collapse)
-->


### Get started

It takes less than 5 minutes to write your first workflow. [Sign in](/sign-up/) to get started.

<Footer />
