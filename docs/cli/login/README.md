# Logging into the CLI

Once you [install the CLI](/cli/install/), you'll need to link it with your Pipedream account.

If you haven't signed up for a Pipedream account, you can create an account at this step.

Run:

```text
pd login
```

This will open up a new window in your default browser. If you're already logged into your Pipedream account in this browser, this will immediately link the CLI to this account, writing your API key for that account to your [`pd` config file](/cli/reference/#cli-config-file).

Otherwise, you'll be directed to login or sign up for a new account.

Once you're done, go back to your shell and you should see confirmation that your account is linked:

```text
> pd login
Logged in as dylburger (dylan@pipedream.com)
```

## Logging out of the CLI

You can log out of the CLI by running:

```text
pd logout
```

## Using the CLI to manage multiple accounts

If you have multiple Pipedream accounts, you can use [profiles](/cli/reference/#profiles) to ensure the CLI can manage resources for each.
