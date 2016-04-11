import RegistryConfigurator from './RegistryConfigurator';
import Bootstrapper from './Bootstrapper';
import Setup from './Setup';
export default function App() {
    const configurator = RegistryConfigurator();
    const bootstrapper = Bootstrapper();
    return Setup(configurator, bootstrapper);
}
