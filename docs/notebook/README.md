# How Notebooks Work

You author Pipedream pipelines as **notebooks**. Notebooks include cells, which you can add, edit and remove interactively, sending new data to your pipeline with each change and viewing the associated observability for simple debugging.

We use the term notebook and pipeline interchangeably, depending on the context, but there's a small difference in how we define **notebook** and **pipeline**:

- **Notebook** : A notebook is a collection of static cells. It's an app-like interface optimized for editing code and reviewing the observability associated with events.
- **Pipeline** : A pipeline is a running notebook. Once you save a notebook, new events run through the associated pipeline, step by step.

Every notebook begin with a single [source](/notebook/sources/), with optional [text cells](/notebook/text/) above it. [Code cells](/notebook/code/) and [destinations](/notebook/destinations/) cannot precede sources, since they'll have no data to operate on. Once you save and run your notebook as a pipeline, events sent to the source are passed to the remaining cells of the notebook.

Code and destination cells of Pipedream pipelines are executed in the order they appear in the notebook. These cell types can be interleaved — we impose no order besides the "source must come first" rule noted above.

Text cells are just text, and not included in the execution of published pipelines.

Read more about each of the components of a Pipedream notebook below:

- [Sources](/notebook/sources/)
- [Inspector](/notebook/inspector/)
- [`$event`](/notebook/dollar-event/)
- [Code](/notebook/code/)
- [Destinations](/notebook/destinations/)
- [Text](/notebook/text/)
- [SQL](/notebook/sql/)
