"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const phonegap_class_1 = require("./phonegap.class");
let pg;
window.addEventListener('load', () => {
    init();
});
function init() {
    const domAppDir = document.getElementById('app-dir');
    const domSubmitBtn = document.getElementById('open-phonegap-dir');
    domSubmitBtn.addEventListener('click', (event) => {
        const appDir = domAppDir.files[0].path;
        if (appDir == null) {
            alert('Bitte App-Verzeichnis angeben');
        }
        else {
            openPhoneGapProject(appDir);
        }
    });
}
function openPhoneGapProject(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(dir);
        pg = new phonegap_class_1.PhoneGap();
        try {
            console.log('open project');
            let opened = yield pg.openProject(dir);
            createServeProjectBtn();
        }
        catch (error) {
            console.error(error);
        }
    });
}
function createServeProjectBtn() {
    if (!document.getElementById('serve-phonegap-btn')) {
        let body = document.getElementsByTagName('body')[0];
        let runBtn = document.createElement('button');
        runBtn.setAttribute('id', 'serve-phonegap-btn');
        runBtn.innerHTML = 'Serve project';
        runBtn.addEventListener('click', function (event) {
            pg.serveProject();
        });
        body.appendChild(document.createElement('br'));
        body.appendChild(runBtn);
    }
}
//# sourceMappingURL=phonegap-open.renderer.js.map