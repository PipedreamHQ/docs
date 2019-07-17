# Snowflake

[Snowflake](https://www.snowflake.com/) is a cloud data warehouse built for performance and ease-of-use. Pipedream makes it easy to stream JSON to Snowflake for free, and you can get started in just a few minutes.

[[toc]]

## Sending data to Snowflake

**Before you send data to Snowflake, you'll need to complete the [prerequisite steps below](#prerequisites)**.

You can use the `$send.snowflake()` method within any Node.js code cell to send JSON to Snowflake. For example, we save the necessary Snowflake values in [Pipedream environment variables](/environment-variables) and send test JSON like so:

```javascript
const {
  SNOWFLAKE_USERNAME,
  SNOWFLAKE_ACCOUNT_NAME,
  SNOWFLAKE_DATABASE,
  SNOWFLAKE_SCHEMA,
  SNOWFLAKE_ROLE,
  SNOWFLAKE_STAGE,
  SNOWFLAKE_PIPE,
  SNOWFLAKE_PRIVATE_KEY
} = process.env;

$send.snowflake({
  user: SNOWFLAKE_USERNAME,
  private_key: SNOWFLAKE_PRIVATE_KEY,
  database: SNOWFLAKE_DATABASE,
  schema: SNOWFLAKE_SCHEMA,
  stage_name: SNOWFLAKE_STAGE,
  pipe_name: SNOWFLAKE_PIPE,
  account: SNOWFLAKE_ACCOUNT_NAME,
  host: `${SNOWFLAKE_ACCOUNT_NAME}.snowflakecomputing.com`,
  payload: { test: "This is from Pipedream" }
});
```

Take a look at [this example workflow](https://pipedream.com/@dylburger/stream-json-to-snowflake-p_D1C3pP?e=1NIL1deyiswWRBPL3BWWgtQ98sx) for an end-to-end example.

All the data sent to Snowflake using this method will be batched by Pipedream and delivered to Snowflake once a minute.

## Prerequisites

Before you send data to Snowflake, you'll need to configure a Snowflake user with permission to send data to your destination table, and setup a few Snowflake resources required for streaming. We'll walk through this step-by-step below.

### Step 1 — Generate public / private key pair

Snowflake supports key pair authentication as an alternative to password-based auth. We use key pair auth to stream data into Snowflake, so before proceeding, you'll need to generate a key pair<sup>1</sup>.

First, you'll need access to a terminal, and must have the `openssl` command installed. This should be included by default on macOS and Linux systems.

Run:

```bash
openssl genrsa -out rsa_key.pem 2048
```

This will generate a **private key** — save this file somewhere secure. You'll need it later.

Then, run

```bash
openssl rsa -in rsa_key.pem -pubout -out rsa_key.pub
```

This will generate a **public key** that you'll use below. You can run

```bash
cat rsa_key.pub
```

to print the contents of this file so you can copy and paste it below.

<sup>1</sup> [Preparing to load data using the snowpipe rest api](https://docs.snowflake.net/manuals/user-guide/data-load-snowpipe-rest-gs.html#using-key-pair-authentication)

### Step 2 — Create required Snowflake resources

You'll need to run the commands below using a role with permissions to create and manage databases and associated resources (e.g. `SYSADMIN` or `ACCOUNTADMIN`).

We use `PIPEDREAM` as the values of the database, role, and other variables below. You may want to change the values if you've already configured these resources.

```sql
-- Optionally, create a new database, then set the context for subsequent
-- commands to use that database.
CREATE DATABASE PIPEDREAM;
USE PIPEDREAM;

CREATE TABLE PIPEDREAM_JSON (json variant);

-- Create a new role, scoping all permissions to stream data to the table
-- to this role. Later, we'll create a specific user with this role.
CREATE ROLE PIPEDREAM;
GRANT USAGE ON DATABASE PIPEDREAM TO ROLE PIPEDREAM;
GRANT USAGE ON SCHEMA PIPEDREAM.PUBLIC TO ROLE PIPEDREAM;
GRANT INSERT, SELECT ON TABLE PIPEDREAM_JSON TO ROLE PIPEDREAM;

-- Pipedream loads data into an internal stage in your Snowflake account,
-- tied to this database. Then, we load data into your target table using
-- a Snowflake pipe.
CREATE STAGE IF NOT EXISTS PIPEDREAM
  FILE_FORMAT = ( TYPE = JSON )
  COMMENT = 'Pipedream-managed internal stage';

GRANT READ, WRITE on stage PIPEDREAM to role PIPEDREAM;

CREATE PIPE PIPEDREAM_JSON AS
  COPY INTO PIPEDREAM_JSON
  FROM @PIPEDREAM
  FILE_FORMAT = ( TYPE = JSON );

-- The role loading data into the pipe must have ownership privileges
-- on that pipe, but we have to pause the pipe to alter ownership
ALTER PIPE PIPEDREAM_JSON SET PIPE_EXECUTION_PAUSED=true;
GRANT OWNERSHIP ON PIPE PIPEDREAM_JSON TO ROLE PIPEDREAM;
SELECT SYSTEM$PIPE_FORCE_RESUME('PIPEDREAM_JSON');

CREATE USER PIPEDREAM DEFAULT_ROLE = PIPEDREAM;
GRANT ROLE PIPEDREAM to user PIPEDREAM;
-- Replace this value with the value of your RSA public key
ALTER USER PIPEDREAM SET RSA_PUBLIC_KEY='<your public key here>'
```

### Step 3 — Create environment variables for Snowflake resources, auth

Now that we've created the resources necessary to stream data to Snowflake, we'll need to reference these values when streaming data from Pipedream. **We recommend you add these values as [environment variables](/environment-variables/)**.

You'll need to add the following environment variables:

- `SNOWFLAKE_USERNAME` — the user you created above ("PIPEDREAM")
- `SNOWFLAKE_ACCOUNT_NAME` — your [Snowflake account name](https://docs.snowflake.net/manuals/user-guide/connecting.html#your-snowflake-account-name)
- `SNOWFLAKE_DATABASE` — the database you created above ("PIPEDREAM")
- `SNOWFLAKE_SCHEMA` — the database schema ("PUBLIC")
- `SNOWFLAKE_ROLE` — the role you created above ("PIPEDREAM")
- `SNOWFLAKE_STAGE` — the internal stage you created above ("PIPEDREAM")
- `SNOWFLAKE_PIPE` — the pipe you created above ("PIPEDREAM_JSON")
- `SNOWFLAKE_PRIVATE_KEY` — the contents of the private key file you generated in step 1, **removing the `-----BEGIN RSA PRIVATE KEY-----` header and `-----END RSA PRIVATE KEY-----` trailer above and below the key**.

You can technically name these variables whatever you'd like, as long as you reference the correct names in your workflow. Our [example workflow](https://pipedream.com/@dylburger/stream-json-to-snowflake-p_D1C3pP) uses the variable names above.

### Step 4 — Fork our example workflow, send test data

[Fork this workflow](https://pipedream.com/@dylburger/stream-json-to-snowflake-p_D1C3pP) and press the button to **Generate Test Event**.

This will send some sample data to the Snowflake pipe you defined, which should end up in your target table:

<div>
<img alt="JSON in Snowflake" src="./images/json-in-snowflake.png">
</div>

## Troubleshooting

First, don't hesitate to reach out to our Support team and we'll help troubleshoot any issue you have.

Note that **it will take roughly 60 seconds for data to be delivered to the target table**. The first time you send data, it's recommended you wait at least 3 minutes to confirm delivery. If you're not seeing data end up in your Snowflake table after that interval, there are a few things you can do to troubleshoot.

### Confirm your pipe has been created and is running

The pipe we created above is configured to copy the data from an internal stage into the destination table defined in the pipe. First run

```sql
SHOW PIPES;
```

and confirm a few things:

- The pipe you're sending data to should show up here. If not, the pipe wasn't correctly created. Review the SQL commands in step 2 where we created the pipe and run those again.
- This pipe should be configured to send data to the correct table. Check the `definition` field, and confirm the table and internal stage names match the ones you created above. The `definition` should look something like:

```sql
COPY INTO PIPEDREAM_JSON
  FROM @PIPEDREAM
  FILE_FORMAT = ( TYPE = JSON )
```

- Running `SELECT SYSTEM$PIPE_STATUS('PIPEDREAM_JSON')` should return a response like `{"executionState":"RUNNING","pendingFileCount":0}`, indicating the pipe is running and that it has no pending files left to process. If you see a `pendingFileCount` larger than 0, wait for Snowflake to process those pending files, and check the destination table again.

### Make sure Snowpipe encountered no errors on ingestion

It's possible Snowpipe encountered an error ingesting the files delivered by Pipedream, which means they would not end up in the destination table. You can run this command:

```sql
SELECT *
FROM table(information_schema.copy_history(table_name=>'PIPEDREAM_JSON', start_time=> dateadd(hours, -1, current_timestamp())));
```

If there were no errors ingesting the files, the `ERROR_COUNT` will be 0 and each of the the `FIRST_ERROR*` columns should hold a value of `NULL`. Otherwise, you'll see some values here, and may be able to tell what errors Snowpipe encountered on ingestion.

## Pricing

Pipedream is [free](/pricing/) to use for delivering data to Snowflake, but you'll incur costs in Snowflake for the data you store there, and for the [Snowpipe streaming service](https://docs.snowflake.net/manuals/user-guide/data-load-snowpipe-billing.html) we use to send data to your Snowflake account.

<Footer />
