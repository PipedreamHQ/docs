# CLI Reference

::: warning PREVIEW RELEASE
This is an early version of the CLI, and we need to hear your feedback on what we can improve. Please reach out on [Slack](https://pipedream.com/community) or raise an issue on our [Github roadmap](https://github.com/PipedreamHQ/roadmap) with any questions or suggestions.

Since this is a beta release, the commands you see below, and the [Pipedream API](/api/reference), are subject to change based on feedback.
:::

[[toc]]

## Installing the CLI

Pipedream publishes a build of the CLI for macOS and Linux (for `386`, `amd64` and `arm64` architectures). To install the CLI, run:

```text
curl https://cli.pipedream.com/install | sh
```

## CLI config file

The `pd` config file contains your Pipedream API keys (tied to your default account, or other [profiles](#profiles)) and other configuration used by the CLI.

If the `XDG_CONFIG_HOME` env var is set, the config file will be found in `$XDG_CONFIG_HOME/pipedream`.

Otherwise, it will be found in `$HOME/.config/pipedream`.

## Profiles

Profiles allow you to work with multiple, named Pipedream accounts via the CLI.

### Creating a new profile

When you [login to the CLI](/cli/login/), the CLI writes the API key for that account to your config file, in the `api_key` field:

```text
api_key = abc123
```

You can set API keys for other, named profiles, too. Run

```text
pd login -p <profile>
```

`<profile>` can be any string of shell-safe characters that you'd like to use to identify this new profile. The CLI opens up a browser asking you to login to your target Pipedream account, then writes the API key to a section of the config file under this profile:

```text
[your_profile]
api_key = def456
```

You can also run `pd signup -p <profile>` if you'd like to sign up for a new Pipedream account via the CLI and set a named profile for that account.

### Using profiles

You can set a profile on any `pd` command by setting the `-p` or `--profile` flag. For example, to list the sources in a specific account, run:

```text
pd list sources --profile <profile>
```

<Footer />
