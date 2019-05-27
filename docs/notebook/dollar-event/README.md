# `$event`

`$event` — "dollar event" — is a variable that contains the data sent to your source, as well as Pipedream-provided metadata about the event. Its contents change for every event sent to your pipeline.

In code and destination cells, you can access or modify the contents of `$event`

[[toc]]

## Referencing `$event` in code cells

In Node.js code cells, **`$event` is a [JavaScript object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#Object_basics)**. This is just a collection of key-value pairs surrounded by curly braces — {} — like so:

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

## Shape / Contents

The initial contents of `$event` differ depending on the source you've chosen for your pipeline.

Clicking on an event in the Inspector reveals the contents of the associated `$event` below it:

<div>
<img alt="Dollar event in inspector" width="450" src="./images/dollar-event.png">
</div>

## Copying the dot-notation path to a specific value

When you send an event with a complex shape to a pipeline, it can be difficult to construct the correct dot-notation to access a specific value from `$event`. For example, in this example below:

<div>
<img alt="Complex dollar event" src="./images/complex-dollar-event.png">
</div>

if I want to get the name of the homeworld of the person, I've got to scan down many levels of nested objects to construct `$event.body.person.homeworld.name`.

**Instead, I can find the property I'm interested in, hold the `Cmd` or `Windows` key, and click. This will copy the dot-notation path to that property to my clipboard.**

<div>
<img alt="Cmd click to get dot-notation" src="./images/cmd-click-to-get-path.png">
</div>

## Modifying `$event`

Any changes you make to `$event` persist across code cells. Typically, we scope variables to the cell they were created in, so you wouldn't have access to a variable outside of that cell. **Any data you need to use across cells should be stored in `$event`**.

You can add, delete, or update the value of any key in `$event`:

```javascript
// Add a new key-value pair
$event.currentTimestamp = +new Date();
// Delete a key-value pair
delete $event.url;
// Update a value of an existing key
$event.body.person.job = "Retired Jedi";
```

If you modify `$event`, we'll also display the changes you made clearly below the cell, under the **Diff** header:

<div>
<img alt="Dollar event diff" width="450" src="./images/diff.png">
</div>

## Referencing `$event` in destinations

You can reference `$event` in the **Payload** field of destination cells, when choosing what data to send to destinations. See the [Payload Expressions](/notebook/destinations/#payload-expressions) docs for more info.

## Restrictions

You cannot completely re-assign the value of the `$event` variable. That is, you cannot do this:

```javascript
$event = { prop: "value" };
```

You cannot reference `$event` in text cells.

## Still have questions?

Please [reach out](/support/) if this doc didn't answer your question. We're happy to help!
