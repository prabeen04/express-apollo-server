"use strict";
console.log('welcome');
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () { return console.log('Module disposed. '); });
}
