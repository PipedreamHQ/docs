# Code

Code cells are optional, but common. If the data received by your source needs no modification, and can be sent directly to a destination, you don't need code cells in a notebook.

But often, you'll want to modify the data you receive in some way. You may need to look up additional metadata about the event, parse raw data into more meaningful fields, or end the execution of a pipeline early under some conditions. Code cells let you do this and more.

[[toc]]

## Language Support

Today, Pipedream supports JavaScript, specifically [Node.js v10](https://nodejs.org/en/blog/release/v10.0.0/).

There's an important difference to understand between Node.js and the JavaScript that runs in your web browser: **Node doesn't have access to the items a browser expects, like the HTML on the page, or the URL of the page**. If you haven't used Node before, be aware of this limitation as you search for JavaScript examples on the web.

**Anything you can do with Node.js, you can do in a pipeline**. This includes using most of [npm's 400,000 packages](#using-npm-packages).

We understand the choice of JavaScript as the first supported language for a data pipeline tool may seem odd. But we're enabling any engineer to be a data engineer, and so want to start with one of the [most used](https://insights.stackoverflow.com/survey/2019#technology-_-programming-scripting-and-markup-languages) [languages](https://github.blog/2018-11-15-state-of-the-octoverse-top-programming-languages/). If you work on websites and know JavaScript well, Pipedream makes you a full stack engineer.

In 2019, the JavaScript ecosystem continues to grow, and we believe our users will benefit from that.

If you've never used JavaScript, see the [resources below](#new-to-javascript).

## Adding a code cell

Click the **+** button below any cell after your source and click the **<>** button to add a new code cell:

<div>
<img alt="New step" src="./images/new-button.png">
</div>

Add your code in the box that appears. For example, try:

```javascript
console.log("This is a new code cell");
console.log(
  `Here are all the keys I sent in my event body: ${Object.keys($event.body)}`
);
// Now, let's add another property to the $event object
$event.test = "Some test data";
```

Code cells support syntax highlighting and automatic indentation. We love readable code!

## Syntax errors

We try to catch any syntax errors you might encounter when writing code, highlighting the lines where the error occurred in red. You can hover over those red vertical lines to see more information about the error:

<div>
<img alt="Syntax error in code" src="./images/syntax-error.png">
</div>

::: warning
While you can save a notebook with syntax errors, it is unlikely to run correctly on new events. Make sure to fix syntax errors before running your pipeline.
:::

## Using `npm` packages

[npm](https://www.npmjs.com/) hosts JavaScript packages: bits of code someone else has written and packaged for others to use. npm has over 400,000 packages and counting. You can use most of those on Pipedream.

To use an npm package in a code cell, simply `require()` it:

```javascript
const _ = require("lodash");
```

When we run your pipeline code, we download the associated npm package for you before running your code cells.

If you've used Node before, you'll notice there's no `package.json` file to upload or edit. We want to keep working with packages simple, so just `require()` the module like you would in your code, after package installation, and get to work!

The core limitation of packages is one we described above: some packages require access to a web browser to run, and don't work with Node. Often this limitation is documented on the package `README`, but often it's not. If you're not sure and need to use it, we recommend just trying to `require()` it.

## `$end`

## Exceptions

## Using secrets in code

While the data you send through Pipedream pipelines is private, all Pipedream notebooks are public. It's critical you don't include secrets — API keys, tokens, or other sensitive values — directly in code cells.

Pipedream supports [environment variables](/environment-variables/) for keeping secrets separate from code. Once you create an environment variable in Pipedream, you can reference it in any notebook using `process.env.VARIABLE_NAME`. The values of environment variables are private.

See the [Environment Variables](/environment-variables/) docs for more information.

## New to JavaScript?

We understand many of you might be new to JavaScript, and provide resources for you to learn the language below.

When you're searching for how to do something in JavaScript, some of the code you try might not work in Pipedream. This could be because the code expects to run in a browser, not a Node.js environment. The same goes for [npm packages](#using-npm-packages).

### I'm new to programming

Many of the most basic JavaScript tutorials are geared towards writing code for a web browser to run. This is great for learning — a webpage is one of the coolest things you can build with code. We recommend starting with these general JavaScript tutorials and trying the code you learn on Pipedream:

- [JavaScript For Cats](http://jsforcats.com/)
- [Mozilla - Java​Script First Steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)
- [StackOverflow](https://stackoverflow.com/) operates a programming Q&A site that typically has the first Google result when you're searching for something specific. It's a great place to find answers to common questions.

### I know how to code, but don't know JavaScript

- [A re-introduction to Java​Script (JS tutorial)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
- [MDN language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Eloquent Javascript](https://eloquentjavascript.net/)
- [Node School](https://nodeschool.io/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
