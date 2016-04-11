import {IComponent, IModel} from './interfaces';

/**
 * Provides class to extend all components from
 */
export default class Component implements IComponent {

  constructor(
    public element: Element,
    public model: IModel
  ) {}

  update() {
    // implemented in concrete classes
  }

  onDestroy() {
    // implemented in concrete classes
  }

}
