# Workflow Settings

You can control workflow-specific settings in the **Settings** to the left of your workflow:

<div>
<img alt="Workflow settings" width="150" src="./images/workflow-settings.png">
</div>

## Errors

By default, any errors raised in a workflow are sent to the **Global Error Workflow**. This workflow sends you an email with the details of this error, once per error, per workflow, per 24-hour period.

But the Global Error Workflow is just another workflow, and lives in your account. So you can modify it however you'd like. For example, you can send errors to Slack, or send critical issues to Pagerduty, or log all errors to a table in the [SQL service](/destinations/sql/) for later analysis.

## Collaborators

You can add collaborators to your workflow under the **Collaborators** section.

Pipedream sends an email to that user asking them to accept the collaboration request. Once they do, they'll be able to edit the workflow and view its events and execution details.

As a collaborator, you can see workflows that have been shared with you in the **Shared with Me** section of your [list of workflows](https://pipedream.com/workflows):

<div>
<img alt="Workflows Shared with me" width="200" src="./images/shared-with-me.png">
</div>
