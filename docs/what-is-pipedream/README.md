---
prev: false
---

# What is Pipedream?

Pipedream is the fastest way to build a workflow to process event data. [Workflows](#what-are-workflows) are authored using basic building blocks — [sources](/notebook/sources/), [code](/notebook/code/), [actions](/notebook/destinations/), and more.

You can build these workflows in minutes, without worrying about managing any of the infrastructure required to operate them. We take care of that for you, and let you focus on the workflow logic.

You have full control over how workflows operate. You can add [JavaScript code](/notebook/code/) — Node.js — at any step, using virtually any `npm` package you want to perform any programming logic.

We've tried hard to simplify the stuff you shouldn't have to care about — the infrastructure — while giving you full control over your workflow. We hope Pipedream will help you solve problems quickly and effortlessly.

## What are workflows?

A workflow is just a recipe — you start with some data, modify it using a sequence of steps, and send it somewhere.

Let's take Amazon.com as an example. When you search for an item, that triggers an **event** — the data Amazon records about that search. Typically this event contains a lot of _raw_ information: the time you searched, the page you came from, whether or not you're logged into your Amazon account, and more.

Then, they transform it, adding, modifying and removing attributes. For example, they might use your account ID to look up if you're an Amazon Prime member, and add another attribute accordingly. Once processed, they store the data somewhere to understand what customers are searching for.

_Record_, _Transform_, _Store_. Sounds simple!

If you've ever worked with event data, you know it's not. You can write down how your workflow should work in minutes, but spend days or weeks actually building it.

Once you've written the code to process your data, you'll probably spend the most time figuring out how and where to run that code, how to record new events, and how to send them to their final destination. This is required, but it's not unique to _your_ workflow. You often just need a way to record, transform, and store data quickly and reliably.

**Pipedream lets you focus on _what_ you want done, and we take care of _how_ to do it for you.**

It takes less than 5 minutes to make your first workflow. [Sign up](/sign-up/) to get started.

<Footer />
