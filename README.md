# Pipedream Docs

## Modifying docs and testing locally

First, install the dependencies for the repo:

```bash
yarn install
```

Then, run the Vuepress app locally using

```bash
yarn docs:dev
```

This should run a local development server on `http://localhost:8080/`. When you make changes to the Markdown files in the repo, the app should hot reload and refresh the browser automatically.

When you commit and push your changes on a non-`master` branch, those changes are deployed to https://docs.pipekit.com . This overwrites the changes from any other non-`master` branch that were previously pushed (you can only test changes to one branchat a time).

Any changes to the `master` branch (when you merge a PR in Github, or push `master` directly), those changes are deployed to https://docs.pipedream.com automatically.
