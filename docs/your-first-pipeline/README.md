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

https://pipedream.com/@my-awesome-username/**my-first-pipeline**-p_EZJC7q

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

Keep [https://www.hurlit.com/](https://www.hurlit.com/) open — we'll come back here to send more test requests to our pipeline.

Come back to your pipeline. You should see your first HTTP requests in the **Inspector**, directly below the source URL:

<div>
<img alt="First pipeline request" src="./images/first-pipeline-request.png">
</div>

The Inspector displays the last {{$site.themeConfig.INSPECTOR_EVENT_LIMIT}} events you sent to your source. In addition to the HTTP method, the URL path, and the time the event was received, we show the full body and Pipedream-added metadata, which you can view by clicking on the event in the inspector:

<div>
<img alt="Example $event" src="./images/example-event.png">
</div>

Let's review what's contained in this event.

[Learn more about the Inspector here](/notebook/inspector/).

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

When you send new events to your pipeline, you'll typically want to do modify it in some way. **Code cells let you do that**. Code is optional, but core to Pipedream, so we'd like to walk you through your first code cell so you understand how they work.

You add a code cell by clicking the **+** button below the Inspector:

<div>
<img alt="New step" width="169" src="./images/new-step.png">
</div>

In addition to Code cells, we support **Text**, **Destinations**, and **Secrets**. We'll discuss each below.

These cells compose your pipeline. The term "cell" comes from **notebooks**, an interactive programming model that facilitates development. Our notebook was inspired by tools like [Jupyter Notebook](https://jupyter.org/try) and [RunKit](https://runkit.com/home). When you send a new event to your source, the cells are run in the order they appear in the notebook.

For now, add a new **Code** cell. You should see that cell appear, blank, below the inspector:

<div>
<img alt="New code cell" src="./images/new-code-cell.png">
</div>

Today, Pipedream supports JavaScript, specifically [Node.js v8.10](https://nodejs.org/docs/v0.8.10/). Add this bit of code to your code cell:

```javascript
console.log($event.body);
```

`console.log()` logs what you pass to it. Within a code cell, `$event` is a [Javascript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects), so you can reference properties within `$event` using "dot-notation". `$event.body` lets you reference the body you sent in the original HTTP request. That's what we want to log.

Save your pipeline, and send another test request with [Hurl.it](https://www.hurlit.com/), like we did above.

You should see the new event appear in the Inspector. Click on that event, and scroll to the bottom of the pipeline. You should see something like the following:

<div>
<img alt="console.log test output" src="./images/console-log-test.png">
</div>

Below the code, you'll see two sections of "observability": debugging information that we provide to help you see how your code modifies data as it moves through the pipeline. First, we show both the **Diff** and **Full** `$event` after the associated code cell runs. In our case, we didn't modify `$event`, so there's no diff.

We did use `console.log` to log some data, and we can see the value of `$event.body` included below (in our example, `{"name": "Luke Skywalker"}`).

Let's see how the **Diff** works. In the same code cell, change your code to:

```javascript
$event.body.title = "Jedi";
```

This adds a new property to the `$event.body` object — a title.

Save your pipeline and send the same event using Hurl.it, then click on that event in the Inspector and scroll to your code cell:

<div>
<img alt="New $event key" src="./images/event-new-key.png">
</div>

The **Diff** shows the new property in green, indicating it's an added property. Removing a property would display the deleted key in red.

Finally, let's use some code from [`npm`](https://www.npmjs.com/), the community-developed repository of over 400,000 packages developed to solve a specific problem.

Change your code to:

```javascript
const _ = require("lodash");
$event.body.mean = _.mean($event.body.numbers);
```

and save your pipeline. [Lodash](https://lodash.com/) is a library of utility functions that make it easy to manipulate data. In this case, we're using the [mean function](https://lodash.com/docs/4.17.11#mean) to calculate the average value of a new field called `numbers`, an array we'll pass in the body of `$event`.

To use the [`lodash`](https://www.npmjs.com/package/lodash) package, we just have to `require("lodash")`. Pipedream downloads and installs the package for use in your pipeline.

Back in Hurl.it, we'll send another request with a body of `{"numbers": [1, 2, 3, 4]}`. Click on that request in the Inspector to see the new, `mean` field we added:

<div>
<img alt="Lodash mean calculation in code cell" src="./images/lodash-mean.png">
</div>

[Learn more about code cells here](/notebook/code/).

## Destinations

After you ingest and transform the data sent to your pipeline, you'll probably want to store it somewhere. **Destinations make this simple**.

Pipedream supports a handful of destinations today:

- **Webhook** : send data to another HTTP URL — a web service you own, another app, and more.
- **Amazon S3** : [S3](https://aws.amazon.com/s3/) is a service Amazon provides for storing large amounts of data on AWS cheaply. If you operate AWS services, it's common to store data in S3 for future processing.
- **SQL** : Pipedream's data warehouse. SQL destinations let you quickly query data you send to a pipeline with SQL, which can be helpful for debugging or quick analyses.

To demonstrate how destinations work, we'll create a mock HTTP endpoint using [RequestBin](https://requestbin.com/), another service Pipedream operates. Similar to the Source and Inspector functionality above, RequestBin generates a URL you can send any HTTP requests to, and logs the request details for further inspection.

Visit [RequestBin](https://requestbin.com/) and click **Create a Request Bin**:

<div>
<img alt="Create a Request Bin button" width="251" src="./images/create-rb.png">
</div>

and copy the URL RequestBin generates:

<div>
<img alt="New Request Bin URL" src="./images/rb-url.png">
</div>

::: warning
The request bin we created above is public to anyone with the link. In this example, we're sending test data. If you want to use RequestBin for private data, you can [create a private bin](https://requestbin.com/docs/#public-vs-private-endpoints) by signing up for a RequestBin account.
:::

Back in your pipeline, click the **+** button under your code cell and add a new **Destination**:

<div>
<img alt="New step" width="169" src="./images/new-step.png">
</div>

Select the **Webhook** destination:

<div>
<img alt="Destination choices" src="./images/new-destination.png">
</div>

To send data to a Webhook destination, you only need to tell Pipedream two things:

- Where you're sending data
- What data you want to send

Enter the RequestBin URL from above in the **Endpoint (URL)** text box, and add `$event.body` to the **Payload** section:

<div>
<img alt="Webhook destination filled out" src="./images/destination-details.png">
</div>

The payload tells Pipedream what to send to the destination. You can send the full `$event`, `$event.body` or any other property of `$event`, and even the result of a [JavaScript expression](/notebook/destinations/#payload-expressions).

As always, save your pipeline, then go back to Hurl.it and send the same test event we sent in the last **Code** step above, with a body of `{"numbers": [1, 2, 3, 4]}`.

Back in the Inspector, you'll see the new event and may notice something different. Before, we had no destinations attached to our pipeline, so the **Destinations** column showed `0/0` on every row. This event should show `1/1`:

<div>
<img alt="1/1 destinations in Inspector" src="./images/inspector-destinations.png">
</div>

This means that you've included one destination in you pipeline (the denominator), and we successfully sent this event to that destination (the numerator).

Click on the event in the Inspector and scroll to the destination cell you added. You'll see two tabs below: the data we **Sent**:

<div>
<img alt="Sent to Destination" width="311" src="./images/sent-to-destination.png">
</div>

and the **Response** the destination endpoint (RequestBin) returned:

<div>
<img alt="Response from Destination" width="245" src="./images/response-from-destination.png">
</div>

Back in RequestBin, you should also see the data sent.

[Learn more about destinations here](/notebook/destinations/).

## SQL

Like with the rest of pipeline development, we believe it should be as simple as possible to analyze the data you're processing through a pipeline. SQL provides a common way to ask arbitrary questions about your data, so we've developed a simple data warehouse service you can use as a destination.

Data sent to a SQL destination can be queried within minutes, **without any extra work to define the schema of the data you're sending, or setting up a database**. Send data to a SQL destination, run SQL on that data. It's that simple.

Add a new **Destination** cell to your notebook by pressing the **+** button at the bottom of your notebook again, and choose the **SQL** destination.

With a SQL destination, you tell us the **Table** where you want to save data, and the **Payload** you want to send:

<div>
<img alt="SQL destination details" src="./images/sql-destination-details.png">
</div>

This time, we'll send the full `$event` in the payload so we have access to all request metadata for analysis.

Save your pipeline, then send another couple of events from Hurl.it with the `numbers` key in the body. Feel free to add any additional data you want.

We batch events together before sending them to SQL destinations, so it'll take roughly a minute for them to appear for querying. You can check on the status of these requests, like any other destination, in the Inspector.

Near the top of your pipeline, click on the **SQL** tab to start querying:

<div>
<img alt="SQL tab" src="./images/sql-tab.png">
</div>

You can run

```sql
SHOW TABLES
```

to list the tables you have access to, or

```sql
SELECT * FROM your_table
```

to see all the data, with all the fields. You can run any SQL supported by [Presto 0.172](https://prestodb.github.io/docs/0.172/functions.html).

[Learn more about the SQL destination here](/notebook/sql/).

## Text

**Text** cells let you write text at any point in your pipeline. They're optional, but can convey important information to readers. This may include a future you who's coming back to a pipeline months later, when you've forgotten how it works.

Many people like to use text cells at the top of a pipeline, above the source, to provide a detailed description of how it works.

Text cells support Markdown, a rich but simple language for formatting text. If you don't know Markdown, start with [this cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

You can create a Text cell using the standard **+** button below any cell.

[Learn more about text cells here](/notebook/text/).

## Secrets

**Secrets** are not yet supported on this version of the platform.

## Where to go from here

You should start building your own pipelines to see what you can accomplish. As you build, you should review the detailed docs on each part of Pipedream pipelines to understand how you can use the platform for more advanced use cases:

- [Sources](/notebook/sources/)
- [Inspector](/notebook/inspector/)
- [`$event`](/notebook/dollar-event/)
- [Code](/notebook/code/)
- [Destinations](/notebook/destinations/)
- [Text](/notebook/text/)
- [SQL](/notebook/sql/)

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
