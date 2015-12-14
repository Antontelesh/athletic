/**
 * Provides class to extend all components from
 */
export class Component {

  constructor(element) {
    this.element = element;
  }

  update() {
    // implemented in concrete classes
  }

}
