/**
 * Provides class to extend all components from
 */
export default class Component {
    constructor(element, model) {
        this.element = element;
        this.model = model;
    }
    update() {
        // implemented in concrete classes
    }
    onDestroy() {
        // implemented in concrete classes
    }
}
