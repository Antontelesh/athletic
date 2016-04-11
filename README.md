# athletic [![Build Status](https://travis-ci.org/Antontelesh/athletic.svg?branch=develop)](https://travis-ci.org/Antontelesh/athletic) [![Coverage Status](https://coveralls.io/repos/github/Antontelesh/athletic/badge.svg?branch=develop)](https://coveralls.io/github/Antontelesh/athletic?branch=develop)

Lightweight JavaScript library for declarative application logic.

## Rationale

This library was created as a super lightweight version of a front-end framework. There are cases where AngularJS and ReactJS are too huge to load on the page. These cases include small pages with a little bit of logic.

With this library, you are still able to keep being declarative but without a lot of complex features big frameworks provide.

## API

### App

`App` is the main thing to exist in a project.
It is intended to set up an application and then bootstrap it.

An application that uses `athletic` should have at least one instance of `App`.
It is recommended to have only one instance to prevent data sharing issues.

`App` is a factory and can be instantiated by calling it:

```js
import {App} from 'athletic';
var app = App();
```

Simply calling `App` will not do anything.
This factory returns you an interface to register your model, components and then bootstrap them.

#### App#model(model: Model): App

This method registers application model.
The actual `Model` instance should be passed as an argument.
This is done for you to manipulate an application state from outside of components.

Example:

```js
import {App, Model} from 'athletic';

var model = Model({first_name: 'John', last_name: 'Doe'});
var app = new App();

app.model(model);
```

This method returns `App` instance itself to support method chaining.

#### App#component(selector: string, constructor: Component): App

This method registers a component constructor bound to some selector.
Components are a bit similar to AngularJS directives, but in `athletic` their logic is implemented in a class.

After an application bootstrap, all registered components within an application root will be instantiated on elements found by selectors.

It is better to explain this in example:

```js
import {App, Model, Component} from 'athletic';

class ClientName extends Component {...}

var model = Model({first_name: 'John', last_name: 'Doe'});
var app = new App();

app
    .model(model)
    .component('.client-name', ClientName);
```

To read more about components look at `Component` API.
All components should inherit from `Component` class provided by `athletic`.
This method returns `App` instance itself to support method chaining.

#### App#bootstrap(root: Element): () => void

This method instantiates all registered components within the root element.
One element can hold only one component.
A component can't be instantiated more than once on an existing element.

Returns a function that being called, removes all listeners from model and triggers `onDestroy` method on every component.

```js
import {App, Model} from 'athletic';
import {ClientName} from './components';

var model = Model({first_name: 'John', last_name: 'Doe'});

var destroy = App()
    .model(model)
    .component('.client-name', ClientName)
    .bootstrap(document.body);

// somewhere later
destroy();
```

### Component

`Component` is an abstract class to extend your components from.
It holds a piece of logic bound to an element.
Every component stores links to its `element` and application `model` so you can reach any of them inside your component class:

```js
import {Component} from 'athletic';

class ClientName extends Component {

    constructor(element, model) {
        super(element, model);
        console.log(this.element); // => prints an element this instance bound to
        console.log(this.model); // => prints an instance of `Model` holding application data
    }

}
```

#### Component#update()

This is the main method of any component. It is being called every time the application model changes. You can place any logic here.

```js
import {Component} from 'athletic';

class ClientName extends Component {

    update() {
        var first_name = this.model.get('first_name'),
            last_name = this.model.get('last_name'),
            full_name = `${first_name} ${last_name}`;

        this.element.textContent = full_name;
    }

}
```

In this example if someone changed the model the update method would be executed and the view would be updated.

#### Component#onDestroy()

This method is called on application destroy.
Useful for removing event listeners created during the component lifecycle.

To destroy an application simply call a function returned from `App#bootstrap`.

### Model

`Model` factory provides an interface to read and write application data.
On any write, it triggers an event which causes an application to update all its components.

To create an instance of `Model` simply call the factory with initial state in argument:

```js
import {Model} from 'athletic';

var initialState = {prop: 'value'};
var model = Model(initialState);
```

An instance of `Model` then should be passed to `App#model` in order to register this instance within an application.

#### Model#get(path: string, defaultValue?: any): any

Provides a way to get data from the model.

This method uses [lodash#get](https://lodash.com/docs#get) internally, so you can pass deep path here.

`defaultValue` argument is optional.

#### Model#set(path: string, value: any): Model

Provides a way to set data to a model. Triggers change event that causes components to update.

This method uses [lodash#set](https://lodash.com/docs#set) internally, so you can pass deep path here.

#### Model#reset(data: any): Model

Provides a way to reset all the model data. Triggers change event that causes components to update.

#### Model#getState(): any

Returns all the state stored in the model.

## Example

Here is the full example.

```js
import {App, Component, Model} from 'athletic';

class NameChanger extends Component {

    constructor(element, model) {
        super(element, model);

        this.clickListener = () => {
            this.model.set('client.last_name', 'Smith');
        };
        this.element.addEventListener('click', this.clickListener);
    }

    onDestroy() {
        this.element.removeEventListener('click', this.clickListener);
    }

}

class ClientName extends Component {

    update() {
        var first_name = this.model.get('first_name'),
            last_name = this.model.get('last_name'),
            full_name = `${first_name} ${last_name}`;

        this.element.textContent = full_name;
    }

}

const model = Model({client: {first_name: 'John', last_name: 'Doe'}});

App()
    .model(model)
    .component('.name-changer', NameChanger)
    .component('.client-name', ClientName)
    .bootstrap(document.body);
```

The application loads representing a text "John Doe" and a button.
After the user clicks on the button, the name changes to "John Smith".
