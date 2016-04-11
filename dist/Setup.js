export default function Setup(configurator, bootstrapper) {
    let setup = {
        model,
        component,
        bootstrap
    };
    function model(instance) {
        configurator.setModel(instance);
        return setup;
    }
    function component(selector, component) {
        configurator.registerComponent(selector, component);
        return setup;
    }
    function bootstrap(root) {
        let registry = configurator.getRegistry();
        return bootstrapper.bootstrap(registry, root);
    }
    return setup;
}
