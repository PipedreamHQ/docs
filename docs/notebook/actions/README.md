# Actions

Actions facilitate integration with third party apps and [Destinations](/notebook/destinations/) — for example, you can send HTTP requests to an external service using the [HTTP action](/notebook/destinations/http/), Slack, [Amazon S3](/notebook/destinations/s3/), and more.

Typically, integrating with these services requires a lot of code to manage connection logic, error handling, etc. Actions handle that for you. You only need to specify the parameters required for the Action — for example, for the [HTTP action](/notebook/destinations/http/), what data you want to send and the URL you want to send it to.

You can add multiple Actions within a single workflow, for example to send data to multiple S3 buckets _and_ an HTTP endpoint. Actions can be added at any step of your workflow.

<Footer />
