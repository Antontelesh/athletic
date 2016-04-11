import {invokeMap, reduce, map} from 'lodash';
import invariant from './utils/invariant';
import isModel from './utils/isModel';
import {IModel, IBootstrapper, IBootstrapRegistry, IDestroyFn, IComponent, IComponentStatic, IDictionary} from './interfaces';

export default function Bootstrapper (): IBootstrapper {

  /**
   * Bootstraps an application on a DOM element.
   * @param  {IBootstrapRegistry} registry registry that contains all registered components and model
   * @param  {Element}            root     host element
   * @return {IDestroyFn}                  function to unsubscribe from model changes
   */
  function bootstrap(registry: IBootstrapRegistry, root: Element): IDestroyFn {
    invariant(isModel(registry.model), `Please specify application model using the \`Model\` factory: \`App().model(Model(...))\``);

    let components = initComponents(registry.components, root, registry.model);
    let unsubscribe = registry.model.subscribe(() => update(components));
    registry.model.emit();

    return () => {
      unsubscribe();
      invokeMap(components, 'onDestroy');
    };
  }

  /**
   * Calls `update` on all components
   * @param {IComponent[]} components registered components
   */
  function update(components: IComponent[]): void {
    invokeMap(components, 'update');
  }

  /**
   * Initializes components
   * @param  {IDictionary<IComponentStatic>} source component registry
   * @param  {Element}                       root   host element
   * @param  {IModel}                        model  application model
   * @return {IComponent[]}                         initialized components
   */
  function initComponents(source: IDictionary<IComponentStatic>, root: Element, model: IModel): IComponent[] {
    return reduce<IComponentStatic, IComponent[]>(source, (acc: IComponent[], ctor: IComponentStatic, selector: string) => {
      let elements = root.querySelectorAll(selector);
      let instances = map(elements, element => new ctor(element, model));
      return acc.concat(instances);
    }, []);
  }

  return {bootstrap};
}
