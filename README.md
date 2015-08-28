# athletic

Lightweight JavaScript library for declarative application logic.

## Rationale

This library was created as a super lightweight version of a frontend framework. There are cases where AngularJS and ReactJS are too huge to load on page. These cases include small pages with a little bit of logic.

With this library you are still able to keep being declarative but without a lot of complex features big frameworks provide.

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

### Component

`Component` is an abstract class to extend your components from. It holds a piece of logic bound to an element. Every component stores links to `app`, its `element` and application `model` so you can reach any of them inside your component class:

```
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

```
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

## Example

Here is the full example.

```
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
