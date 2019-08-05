# Pipedream SQL Service

Pipedream operates a hosted data warehouse as a [Destination](/notebook/destinations/) you can send events to from a workflow. You can run SQL on any JSON data you send here.

We call this the **SQL** Destination for short.

At the left of every workflow, you'll see a **SQL** label. Clicking this displays a UI for writing and executing SQL queries, and viewing the associated results in a data table:

<div>
<img alt="Pipedream SQL UI" width="200" src="./images/sql-tab.png">
</div>

You can query the data sent to a SQL Destination immediately, without any extra work to define a table schema or worry about the data types of fields. **Send data, write SQL — that's it**.

We hope this helps you quickly analyze the data flowing through your workflow without worrying about creating and maintaining a complex data warehouse. The Pipedream SQL Service isn't a replacement for a data warehouse, but it's a simple way to start asking complex questions on your data.

Below we'll discuss how the **SQL** Destination works in detail, as well as the current limitations of the service.

[[toc]]

## Adding a SQL Destination

### Adding a Pipedream SQL Action

Adding a new SQL Destination to your workflow is easy. First, [add a new Action](/notebook/actions/#adding-a-new-action) to your workflow and choose the **Send Data To Pipedream SQL Service** Action.

Then, add the **Table** name and **Payload** you want to send to the SQL Destination. You can name the table whatever you want, within the [restrictions we impose on table names](#limitations-on-pipedream-sql-table-names).

**Typically, you'll want this table name to be unique across all other SQL Destinations you've previously added**. For example, if you've added a SQL Destination to a Twitter workflow where the table name is `tweets`, you'll want to add a different, descriptive table name to your new Destination so that the data flows to separate tables.

That said, you can also send data to the _same_ SQL table from across multiple workflows if you'd like. If you've configured three different workflows to process data from different sources, but the schema of those data are all the same and you want to consolidate the data for analysis, **you can send data from all three workflows (or more) to the same SQL table**. Just add the same **Table** name in all three SQL Destinations, and the data will all end up in that table for querying.

Finally, you'll need to add the **Payload** you want to send to the SQL Destination. The value you enter here can be any valid [JavaScript expression](/notebook/destinations/#payload-expressions) that evaluates to a JavaScript object, but typically you'll just want to add something like `$event` or `$event.body` to send all or a single property of [`$event`](/notebook/dollar-event/) to the SQL service for querying.

By default, if you include nothing in the **Payload** field, we send the full value of [`$event`](/notebook/dollar-event/).

### Using `$send.sql()`

You can send data to a SQL Destination in [Node.js code steps](/notebook/code/), too, using the `$send.sql()` function. **This allows you to send data to the SQL Destination programmatically, if you need more control than Actions afford**.

`$send.sql()` takes the same parameters as the corresponding Action:

```javascript
$send.sql({
  table: "your-table-name",
  payload: $event.body
});
```

Like with any `$send` function, you can use `$send.sql()` conditionally, within a loop, or anywhere you'd use a function normally in Node.js.

## What happens when you send data to a SQL Destination

Our goal is to make it easy for you to query event data via SQL, without any of the operational headache of maintaining a full data warehouse, or setting up table schemas manually. We take care of that for you.

Because we're handling this setup behind the scenes, we'd like to discuss how the data sent to SQL Destinations is processed and how we generate table schemas.

First, **payloads sent to SQL Destinations are batched and sent to the SQL service once a minute as a group. Therefore, the first event you send to a SQL Destination will take roughly one minute to be available for querying**.

Another important note — **the SQL service expects a JavaScript object as payloads**. If you send JSON as the event to your workflow, Pipedream will convert that JSON to the equivalent JavaScript object you can send directly to a SQL Destination. In other cases — for example, when you fetch data from an API that returns a JSON string — you may need to convert JSON strings into JavaScript objects using [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) before sending that object to a SQL destination. You can read about this specific limitation [below](#how-we-handle-non-json-data-sent-to-sql-destinations).

Once delivered, we create tables and process the schema according to the following rules.

### New table

If this is the first time you've sent data for the **Table** name you added in the SQL Destination, we:

- Create this table, and
- Process all payloads included in the first batch of events, creating the schema for this table based on the structure of their fields and the data types of their values.

Let's walk through some examples to see how this works.

Assume we create a new table called `my_test_table`, and we send the following two events:

```json
{ "event_type": "click", "ts": 1557349719 }
{ "event_type": "open", "ts": 1557349721, "username": "test_user" }
```

We examine the first event, which includes `event_type` — which we mark as a `STRING` — and `ts` — which we mark as a `DOUBLE` (see [how we map JSON data types to Presto types](#mapping-json-data-types-to-presto-types)).

We record that schema and process the second event. This event includes the same two fields, with the same data types, but also includes a _third_ field: `username`. This field is also marked as a Presto `STRING`.

The first event contained two fields, and the second event contained three fields. **The resulting schema needs to capture the _union_ of the fields _across_ events, capturing all three fields**.

In this example, the schema for the `my_test_table` table is:

- **`event_type`** : `STRING`
- **`ts`** : `DOUBLE`
- **`username`** : `STRING`

If we query this table, we'll see the following results:

<div>
<img alt="SQL test table" src="./images/test-table-schema.png">
</div>

Note that the first event contains an _empty cell_ under `username` — technically a `NULL` value — since that event was missing in that record.

Now let's say we send a third event to this same table:

```json
{ "event_type": "open", "ts": "1557349722", "username": "test_user" }
```

It's tough to spot the difference, but `ts` is a JSON **string** in this example, not a **number** like we saw before.

`ts` now contains numbers and strings in the underlying JSON, so we change the type of this field to `STRING` in the schema, since **`STRING` data captures any arbitrary sequence of characters and allows us to "fall back" to a more general type that captures both the number and string data in the `ts` field**.

Compare the `ts` results before:

<div>
<img alt="SQL test table" width="150" src="./images/ts-number.png">
</div>

with the results after we sent this third event, where `ts` is now a `STRING` type in our schema:

<div>
<img alt="SQL test table" width="290" src="./images/ts-string.png">
</div>

We dig into these typing decisions in depth [below](#mapping-json-data-types-to-presto).

### Existing table

Once a table exists, we process new data using the same schema logic noted above: we review the fields and values of the new JSON payloads, comparing them against the existing schema and updating that schema accordingly if we encounter a new field, or if the values of an existing field are of a new type than we've previously encountered.

### Mapping JSON data types to Presto types

The automatic schema detection described above follows a set of defined rules. Since the SQL service accepts only JSON data today, we map JSON types to a Presto type that's equivalent, or as close as possible to the original type.

In general, the first time we see a given JSON data type, we convert it to its corresponding Presto / Hive type:

| JSON type | Presto / Hive type |
| --------- | :----------------: |
| String    |      `STRING`      |
| Number    |      `DOUBLE`      |
| Boolean   |     `BOOLEAN`      |
| Array     |      `ARRAY`       |
| Object    |      `STRUCT`      |
| null      |      `STRING`      |

`ARRAY` and `STRUCT` types are more complex, and contain information about the types of data they contain. For example, if we send this payload:

```json
{
  "person": {
    "first_name": "Luke",
    "last_name": "Skywalker",
    "job": "Jedi"
  }
}
```

The resulting schema will have a single **person** `STRUCT` with the following schema:

```
struct<first_name:string,last_name:string,job:string>
```

We also convert strings matching some common patterns to specific Presto types:

| Pattern                                                                    | Presto type |
| -------------------------------------------------------------------------- | :---------: |
| `/^[0-9]{4}-[0-9]{2}-[0-9]{2}\$/`                                          |   `DATE`    |
| `/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{1,6})?\$/` | `TIMESTAMP` |

One point worth re-iterating: **all numbers are recorded as Presto `DOUBLE`s**. This might seem odd at first glance — why don't we treat integers as `INT`s and floating point numbers as `DOUBLE`s or `FLOAT`s? In JavaScript, numbers are just numbers — there's no special type to differentiate an integer from a floating-point number. JSON follows this same standard. We follow the guidance of the [JSON spec](https://tools.ietf.org/html/rfc7159#section-6) and use double-precision floating point numbers (in Presto, type `DOUBLE`) for all numbers. This is something we're likely to improve as the SQL service evolves over time.

### Fields with values of variable types

**If a field contains more than one type of data — for example, a number and a string — we always fall back to a field type of `STRING`**.

If you're seeing fields with values of variable types in your events — e.g. a field that contains numbers and strings for different events — coming into your workflow, and that's not expected, you have a couple of options.

1. [`CAST` the data](https://prestodb.github.io/docs/0.172/functions/conversion.html) to the desired type when making SQL queries, or
2. If you always expect events to contain fields with a single value, you can include a code cell in your workflow to check the type of the values of field, using the [`$end()` Pipedream function](/notebook/code/#end) to end the workflow if a value doesn't match the expected type. Calling `$end()` in a code step before a given step cell will not send the data to that Destination.

## Data Retention

Today, **events sent to a SQL Destination are stored for 7 days. After 7 days, the data is completely deleted**.

For example, an event sent around 12:00pm on a given day will be completely deleted 7 days after we received the event, also around 12:00pm.

Therefore, if your workflow is constantly sending events to a SQL Destination, you'll always have a rolling 7-day period of data to analyze.

## Running SQL queries

### The SQL tab

Each workflow has its own **SQL** tab, but **you can use that SQL editor to query data from across any workflow where you're using SQL Destinations**.

Let's say you have one workflow that records new billing events from [Stripe](https://stripe.com/), and you're saving that to a table called `stripe_billing_events`. In another workflow, you're fetching customer data — the date they signed up, whether or not they have a subscription on your service, etc. — and saving that to a table called `stripe_customer_info`.

**Using either SQL tab on either workflow, you can query and join data from across both tables**.

You can execute any SQL included in the Presto [SQL dialect](#sql-dialect).

You can query `STRUCT` fields — nested objects from the original JSON payload — using "dot notation". If you send an event like this to a SQL Destination:

```json
{
  "event_type": "click",
  "ts": 1557349719,
  "person": {
    "first_name": "Luke",
    "last_name": "Skywalker",
    "job": "Jedi"
  }
}
```

you can query the `first_name` and `job` fields within the `person` object like so:

<div>
<img alt="Querying nested data" src="./images/star-wars-struct.png">
</div>

In general, you want to `SELECT struct_name.field_name`.

This can be extended to more complex JSON with multiple levels of nested fields. To query a field two nested objects deep, for example, you can `SELECT struct_1.struct_2.field_name`.

### Keyboard Shortcuts

#### `Meta` + `Enter`

**Run SQL query**. The [`Meta`](https://www.computerhope.com/jargon/m/meta-key.htm) key is typically to the left of your spacebar, like the `Command` key on Macs, or the `Windows` key on PCs.

### Downloading your results

After a query completes, you can download the results of that query by clicking on the download button in the bottom-right:

<div>
<img alt="SQL Download button" src="./images/download-button.png">
</div>

Results for most queries will be downloaded as CSVs. The results of some queries — for example [DDL statements](https://en.wikipedia.org/wiki/Data_definition_language) like `SHOW TABLES` — will be downloaded as `.txt` files.

### SQL dialect

Different databases and query engines support a large variety of SQL statements and functions. A function that works in one database may not be supported on another. The SQL supported on one platform vs. another is referred to as a [**SQL dialect**](https://www.oreilly.com/library/view/sql-in-a/9780596155322/ch01s03.html).

You can run any SQL supported by [Presto v0.172](https://prestodb.github.io/docs/0.172/functions.html) on our SQL service, except for [a subset of queries we prevent](#sql-queries-we-prevent). This should include all the standard SQL you're used to — `SELECT` statments, aggregation functions, joins, and more — in addition to some Presto-specific functions you may have to learn for more advanced use cases.

### SQL queries we prevent

Today, we prevent the following SQL queries:

- `ALTER DATABASE`
- `ALTER TABLE`
- `CREATE DATABASE`
- `CREATE TABLE`
- `CREATE VIEW`
- `DESCRIBE VIEW`
- `DROP DATABASE`
- `DROP TABLE`
- `DROP VIEW`
- `SHOW CREATE TABLE`
- `SHOW PARTITIONS`
- `SHOW TBLPROPERTIES`
- `SHOW VIEWS`

If you issue one of these queries, you'll see a message noting that the query is not allowed.

## Query Limits

- Queries are currently limited to a runtime of 60 seconds.
- You cannot issue a query that returns over `1GB` of data.

## Limitations on Pipedream SQL table names

Table names have just a few limitations:

- They can contain alphanumeric characters.
- Additionally, the only allowed special character is the underscore (`_`), but
- You cannot _begin_ a table name with an underscore.

Some examples:

- **`my_table`** is OK, but **`my-table`** is not (_hyphen not allowed_)
- **`my_table_123`** is OK, but **`my_table@#`** is not (_no other special characters besides underscore_).
- **`table`** is OK, but **`_table`** is not (_no leading underscore_).

If you've chosen a table name that doesn't match these rules, we'll show an error message in the UI:

<div>
<img alt="Invalid table name" src="./images/invalid-table-name.png">
</div>

If you want to test potential table names against a [regular expression](https://en.wikipedia.org/wiki/Regular_expression), this pattern captures the same logic as above:

```
/^(?!_)[a-z0-9_]+$/gi
```

## How we handle non-JSON data sent to SQL Destinations

As we noted above, today SQL Destinations expect JSON payloads. If you send a string, a CSV row, or another type of data, you may see unexpected issues when querying your data via SQL. If you do, please [reach out to our Support team](/support/) and we can help you troubleshoot.

Often, though, we'll just ignore the record when you issue queries. If you see **empty rows** in your result set, that's often an indication of a record we couldn't query using the schema defined for this table.

Technically these empty rows contain `NULL` values for every field. So you can exclude these records by including a filter on your query like:

```sql
WHERE field IS NOT NULL
```

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
