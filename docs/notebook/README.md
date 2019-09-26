# What are steps?

Steps are the building blocks you use to create workflows. You can easily combine multiple steps into a workflow to integrate your apps, data and APIs:

- Steps include triggers, code and pre-built actions.

- Steps are executed linearly, in the order they appear in your workflow.

- You can pass data between steps using `steps` objects.

- You can observe the execution results for each step including export values, logs and errors.

## Types of Steps

### Trigger

Every workflow begin with a single [**trigger**](/notebook/sources/) step. Trigger steps initiate the execution of a workflow; i.e., workflows execute on each trigger event. For example, you can create a [webhook trigger](/notebook/sources/#webhook-sources) to accept data from webhooks. We give you a unique URL where you can send webhook requests, and your workflow is executed on each request.

### Code, Actions

[**Code**](/notebook/code/) and [**Actions**](/notebook/destinations/) steps cannot precede triggers, since they'll have no data to operate on.

Once you save a workflow, we deploy it to our servers. Each event triggers the workflow code, whether you have the workflow open in your browser, or not.

## Step Exports

Use step exports to pass data between steps in a workflow. Any step can use data that was returned or exported by previous steps. For example, a workflow trigger step exports data about the trigger event that you can reference and use in your workflow.

- Steps can export immutable, JSON-serializable values using `return` or `this.foo = 'bar'`.

- Step exports are mapped to the `steps` object at `steps.unique_step_name`.

- Exports can be inspected for each event (e.g., add `return 'foo'` to a Node.js step and run your workflow).

<!--

### Referencing step exports in code steps and action forms

**`steps` is a [JavaScript object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#Object_basics)**. This is just a collection of key-value pairs surrounded by curly braces — {} — like so:

```
{
    age: 50,
    name: {
        first: "Luke",
        last: "Skywalker",
    }
}
```

Every key — for example `age` — has an associated value (here, the number 50). In JavaScript, the value of a key can be an object itself, like `name` above.

Within a code cell, you can reference the data in `$event` like you would any other JavaScript object, using [dot-notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Objects_and_properties).

```javascript
// Prints "Luke"
console.log($event.name.first);
// Prints "Skywalker"
console.log($event.name.last);
```

### Shape / Contents

The initial contents of `$event` differ depending on the source you've chosen for your workflow.

Clicking on an event in the Inspector reveals the contents of `$event` for that workflow execution under the [source](/notebook/sources/) to the right:

<div>
<img alt="Dollar event under source" src="./images/complex-dollar-event.png">
</div>



### Copying the dot-notation path to a specific value

When you send an event with a complex shape to a workflow, it can be difficult to construct the correct dot-notation to access a specific value from `$event`. For example, in this example below:

<div>
<img alt="Complex dollar event" src="./images/complex-dollar-event.png">
</div>

if I want to get the name of the homeworld of the person, I've got to scan down many levels of nested objects to construct `$event.body.person.homeworld.name`.

**Instead, I can find the property I'm interested in, hold the `Cmd` or `Windows` key, and click. This will copy the dot-notation path to that property to my clipboard.**

<div>
<img alt="Cmd click to get dot-notation" src="./images/cmd-click-to-get-path.png">
</div>

### Modifying `$event`

Any changes you make to `$event` persist across code steps. Typically, we scope variables to the step they were created in, so you wouldn't have access to a variable outside of that step. **Any data you need to use across steps should be stored in properties of `$event`**.

You can add, delete, or update the value of any key in `$event`:

```javascript
// Add a new key-value pair
$event.currentTimestamp = +new Date();
// Delete a key-value pair
delete $event.url;
// Update a value of an existing key
$event.body.person.job = "Retired Jedi";
```

If you modify `$event`, we'll also display the changes you made clearly below the step, under the **Diff** header:

<div>
<img alt="Dollar event diff" width="450" src="./images/diff.png">
</div>

### Restrictions

You cannot completely re-assign the value of the `$event` variable. That is, you cannot do this:

```javascript
$event = { prop: "value" };
```
-->

<Footer />
