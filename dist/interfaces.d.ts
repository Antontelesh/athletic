export interface IUnsubscriptionFn {
    (): void;
}
export interface IEventEmitter {
    /**
     * Adds a new listener
     * @param  {Function}          listener
     * @return {IUnsubscriptionFn}         a function to unsubscribe from changes
     */
    subscribe(listener: Function): IUnsubscriptionFn;
    /**
     * A function to unsubscribe from changes
     * @type {IUnsubscriptionFn}
     */
    unsubscribe: IUnsubscriptionFn;
    /**
     * Calls all listeners
     */
    emit(): void;
}
export interface IModel extends IEventEmitter {
    /**
     * Gets a deep value from the current state
     * @param  {string} path         path to value
     * @param  {any}    defaultValue
     * @return {any}
     */
    get(path: string, defaultValue?: any): any;
    /**
     * Sets a deep value to the current state. Triggers application update.
     * @param  {string} path  path to value
     * @param  {any}    value
     * @return {IModel}
     */
    set(path: string, value: any): IModel;
    /**
     * Resets the whole state. Triggers application update.
     * @param  {any}    data new state
     * @return {IModel}
     */
    reset(data: any): IModel;
    /**
     * Returns current state
     * @return {any}
     */
    getState(): any;
}
export interface IComponent {
    model: IModel;
    element: Element;
    /**
     * Being called on every update of application state
     */
    update(): void;
    /**
     * Being called on application destroy.
     * Useful for removing all event listeners registered during component lifecycle.
     */
    onDestroy(): void;
}
export interface IComponentStatic {
    new (element: Element, model: IModel): IComponent;
}
export interface IDictionary<V> {
    [key: string]: V;
}
export interface IBootstrapRegistry {
    components: IDictionary<IComponentStatic>;
    model?: IModel;
}
export interface IRegistryConfigurator {
    registerComponent(selector: string, component: IComponentStatic): IRegistryConfigurator;
    setModel(model: IModel): IRegistryConfigurator;
    getRegistry(): IBootstrapRegistry;
}
export interface IAppSetup {
    /**
     * Registers an application model with initial state.
     * A model first need to be created by `Model` factory.
     *
     * ```
     * import {App, Model} from 'athletic';
     *
     * let state = {prop: 'value'};
     * let model = Model(state);
     *
     * App().model(model)
     * ```
     * @param  {any}       data initial state
     * @return {IAppSetup}
     */
    model(data: any): IAppSetup;
    /**
     * Registers a component constructor bound to a DOM selector.
     * @param  {string}           selector
     * @param  {IComponentStatic} component
     * @return {IAppSetup}
     */
    component(selector: string, component: IComponentStatic): IAppSetup;
    /**
     * Bootstraps an application on a given element.
     * Returns a function which when being called unsubscribes from all state changes and calls `onDestroy` on each registered component instance.
     * @param  {Element}    root host element
     * @return {IDestroyFn}
     */
    bootstrap(root: Element): IDestroyFn;
}
export interface IBootstrapper {
    bootstrap(registry: IBootstrapRegistry, root: Element): IDestroyFn;
}
export interface IDestroyFn {
    /**
     * Removes all state listeners.
     * Calls `onDestroy` method on each registered component.
     */
    (): void;
}
