import App from './App';
import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue';
export function createApp() {
    const app = createSSRApp(App);
	  app.use(uviewPlus)
    return {
        app
    };
}
