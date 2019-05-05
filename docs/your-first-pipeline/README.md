# Your first pipeline

Building your first pipeline is the best way to understand how Pipedream works. Best of all, running pipelines is free!

We'll walk through this basic pipeline below, covering all the core features of Pipedream and linking to docs on more advanced concepts if you want to learn more.

## Sign Up

Before you proceed, make sure you've [signed up for a Pipedream account](/sign-up/). This is completely free.

## Create a new pipeline

Once you sign up, you should land on the **My Pipelines** page, which should be blank. Let's fix that by creating your first pipeline! Click on the **New Pipeline** button near the top-right of this page:

<div>
<img alt="New pipeline" width="198" src="./images/new-pipeline.png">
</div>

This should create a new pipeline. Let's start building!

## Pipeline metadata

Let's start at the top and work our way down. You'll notice the pipeline was created with an empty title and description:

<div>
<img alt="Empty title and description" src="./images/empty-title-description.png">
</div>

Every pipeline deserves a good title and description. Let's add them. Click into each text box to edit these fields:

<div>
<img alt="Added title and description" src="./images/new-title-description.png">
</div>

We require you save any changes to your pipeline for them to take effect, and display a big green **Save** button in the footer letting you know you've made changes that require saving:

<div>
<img alt="Save pipeline" src="./images/save.png">
</div>

Note that as soon as you save this title change, the URL of the pipeline changes to reflect that. In this example, my new URL looks like:

https://tidewater.pipedream.com/@my-awesome-username/**my-first-pipeline**-p_EZJC7q

You'll also see that:

- The pipeline version increments each time you save.
- We make it clear that this pipeline is **public** and **active**.
- You can see the last time this pipeline was updated.

## Sources

Every pipeline needs data to operate on. Sources are the interface we give you to send data to a pipeline.

Today, we support **Webhook** sources. Click on the Webhook source button to create a source for this pipeline:

<div>
<img alt="Source" src="./images/source.png">
</div>

You'll immediately see a new HTTPS URL generated for your webhook source:

<div>
<img alt="Source" src="./images/new-pipeline-url.png">
</div>

Your URL will look slightly different than the one above. Our source URLs are of the format:

```
https://en[RANDOM STRING].m.pipedream.net
```

It's important to stress what just happened. **With one click, you created an HTTPS URL you can immediately start sending data to**. It can take days to set this up on your own, but we've made it easy. We also automatically save your pipeline when you add a source.

You can send any HTTP requests to this source URL. If you're not familiar with the basics of HTTP, we've provided a [helpful starter guide](https://requestbin.com/blog/working-with-webhooks/#http). Below, we use the term "request" and "event" interchangeably. A single HTTP request sent to a source generates an event you can read and modify in your pipeline. We'll discuss this in detail below.

You can [learn more about sources here](/notebook/sources/).

## The Inspector

**Copy your source URL and visit [http://www.hurlit.com/](http://www.hurlit.com/)**. You can use Hurl.it to send HTTP requests directly from your brower. Add the source URL as the **Destination**, changing the HTTP method from `GET` to `POST`. Then add some [JSON](https://requestbin.com/blog/working-with-webhooks/#json) in the **Body**, like `{"name": "Luke Skywalker"}`:

<div>
<img alt="hurlit.com test request" src="./images/hurlit.png">
</div>

Click **Launch Request**. If everything worked, you should see a `200 OK` response from Pipedream, which Hurl.it displays below the form.

Keep [http://www.hurlit.com/](http://www.hurlit.com/) open — we'll come back here to send more test requests to our pipeline.

Come back to your pipeline. You should see your first HTTP requests in the **Inspector**, directly below the source URL:

<div>
<img alt="First pipeline request" src="./images/first-pipeline-request.png">
</div>

The Inspector displays the last {{$site.themeConfig.INSPECTOR_EVENT_LIMIT}} events you sent to your source. In addition to the HTTP method, the URL path, and the time the event was received, we show the full body and Pipedream-added metadata, which you can view by clicking on the event in the inspector:

<div>
<img alt="Example $event" src="./images/example-event.png">
</div>

Let's review what's contained in this event.

[Learn more about the Inspector here](/notebook/dollar-event/).

### `$event`

You may have noticed the term `$event` above your data in the screenshot above. `$event` is the term we use to refer to an event in the context of a Pipedream pipeline. When you read or modify an event sent to your source using JavaScript, you'll be referencing an object called `$event`. We'll discuss this in depth below.

You may have noticed `$event` contains the JSON body you sent in the `body` key:

<div>
<img alt="Body from $event" width="240" src="./images/event-body.png">
</div>

Any HTTP headers sent with the request will appear in the `headers` key:

<div>
<img alt="Event headers" width="238" src="./images/event-headers.png">
</div>

You can expand and collapse nested properties like this by clicking on the `{...}`:

<div>
<img alt="Body from $event" src="./images/event-headers-expanded.png">
</div>

Most of the remaining keys are added by Pipedream. For example, the `inferred_body_type` in our example is JSON. We parsed the body sent in the request and read it as `JSON`, which allows us to format the body in the inspector cleanly. We also provide the full `url` to which you sent the request so you can parse out the path and query string parameters, if relevant for your pipeline.

[Learn more about `$event` here](/notebook/dollar-event/).

## Code

When you send new events to your pipeline, you'll typically want to do modify it in some way. **Code cells let you do that**. Code cells are optional, but core to Pipedream, so we'd like to walk you through your first code cell so you understand how they work.

You add a code step by clicking the **+** button below the Inspector:

Each of these steps compose your pipeline. We call these collection of steps a **notebook**. This interactive notebook was inspired by tools like [Jupyter Notebooks](https://jupyter.org/try) and [RunKit](https://runkit.com/home).

Today, Pipedream supports JavaScript code, specifically [Node.js v8.10](https://nodejs.org/docs/v0.8.10/). When you send a new event to your pipeline source, the code cells are run in the order they appear in the notebook.

[Learn more about code cells here](/notebook/code/).

## Destinations

[Learn more about destinations here](/notebook/destinations/).

## SQL

[Learn more about the SQL destination here](/notebook/sql/).

## Text

[Learn more about text cells here](/notebook/text/).
