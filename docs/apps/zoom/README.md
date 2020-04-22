# Zoom

Pipedream allows you to connect to the Zoom API from any workflow, programmatically creating meetings, listing webinar participants, and more.

## Zoom vs. Zoom Admin app

Zoom users can be classified into two groups: admins and non-admins. Pipedream exposes two apps — **Zoom** and **Zoom Admin** — to serve both groups.

Non-admins have [permissions](https://marketplace.zoom.us/docs/guides/authorization/permissions#user-managed-scopes) to manage standard Zoom resources in their account: meetings, webinars, recordings, and more. **If you're a non-admin, you'll want to use the Zoom app**.

Zoom admins have [permissions](https://marketplace.zoom.us/docs/guides/authorization/permissions#account-level-scopes) to manage account-level resources, like users and reports. They can also manage webinars and meetings across their organization. **If you're an admin and need to manage these resources via API, you'll want to use the Zoom Admin app**.

The [Zoom API docs on permissions](https://marketplace.zoom.us/docs/guides/authorization/permissions) provide detailed information on these permissions and their associated OAuth scopes.

## Connecting to Zoom from Pipedream

1. First, sign up for Pipedream at [https://pipedream.com](https://pipedream.com).
2. [Create a new workflow](https://pipedream.com/new).
3. Select a [trigger](/workflows/steps/triggers/) for your workflow (for example, HTTP or Cron).
4. [Add a new step](/workflows/steps/), search for "Zoom" or "Zoom Admin" ([see the differences above](#zoom-vs-zoom-admin-app))
5. Once you've selected the app, you can choose to either "Run Node.js code" or select one of the pre-built actions for performing common API operations.
6. Once you've added the step, press the **Connect Account** button near the top. If this is your first time authorizing Pipedream's access to your Zoom account, you'll be prompted to accept that access, and Pipedream will store the authorization grant to enable the workflow to access the Zoom API. If you've already linked a Zoom account via Pipedream, pressing **Connect Account** will list any existing accounts you've linked.

## Removing Pipedream's access to your Zoom account

You can revoke Pipedream's access to your Zoom account by visiting your [list of installed apps in Zoom](https://marketplace.zoom.us/user/installed).

As soon as you do, any Pipedream workflows that connect to Zoom will immediately fail to work.

You can delete any Zoom connected accounts in [your list of Pipedream Apps](https://pipedream.com/apps), as well.

## Usage

Please see the section on [Connecting to Zoom from Pipedream](#connecting-to-zoom-from-pipedream) to create a Pipedream workflow that connects to the Zoom API.

Pipedream's Zoom app requests all [Zoom user-managed App Scopes](https://marketplace.zoom.us/docs/guides/authorization/permissions#user-managed-scopes).

Pipedream's Zoom Admin app requests all [Zoom account-level App Scopes](https://marketplace.zoom.us/docs/guides/authorization/permissions#account-level-scopes).

<Footer />
