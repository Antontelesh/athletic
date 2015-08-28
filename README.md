# athletic

Lightweight JavaScript library for declarative application logic.


## Usage

The library is written in ES6. All the files have `.es6` extension. They are meant to be compiled by Babel or some other ES6 → ES5 compiler.

## API

### App

`App` is the main thing to exist in a project. It holds all the links to component constructors as well as application model and binds them together.

An application using `athletic` should have at least one instance of `App`.
It is recommended to have only one instance to prevent data sharing issues.

There is native way to instantiate an `App`:

```
import {App} from 'athletic';
var app = new App();
```

#### App#model(data): App

This method registers application model with data passed in an argument.

Example:

```
import {App} from 'athletic';
var app = new App();

app.model({first_name: 'John', last_name: 'Doe'});
```

This method returns `App` instance itself to support method chaining.

#### App#component(selector: string, constructor: Function): App

This method registers component constructor bound to some selector. Components are a bit similar to AngularJS directives, but in `athletic` their logic is implemented in a class.

After an application bootstrap all registered components within an application root will be instantiated on elements found by selectors.

It is better to explain this in example:

```
import {App} from 'athletic';
import {ClientName} from './components';
var app = new App();

app
    .model({first_name: 'John', last_name: 'Doe'})
    .component('.client-name', ClientName);
```

To read more about components look at `Component` API.

This method returns `App` instance itself to support method chaining.

#### App#bootstrap(root: Element): void

This method instantiates all registered components within root element.
One element can hold only one component. Component can't be reinstantiated on an existing element.

```
import {App} from 'athletic';
import {ClientName} from './components';
var app = new App();

app
    .model({first_name: 'John', last_name: 'Doe'})
    .component('.client-name', ClientName)
    .bootstrap(document.body);
```
