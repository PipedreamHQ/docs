# `$context`

`$context` — "dollar context" — is a variable that contains details about the current execution of a workflow, for instance the time the workflow was executed, its `workflow_id`, and more.

Like `$event`, `$context` is a JavaScript object, so you can access it's properties via dot-notation (e.g. `$context.ts`). It can also be accessed globally in any Action or Code step within a workflow.

Unlike `$event`, `$context` is read-only. Attempting to mutate `$context` will not throw an error, but it will have no effect.

## Contents of `$context`

`$context` contains the following properties:

- `id`: a unique identifier tied to the current execution.
- `ts`: the timestamp the execution began, represented in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601)
- `pipeline_id`: the unique identifier of the current workflow.
- `deployment_id` : every workflow version creates a new "deployment" of your workflow. The `deployment_id` is a unique identifier that represents the version of the workflow tied to the current execution.
- `platform_version`: an integer tied to the current structure of `$context`. If the structure of `$context` changes in the future, this integer will increment and changes to the structure will be communicated in our docs. The current `platform_version` is **2**.
- `source_type`: a string that represents the source of the event that triggered this execution.
- `verified`: a Boolean value representing whether the request to the Pipedream API to trigger this execution was properly signed. This will be `false` for all HTTP requests that hit Webhook sources directly, without an API key, since those do not utilize the API.
