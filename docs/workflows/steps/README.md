# What are steps?

Steps are the building blocks you use to create workflows. You can easily combine multiple steps into a workflow to integrate your apps, data and APIs:

- Steps include triggers, code and pre-built actions.

- Steps are executed linearly, in the order they appear in your workflow.

- You can pass data between steps using `steps` objects.

- You can observe the execution results for each step including export values, logs and errors.

## Types of Steps

### Trigger

Every workflow begin with a single [**trigger**](/workflows/steps/triggers/) step. Trigger steps initiate the execution of a workflow; i.e., workflows execute on each trigger event. For example, you can create an [HTTP trigger](/workflows/steps/triggers/#http) to accept HTTP requests. We give you a unique URL where you can send HTTP requests, and your workflow is executed on each request.

### Code, Actions

[**Code**](/workflows/steps/code/) and [**Actions**](/workflows/steps/actions/) steps cannot precede triggers, since they'll have no data to operate on.

Once you save a workflow, we deploy it to our servers. Each event triggers the workflow code, whether you have the workflow open in your browser, or not.

## Step Names

Steps have names, which appear at the top of the step:

<div>
<img width="250" alt="Default step names" src="./images/step-name.png">
</div>

When you [share data between steps](#step-exports), you'll use this name to reference that shared data. For example, `steps.trigger.event` contains the event that triggered your workflow. If you exported a property called `myData` from this code step, you'd reference that in other steps using `steps.nodejs.myData`. See the docs on [step exports](#step-exports) to learn more.

You can rename a step by clicking on its name and typing a new one in its place:

<div>
<img width="330" alt="New step name" src="./images/new-step-name.png">
</div>

After changing a step name, you'll need to update any references to the old step. In this example, you'd now reference this step as `steps.my_awesome_code_step`.

## Step Exports

By default, variables declared in a step are scoped to that step.

```js
// The variable myData can only be used within this step
const myData = 1;
```

To share data between steps, you can use **step exports**.

Your trigger step automatically exports the event that triggered your workflow in the variable `steps.trigger.event`. You can reference this variable in any step.

```js
// In any step, you can reference the contents of the trigger event
console.log(steps.trigger.event);
```

When you export your own data from steps, you'll access it at the variable `steps.[STEP NAME].[EXPORT NAME]`. For example, a code step might export data at `steps.nodejs.myData`.

You can export data from steps in one of two ways: using named exports or `return`. The examples below are also included in [this workflow](https://pipedream.com/@dylburger/step-exports-example-p_xMC86w/edit), so you can fork and run it to see how this works.

### Use named exports

The variable `this` is a reference to the current step. `this` is a JavaScript object, and it's mutable. You can export any [JSON-serializable](https://stackoverflow.com/a/3316779/10795955) data from a step by setting properties of `this`:

```js
this.exportedData = "I can use this data in another step";
this.anotherProperty = {
  data: "I can export any JSON-serializable data",
  foo: "bar"
};
```

When your workflow runs, you'll see the named exports appear below your step, with the data you exported. You can reference these exports in other steps using `steps.[STEP NAME].[EXPORT NAME]`.

Let's assume the step above was named `myStep`. You'd reference its exports in any subsequent step like so:

```js
console.log(steps.myStep.exportedData);
console.log(steps.myStep.anotherProperty);
```

### Use `return`

You can also export data from steps using `return`:

```js
return {
  data: "I can use this data in another step"
};
```

When you use `return`, the exported data will appear at `steps.[STEP NAME].return_value`. For example, if you ran the code above in a step named `nodejs`, you'd reference the returned data using `steps.nodejs.return_value`.

Like with named exports, the returned data will appear below the step.

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

Clicking on an event in the Inspector reveals the contents of `$event` for that workflow execution under the [source](/workflows/steps/triggers/) to the right:

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
