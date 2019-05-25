---
prev: false
---

## What is Pipedream?

Pipedream enables every engineer to be a data engineer, letting you build [pipelines](#what-are-pipelines) using basic building blocks — [sources](/notebook/sources/), [code](/notebook/code/), [destinations](/notebook/destinations/), and more.

You can build these pipelines in minutes, without worrying about managing any of the infrastructure required to operate them. We take care of that for you, and let you focus on the pipeline logic.

Still, we give you a lot of control over how your pipeline works. You can add [JavaScript code](/notebook/code/) — specifically Node.js — at any step of a pipeline, using virtually any `npm` package you want to perform any programming logic.

We've tried hard to simplify the stuff you shouldn't have to care about — the infrastructure — while giving you full control over your pipeline. We want to give you data superpowers — we hope it'll help you solve data problems quickly and effortlessly.

## What are pipelines?

When software engineers work with data, they create **pipelines**. A pipeline is just a recipe — you start with some data, modify it using a sequence of steps, and send it somewhere.

Let's take Amazon.com as an example. When you search for an item, that triggers an **event** — the data Amazon records about that search. Typically this event contains a lot of _raw_ information: the time you searched, the page you came from, whether or not you're logged into your Amazon account, and more.

Then, they transform it, adding, modifying and removing attributes. For example, they might use your account ID to look up if you're an Amazon Prime member, and add another attribute accordingly. Once processed, they store the data somewhere to understand what customers are searching for.

_Record_, _Transform_, _Store_. Sounds simple!

If you've ever worked with data, you know it's not. You can write down how your pipeline should work in minutes, but spend days or weeks actually building it.

Why so long? Once you've written the code to process your data, you'll probably spend the most time figuring out how and where to run that code, how to record new events, and how to send them to their final destination. This is required for your pipeline to work, but it's not unique to _your_ pipeline. Most pipelines just need to record, transform, and store data quickly and reliably.

**Pipedream lets you focus on _what_ you want done, and we take care of _how_ to do it for you.**

It only takes 5 minutes to make your first pipeline. [Sign up](/sign-up/) to get started.
