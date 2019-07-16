# Actions

Actions facilitate integration with third party apps and [Destinations](/notebook/destinations/) — for example, you can send HTTP requests to an external service using the [HTTP action](/notebook/destinations/http/), Slack, [Amazon S3](/notebook/destinations/s3/), and more.

Typically, integrating with these services requires a lot of code to manage connection logic, error handling, etc. Actions handle that for you. You only need to specify the parameters required for the Action — for example, for the [HTTP action](/notebook/destinations/http/), what data you want to send and the URL you want to send it to.

You can add multiple Actions within a single workflow, for example to send data to multiple S3 buckets _and_ an HTTP endpoint. Actions can be added at any step of your workflow.

[[toc]]

## Adding a new Action

Let's use the [Webhook Action](/notebook/destinations/http/) to send an HTTP request from a workflow. First, add a new Action to your workflow:

<div>
<img alt="Add new action" width="500" src="./images/new-action.png">
</div>

Choose the **Webhook** action:

<div>
<img alt="Webhook action" width="300" src="./images/webhook-action.png">
</div>

and add the **URL** and **Payload**. Here, we add a [RequestBin](https://requestbin.com) URL send the original source payload — `$event.body` — to this URL:

<div>
<img alt="Webhook action URL and Payload" src="./images/webhook-action-params.png">
</div>

This action defaults to sending an HTTP `POST` request with the desired payload to the specified URL. If you'd like to change the HTTP method, add Basic auth, query string parameters or headers, you can click the sections below the Payload field.

<Footer />
