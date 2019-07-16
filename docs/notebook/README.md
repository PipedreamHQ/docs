# How Workflows Work

Workflows are composed of steps, which you can add, edit and remove interactively, sending new data to your workflow with each change and viewing the associated observability for simple debugging. We'll talk about types of steps you can add and how you use them below.

[[toc]]

## Editing Title and Description

When you create a workflow, you can edit the **Title** and **Description** near the top. We also present some helpful information — the workflow's author, the current version, and visibility state of the code and data, and when the workflow was last updated:

<div>
<img alt="Pipeline title and description" src="./images/pipeline.png">
</div>

## Workflows are public, your data is private

**All workflow steps are public. The data you send to a workflow, or logs you generate, are private**.

Please see our [docs on public workflows](/public-workflows/) for more information.

## Forking public workflows

We hope that the workflows you write are helpful for many other people. If you've written a workflow to send all Stripe transaction data to a Redshift data warehouse, someone else will probably want to use your workflow to solve that same use case.

If you've used [Github](https://github.com/), you can think of the workflow as a unique, public repository. It's code that anyone can view and fork for their own use.

On Pipedream, anyone can find a public workflow, [fork it](/notebook/fork/), and run it, modifying any of the steps within the workflow to make it work for their use case.

## Workflow steps

### Source

Every workflow begin with a single [**source**](/notebook/sources/). Sources are the interface we give you to send data to a pipeline. For example, you can create a [webhook source](/notebook/sources/#webhook-sources) to accept data from a Stripe webhooks. We give you a URL that you add to your Stripe settings:

<div>
<img alt="New source URL" src="./images/new-pipeline-url.png">
</div>

As soon as Stripe triggers a new event, you'll see it in the workflow.

### Code, Actions

[**Code** steps](/notebook/code/) and [**actions**](/notebook/destinations/) cannot precede sources, since they'll have no data to operate on.

Once you save a workflow, we publish it. Each event you send to your source triggers the workflow code, whether you have the workflow open in your browser, or not.

## Saving and Running your Workflow

When you edit the code in the workflow and save those changes, we publish a new version:

<div>
<img alt="Workflow version" src="./images/pipeline-version.png">
</div>

All events sent to the source will run against the most recent version of the workflow.

Code and action steps of Pipedream workflows are executed in the order they appear. These steps can be interleaved — we impose no order besides the "source must come first" rule noted above.

Read more about each of the components of a Pipedream workflow below:

- [Sources](/notebook/sources/)
- [The Inspector](/notebook/inspector/)
- [`$event`](/notebook/dollar-event/)
- [Code](/notebook/code/)
- [Destinations](/notebook/destinations/)
- [SQL](/notebook/sql/)

<Footer />
