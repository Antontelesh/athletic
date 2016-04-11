import {IRegistryConfigurator, IComponentStatic, IBootstrapRegistry, IModel} from './interfaces';

export default function RegistryConfigurator (): IRegistryConfigurator {

  let registry: IBootstrapRegistry = {
    components: {}
  };

  let configurator = {
    setModel,
    registerComponent,
    getRegistry
  };

  function setModel (model: IModel): IRegistryConfigurator {
    registry.model = model;
    return configurator;
  }

  function registerComponent (selector: string, component: IComponentStatic): IRegistryConfigurator {
    registry.components[selector] = component;
    return configurator;
  }

  function getRegistry (): IBootstrapRegistry {
    return registry;
  }

  return configurator;

}
