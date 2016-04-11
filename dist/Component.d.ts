import { IComponent, IModel } from './interfaces';
/**
 * Provides class to extend all components from
 */
export default class Component implements IComponent {
    element: Element;
    model: IModel;
    constructor(element: Element, model: IModel);
    update(): void;
    onDestroy(): void;
}
