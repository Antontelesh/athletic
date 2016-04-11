import {IRegistryConfigurator, IBootstrapper, IAppSetup, IComponentStatic, IDestroyFn, IModel} from './interfaces';

export default function Setup (configurator: IRegistryConfigurator, bootstrapper: IBootstrapper): IAppSetup {

  let setup = {
    model,
    component,
    bootstrap
  };

  function model (instance: IModel): IAppSetup {
    configurator.setModel(instance);
    return setup;
  }

  function component (selector: string, component: IComponentStatic): IAppSetup {
    configurator.registerComponent(selector, component);
    return setup;
  }

  function bootstrap (root: Element): IDestroyFn {
    let registry = configurator.getRegistry();
    return bootstrapper.bootstrap(registry, root);
  }

  return setup;

}
