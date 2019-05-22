# How Notebooks Work

You author Pipedream pipelines as **notebooks**. Notebooks include cells, which you can add, edit and remove interactively, sending new data to your pipeline with each change and viewing the associated observability for simple debugging. We'll talk about what cells are and how you use them below.

[[toc]]

## Notebook vs. Pipeline

We use the term notebook and pipeline interchangeably, depending on the context, but there's a core difference in how we define **notebook** and **pipeline**:

- **Notebook** : A notebook is a collection of static cells. It's an app-like interface optimized for editing code and reviewing the data, logs, and other information associated with events.
- **Pipeline** : A pipeline is a running notebook. Once you save a notebook, new events run the code in the associated pipeline, step by step.

## Creating a new notebook, editing Title and Description

When you create a notebook, you can edit the **Title** and **Description** near the top. We also present some helpful information — the pipeline's author, the current version, and visibility state of the code and data, and when the pipeline was last updated:

<div>
<img alt="Pipeline title and description" src="./images/pipeline.png">
</div>

## Notebooks are public, your data is private

**All notebook code is public. The data you send to a pipeline, or logs you generate, are private**.

This means that when you create and save a pipeline, that code is publicly viewable on the internet. **But when you run your pipeline and send real data to it, no one else can view that data**.

## Using other notebooks

We hope that the notebooks you write are helpful for many other people. If you've written a notebook to send all Stripe transaction data to a Redshift data warehouse, someone else will probably want to use your notebook to solve that same use case.

If you've used [Github](https://github.com/), you can think of the notebook as similar to a unique, public repository. It's code that anyone can view and fork for their own use.

On Pipedream, anyone can find a public notebook, fork it, and run it, modifying any of the cells within the notebook to make it work for their use case.

## Notebook Cells

### Source

Every notebook begin with a single [**source**](/notebook/sources/). Sources are the interface we give you to send data to a pipeline. For example, you can create a [webhook source](/notebook/sources/#webhook-sources) to accept data from a Stripe webhooks. We give you a URL that you add to your Stripe settings:

<div>
<img alt="New source URL" src="./images/new-pipeline-url.png">
</div>

As soon as Stripe triggers a new event, you'll see it in the notebook.

### Text

You can add optional [**text** cells](/notebook/text/) anywhere in a notebook, allowing you to add comments or descriptions of other steps to help other readers understand your pipeline.

For example, you might want to add a longer description at the top of your pipeline to make it clear what your pipeline does:

<div>
<img alt="Text description" src="./images/text-description.png">
</div>

### Code, Destinations

[**Code** cells](/notebook/code/) and [**destinations**](/notebook/destinations/) cannot precede sources, since they'll have no data to operate on.

Once you save a notebook, we take the code in that notebook and publish it as a pipeline. Each event you send to your source triggers the pipeline code, whether you have the notebook open in your browser, or not.

If you've added a destination cell, we'll process delivery of your payload asynchronously. [Read the destination docs](/notebook/destinations/) to find out more.

## Saving your Notebook and Running your Pipeline

Again, the notebook is just a UI for viewing and editing the code. Saving the notebook publishes that same code as a pipeline that runs independently. When you edit the code in the notebook and save those changes, we publish a new version of that pipeline:

<div>
<img alt="Pipeline version" src="./images/pipeline-version.png">
</div>

All events sent to the source will run against the most recent version of the pipeline.

Code and destination cells of Pipedream pipelines are executed in the order they appear in the notebook. These cell types can be interleaved — we impose no order besides the "source must come first" rule noted above.

Text cells are just text, and not included in the execution of published pipelines.

Read more about each of the components of a Pipedream notebook below:

- [Sources](/notebook/sources/)
- [The Inspector](/notebook/inspector/)
- [`$event`](/notebook/dollar-event/)
- [Code](/notebook/code/)
- [Destinations](/notebook/destinations/)
- [Text](/notebook/text/)
- [SQL](/notebook/sql/)
