// import { registerMicroApps, start } from 'qiankun';
// @ts-ignore
import { registerMicroApps, start } from '../../../micro-frontends/index';


registerMicroApps([
    {
        name: 'reactApp',
        entry: '//localhost:3000',
        container: '#content',
        activeRule: '/app-react',
    },
    {
        name: 'vueApp',
        entry: '//localhost:8080',
        container: '#content',
        activeRule: '/app-vue',
    }
]);

start({
    sandbox: {
        strictStyleIsolation: true
    }
});