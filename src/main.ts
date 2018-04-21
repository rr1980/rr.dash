
 import './polyfills';


// import 'bootstrap';
import './assets/styles/style.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ViewEncapsulation } from '@angular/core';


if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        console.debug("hot reload!!!");
        // Before restarting the app, we create a new root element and dispose the old one
        const oldRootElem = document.querySelector('rr-app');
        const newRootElem = document.createElement('rr-app');
        oldRootElem!.parentNode!.insertBefore(newRootElem, oldRootElem);
        modulePromise.then(appModule => appModule.destroy());
    });
} 
// else {
//     enableProdMode();
// }


const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule, [
    {
        // defaultEncapsulation: ViewEncapsulation.None
    }
]);
