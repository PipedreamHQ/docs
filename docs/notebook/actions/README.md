# Actions

Actions are reusable [code](/notebook/code/) steps that integrate your apps, data and APIs. For example, you can send HTTP requests to an external service using the [HTTP action](/notebook/destinations/http/), Slack, [Amazon S3](/notebook/destinations/s3/), and more.

Typically, integrating with these services requires a lot of code to manage connection logic, error handling, etc. Actions handle that for you. You only need to specify the parameters required for the Action — for example, for the [HTTP action](/notebook/destinations/http/), what data you want to send and the URL you want to send it to.

## Using Actions

- Actions are executed in the order they appear in your workflow.

- You can use, `event`, `steps` and `process.env` to reference dynamic data when configuring an action.

- Action return values and exports may be referenced in later steps via the `steps` object.

- You can add multiple Actions within a single workflow (for example to send data to multiple S3 buckets _and_ an HTTP endpoint. Actions can be added at any step of your workflow).

## Adding a new Action

Let's use the [Webhook Action](/notebook/destinations/http/) to send an HTTP request from a workflow. First, **add a new Action to your workflow by clicking on the + button between any two steps**.

Choose the **Webhook** action and add the **URL** and **Payload**.

This action defaults to sending an HTTP `POST` request with the desired payload to the specified URL. If you'd like to change the HTTP method, add Basic auth, query string parameters or headers, you can click the sections below the Payload field.

<Footer />
