# athletic [![Build Status](https://travis-ci.org/Antontelesh/athletic.svg?branch=develop)](https://travis-ci.org/Antontelesh/athletic) [![Coverage Status](https://coveralls.io/repos/github/Antontelesh/athletic/badge.svg?branch=develop)](https://coveralls.io/github/Antontelesh/athletic?branch=develop)

Lightweight JavaScript library for declarative application logic.

## Rationale

This library was created as a super lightweight version of a frontend framework. There are cases where AngularJS and ReactJS are too huge to load on page. These cases include small pages with a little bit of logic.

With this library you are still able to keep being declarative but without a lot of complex features big frameworks provide.

## API

### App

`App` is the main thing to exist in a project. It holds all the links to component constructors as well as application model and binds them together.

An application using `athletic` should have at least one instance of `App`.
It is recommended to have only one instance to prevent data sharing issues.

There is native way to instantiate an `App`:

```js
import {App} from 'athletic';
var app = new App();
```

#### App#model(data): App

This method registers application model with data passed in an argument.

Example:

```js
import {App} from 'athletic';
var app = new App();

app.model({first_name: 'John', last_name: 'Doe'});
```

This method returns `App` instance itself to support method chaining.

#### App#component(selector: string, constructor: Function): App

This method registers component constructor bound to some selector. Components are a bit similar to AngularJS directives, but in `athletic` their logic is implemented in a class.

After an application bootstrap all registered components within an application root will be instantiated on elements found by selectors.

It is better to explain this in example:

```js
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

```js
import {App} from 'athletic';
import {ClientName} from './components';
var app = new App();

app
    .model({first_name: 'John', last_name: 'Doe'})
    .component('.client-name', ClientName)
    .bootstrap(document.body);
```

### Component

`Component` is an abstract class to extend your components from. It holds a piece of logic bound to an element. Every component stores links to `app`, its `element` and application `model` so you can reach any of them inside your component class:

```js
class ClientName extends Component {
    
    constructor(...args) {
        super(...args);
        console.log(this.app); // => prints an instance of `App`
        console.log(this.element); // => prints an element this instance bound to
        console.log(this.model); // => prints an instance of `Model` holding application data
    }

}
```

#### Component#update()

This is the main method of any component. It is being called every time the application model changes. You can place any logic here.

```js
class ClientName extends Component {

    update() {
        var first_name = this.model.get('first_name'),
            last_name = this.model.get('last_name'),
            full_name = `${first_name} ${last_name}`;

        this.element.textContent = full_name;
    }

}
```

In this example if some other component changed the model the update method would be executed and the view would be updated.

### Model

`Model` class provides an interface to read and write application data.
On any write it triggers an event which causes application to update all the components.

#### Model#get(path: string, defaultValue: any): any

Provides a way to get data from model.

This method uses [lodash#get](https://lodash.com/docs#get) internally, so you can pass deep path here.

#### Model#set(path: string, value: any): Model

Provides a way to set data to a model. Triggers change event that causes components to update.

This method uses [lodash#set](https://lodash.com/docs#set) internally, so you can pass deep path here.

#### Model#reset(data: any): Model

Provides a way to reset all the model data. Triggers change event that causes components to update.

## Example

Here is the full example.

```js
import {App, Component} from 'athletic';
var app = new App();

class NameChanger extends Component {

    constructor(...args) {
        super(...args);
        this.element.addEventListener('click', event => {
            this.model.set('client.last_name', 'Smith');
        });
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

app
    .model({client: {first_name: 'John', last_name: 'Doe'}})
    .component('.name-changer', NameChanger)
    .component('.client-name', ClientName)
    .bootstrap(document.body);
```

Application loads representing a text "John Doe" and a button.
After user clicks on button the name changes to "John Smith".
