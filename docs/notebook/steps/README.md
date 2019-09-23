# Step Exports

Use step exports to pass data between steps in a workflow.

- Steps can export immutable, JSON-serializable values using `return` or `this.foo = 'bar'`.

- Step exports are mapped to the `steps` object at `steps.unique_step_name`.

- Exports can be inspected for each event (e.g., add `return 'foo'` to a Node.js step and run your workflow).

<Footer />
