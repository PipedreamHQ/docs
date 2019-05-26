# Destinations

Destination cells allow you to quickly send the data from your pipeline to destinations outside of Pipedream — for example, [HTTP](/notebook/destinations/http/) and [S3](/notebook/destinations/s3/) — as well as the [Pipedream SQL service](/notebook/sql/), a Pipedream-managed data warehouse.

Typically, sending data to these destinations requires a lot of code to manage error conditions and retries. With destination cells, Pipedream handles that for you. You only need to specify what data gets sent, and where to send it.

You can add multiple Destination cells within a single notebook, for example to send data to multiple S3 buckets. Destinations can be added at any step of your notebook.

**The docs below discuss the features common to all destinations. See the docs on [HTTP](/notebook/destinations/http/), [S3](/notebook/destinations/s3/), and [SQL](/notebook/sql/) for information specific to those destinations.**

[[toc]]

## Adding a new Destination

You can add a new **Destination** cell in one of two ways.

First, you can click on the **+** button under any existing cell, and choose the **Destination** cell type:

<div>
<img alt="Add a new cell" width="275" src="./images/new-cell.png">
</div>

On a new notebook, you'll also see a larger button to quickly add a destination:

<div>
<img alt="New destination button" width="262" src="./images/new-destination.png">
</div>

After selecting the **Destination** cell type, you'll be asked to choose your destination type:

<div>
<img alt="New destination type" src="./images/new-destination-type.png">
</div>

Note that your list of destinations may look different than the screenshot above. We're constantly adding new destinations to help you route data to wherever you'd like. If we don't support your target destination, please [reach out](/support/) so we can discuss it more!

## Destination Delivery

## Destination Parameters

## Payload Expressions

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
