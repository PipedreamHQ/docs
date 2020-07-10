# Zoom

Pipedream provides a serverless programming platform for building event-driven [workflows](/workflows/) that integrate apps. Pipedream comes with [pre-built actions](/workflows/steps/actions/) for interacting with the Zoom API, and allows you to listen for Zoom events in your account and trigger code when they happen.

Pipedream is fully programmable - you can write [any Node.js code](/workflows/steps/code/) to control your workflows - but also fully-managed: Pipedream runs your code, so you don't have to manage any infrastructure and can focus on your workflow's logic.

[[toc]]

## Overview

**Pipedream [workflows](/workflows/) allow you to run any Node.js code that connects to the Zoom API**. Just [create a new workflow](https://pipedream.com/new), then add pre-built Zoom [actions](/workflows/steps/actions/) (create a meeting, send a chat message, etc.) or [write your own Node code](/workflows/steps/code/). These workflows can be triggered by HTTP requests, timers, email, or on any app-based event (new tweets, a Github PR, Zoom events, etc).

<img src="./images/workflow.png" width="500px" style="margin-left: auto; margin-right: auto; display: block;"/>

**Pipedream [**event sources**](/event-sources/) expose real-time event streams for any [Zoom event](https://marketplace.zoom.us/docs/api-reference/webhook-reference)** - just connect your Zoom acccount, and get an event stream. Event sources can trigger workflows, running custom code each time an event occurs in Zoom. For example, to run a workflow each time a meeting ends, you can create a **Meeting Ended** source. This source emits an event as soon as a meeting ends in your account, which can trigger a workflow that pulls participant stats, emails those participants a survey, or anything else you'd like.

<img src="./images/event-sources.png" width="500px" style="margin-left: auto; margin-right: auto; display: block;"/>

You can also subscribe to a [private SSE stream](/api/sse/) that lets you listen for these events **in your own application**, in real time. This allows you to use Pipedream to host the event source, which can trigger existing code in your own infrastructure (vs. a Pipedream workflow).

<img src="./images/sse.png" width="500px" style="margin-left: auto; margin-right: auto; display: block;"/>

## Zoom vs. Zoom Admin app

Zoom users can be classified into two groups: non-admins and admins. Pipedream exposes two apps — **Zoom** and **Zoom Admin** — to serve both groups.

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

## Zoom Event Sources

## Zoom Actions / Workflows

## Removing Pipedream's access to your Zoom account

You can revoke Pipedream's access to your Zoom account by visiting your [list of installed apps in Zoom](https://marketplace.zoom.us/user/installed).

As soon as you do, any Pipedream workflows that connect to Zoom will immediately fail to work.

You can delete any Zoom connected accounts in [your list of Pipedream Apps](https://pipedream.com/apps), as well.

## Usage

Please see the section on [Connecting to Zoom from Pipedream](#connecting-to-zoom-from-pipedream) to create a Pipedream workflow that connects to the Zoom API.

Pipedream's Zoom app requests all [Zoom user-managed App Scopes](https://marketplace.zoom.us/docs/guides/authorization/permissions#user-managed-scopes).

Pipedream's Zoom Admin app requests all [Zoom account-level App Scopes](https://marketplace.zoom.us/docs/guides/authorization/permissions#account-level-scopes).

<Footer />
