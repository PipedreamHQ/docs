# SQL

Pipedream operates a hosted data warehouse as a destination you can send events to from a pipeline. You can run SQL on the data you send here.

We call this destination **Pipedream SQL**.

<div>
<img alt="Pipedream SQL destination" width="277" src="./images/sql-destination.png">
</div>

At the top of every notebook, you'll see a **SQL** tab. Clicking this tab displays a UI for writing and executing SQL queries, and viewing the associated results in a data table:

<div>
<img alt="Pipedream SQL UI" src="./images/sql-ui.png">
</div>

You can query the data sent to a SQL destination immediately, without any extra work to define a table schema or worry about the data types of fields. **Send data, write SQL — that's it**.

We hope this helps you quickly analyze the data flowing through your pipeline without worrying about creating and maintaining a complex data warehouse. The Pipedream SQL service isn't a replacement for a data warehouse, but it's a simple way to start asking complex questions on your data.

Below we'll discuss how the **Pipedream SQL** destination works in detail, as well as the current limitations of the service.

[[toc]]

## Creating a new Pipedream SQL destination

Adding a new **SQL** destination to your notebook is easy. First, [create a new destination cell](/notebook/destinations/#adding-a-new-destination) and choose the **Pipedream SQL** destination.

Then, add the **Table** name and **Payload** you want to send to the SQL destination. You can name the table whatever you want, within the [restrictions we impose on table names](#limitations-on-pipedream-sql-table-names):

<div>
<img alt="SQL destination details" width="382" src="./images/sql-destination-details.png">
</div>

**Typically, you'll want this table name to be unique across all other SQL destinations you've previously added**. For example, if you've added a SQL destination to a Twitter pipeline where the table name is `tweets`, you'll want to add a different, descriptive table name to your new destination so that the data flows to separate tables.

That said, you can also send data to the _same_ SQL table from across multiple pipelines if you'd like. If you've configured three different pipelines to process data from different sources, but the schema of those data are all the same and you want to consolidate the data for analysis, **you can send data from all three pipelines (or more) to the same SQL table**. Just add the same **Table** name in all three SQL destinations, and the data will all end up in that table for querying.

Finally, you'll need to add the **Payload** you want to send to the SQL destination. The value you enter here can be any valid [JavaScript expression](/notebook/destinations/#payload-expressions), but typically you'll just want to add something like `$event` or `$event.body` to send all or a single property of [`$event`](/notebook/dollar-event/) to the SQL service for querying.

By default, if you include nothing in the **Payload** field, we send the full value of [`$event`](/notebook/dollar-event/).

## What happens when you send data to a SQL destination

Our goal is to make it easy for you to query event data via SQL, without any of the operational headache of maintaining a full data warehouse, or setting up table schemas manually. We take care of that for you.

Because we're handling this setup behind the scenes, we'd like to discuss how the data sent to SQL destinations is processed and how we generate table schemas.

First, **payloads sent to SQL destinations are batched and sent to the SQL service once a minute as a group. Therefore, the first event you send to a SQL destination will take roughly one minute to be available for querying**. You can check on the delivery of any given event to the associated destinations using the [**Dest** field of the inspector](/notebook/inspector/#dest-destinations).

Another important note — the SQL service expects JSON payloads. You can read about this specific limitation [below](#how-we-handle-non-json-data-sent-to-sql-destinations).

Once delivered, we create tables and process the schema according to the following rules.

### New table

If this is the first time you've sent data for the **Table** name you added in the SQL destination, we:

- Create this table, and
- Process all payloads included in the first batch of events, creating the schema for this table based on the structure of their fields and the data types of their values.

Let's walk through some examples to see how this works.

Assume we create a new table called `my_test_table`, and we send the following two events:

```json
{ "event_type": "click", "ts": 1557349719 }
{ "event_type": "open", "ts": 1557349721, "username": "test_user" }
```

We examine the first event, which includes `event_type` — a `STRING` — and `ts` — which we mark as a `DOUBLE` (see [how we map JSON data types to Presto](#mapping-json-data-types-to-presto)).

We record that schema and process the second event. This event includes the same two fields, with the same data types, but also includes a _third_ field: `username`. This field is also marked as a Presto `STRING`.

Even though the first event contained two fields, and the second event contained three fields, **the resulting schema needs to capture the _union_ of the fields _across_ events**.

In this example, the schema for the `my_test_table` table is:

- `event_type` : `STRING`
- `ts` : `DOUBLE`
- `username` : `STRING`

If we query this table, we'll see the following results:

<div>
<img alt="SQL test table" src="./images/test-table-schema.png">
</div>

Note that the first event contains an empty cell under `username` — technically a `NULL` value — since that event was missing in that record.

Now let's say we send a third event to this same table:

```json
{ "event_type": "open", "ts": "1557349722", "username": "test_user" }
```

It's tough to spot the difference, but `ts` is a JSON **string** in this example, not a **number** like we saw before.

`ts` now contains numbers and strings in the underlying JSON, so we change the type of this field to `STRING` in the schema, since `STRING` data captures any arbitrary sequence of bytes and allows us to "fall back" to a more general type that captures both the number and string data in the `ts` field.

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

### Mapping JSON data types to Presto

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

```

We also convert strings matching some common patterns to Presto types:

| Pattern                                                                    | Presto type |
| -------------------------------------------------------------------------- | :---------: |
| `/^[0-9]{4}-[0-9]{2}-[0-9]{2}\$/`                                          |   `DATE`    |
| `/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{1,6})?\$/` | `TIMESTAMP` |

One point worth re-iterating: **all numbers are recorded as Presto `DOUBLE`s**. This might seem odd at first glance — why don't we treat integers as `INT`s and floating point numbers as `DOUBLE`s or `FLOAT`s? In JavaScript and JSON, numbers are just numbers — there's no special type to differentiate an integer from a floating-point number. JSON follows this same standard. We follow the guidance of the [JSON spec](https://tools.ietf.org/html/rfc7159#section-6) and use double-precision floating point numbers (in Presto, type `DOUBLE`) for all numbers. This is something we're likely to improve as the SQL service evolves over time.

### Fields with values of variable types

If a field contains, for example, both a number and a string, how does our schema auto-detection handle that?

We fall back to the most general Presto or Hive type that captures all of the data contained in the field, following these rules:

If you're seeing fields with values of variable types in your events — e.g. a field that contains numbers and strings for different events — coming into your pipeline, you have a couple of options.

1. [`CAST` the data](https://prestodb.github.io/docs/0.172/functions/conversion.html) to the desired type when making SQL queries, or
2. If you always expect events to contain fields with a single value, you can include a code cell in your notebook to check the type of the values of field, using the [`$end()` Pipedream function](/notebook/code/#end) to end the pipeline if a value doesn't match the expected type. Calling `$end()` in a code cell before a given destination cell will not send the data to that destination.

## Data Retention

Today, **data sent to a SQL destination is stored for 7 days. After 7 days, the data is completely deleted**.

For example, an event sent around 12:00pm on a given day will be completely deleted 7 days after we received the event, also around 12:00pm. All events sent _within_ 7 days — those sent yesterday, for example — are retained until the 7-day expiry.

Therefore, if your pipeline is constantly sending events to a SQL destination, you'll always have a rolling 7-day period of data to analyze.

## Running SQL queries

### The SQL tab

Each notebook has its own **SQL** tab, but **you can use that SQL editor to query data from across any pipeline where you're using SQL destinations**.

Let's say you have one pipeline that records new billing events from [Stripe](https://stripe.com/), and you're saving that to a table called `stripe_billing_events`. In another pipeline, you're fetching customer data — the date they signed up, whether or not they have a subscription on your service, etc. — and saving that to a table called `stripe_customer_info`.

**Using either SQL tab on either pipeline, you can query and join data from across both tables**.

You can execute any SQL included in the Presto [SQL dialect](#sql-dialect).

You can query `STRUCT` fields — nested objects from the original JSON payload — using "dot notation". If you send an event like this to a SQL destination:

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

You can run any SQL supported by [Presto v0.172](https://prestodb.github.io/docs/0.172/functions.html) on our SQL service except for [a subset of queries we prevent](#sql-queries-we-prevent). This should include all the standard SQL you're used to — `SELECT` statments, aggregation functions, joins, and more — in addition to some Presto-specific functions you may have to learn for more advanced use cases.

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

If you've chosen a table name that doesn't match these rules, we'll show an error message in the UI:

If you're into [regular expressions](https://en.wikipedia.org/wiki/Regular_expression), this pattern captures the same logic as above:

```
/^(?!_)[a-z0-9_]+$/gi
```

## How we handle non-JSON data sent to SQL destinations

As we noted above, today SQL destinations expect JSON payloads. If you send a string, a CSV row, or another type of data, you may see unexpected issues when querying your data via SQL. If you do, please [reach out to our Support team](/support/) and we can help you troubleshoot.

Often, though, we'll just ignore the record. If you see **empty rows** in your result set, that's often an indication of a record we couldn't query using the schema defined for this table.

Technically these empty rows contain `NULL` values for every field. So you can exclude these records by including a filter on your query like:

```sql
WHERE field IS NOT NULL
```

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
