# Zoom

Pipedream allows you to connect to the Zoom API from any workflow, programmatically creating meetings, listing webinar participants, and more.

## Connecting to Zoom from Pipedream

1. First, sign up for Pipedream at [https://pipedream.com](https://pipedream.com).
2. [Create a new workflow](https://pipedream.com/new).
3. Select a [trigger](/workflows/steps/triggers/) for your workflow (for example, HTTP or Cron).
4. [Add a new step](/workflows/steps/), search for "Zoom", and either "Run Node.js code with Zoom" or select one of the pre-built actions for performing common API operations.
5. Once you've added the step, press the **Connect Account** button near the bottom. If this is your first time authorizing Pipedream's access to your Zoom account, you'll be prompted to accept that access, and Pipedream will store the authorization grant to enable the workflow to access the Zoom API. If you've already linked a Zoom account via Pipedream, pressing **Connect Account** will list any existing accounts you've linked.

## Removing Pipedream's access to your Zoom account

You can revoke Pipedream's access to your Zoom account by visiting your [list of installed apps in Zoom](https://marketplace.zoom.us/user/installed).

As soon as you do, any Pipedream workflows that connect to Zoom will immediately fail to work.

You can delete any Zoom connected accounts in [your list of Pipedream Apps](https://pipedream.com/apps), as well.

## Usage

Please see the section on [Connecting to Zoom from Pipedream](#connecting-to-zoom-from-pipedream) to create a Pipedream workflow that connects to the Zoom API.

Pipedream's Zoom app requests all [Zoom user-managed App Scopes](https://marketplace.zoom.us/docs/guides/authorization/permissions#user-managed-scopes).

<Footer />
