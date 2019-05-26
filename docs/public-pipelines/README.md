---
prev: false
next: false
---

# Public Notebooks, Private Data

**The notebooks you create, and the cells within them, are public. The data you send to a pipeline, or logs you generate, are private**.

As soon as you create and save a pipeline, that code is publicly viewable on the internet. We believe everyone should benefit from others' pipelines so they can solve the same problems without having to recreate that same pipeline from scratch. In turn, [we'll run your pipelines for free](/pricing/), within the [limits for the free tier](/limits/).

Because your code is public, **it's critical you do not save sensitive data — for example, API keys — in notebook cells**. You should save those values in [environment variables](/environment-variables/), and reference the value of that variable in your notebook, instead.

When making notebooks public, the fact that you're using a given source or destination cell is also public, **but the specific properties or [parameters](/notebook/destinations/#destination-parameters) of those cells are kept private**. For example, if you're using a Webhook source and sending data to S3 and SQL destinations, those cells will be public. But we won't reveal the specific HTTP URL associated with your Webhook source. And we won't reveal the name of the S3 bucket to which you're sending data.
