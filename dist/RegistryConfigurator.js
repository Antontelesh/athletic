export default function RegistryConfigurator() {
    let registry = {
        components: {}
    };
    let configurator = {
        setModel,
        registerComponent,
        getRegistry
    };
    function setModel(model) {
        registry.model = model;
        return configurator;
    }
    function registerComponent(selector, component) {
        registry.components[selector] = component;
        return configurator;
    }
    function getRegistry() {
        return registry;
    }
    return configurator;
}
