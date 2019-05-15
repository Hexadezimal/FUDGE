/// <reference path="DebugTarget.ts"/>
namespace Fudge {
    export class DebugTextArea extends DebugTarget {
        public static textArea: HTMLTextAreaElement = document.createElement("textarea");
        public static delegates: MapDebugFilterToFunction = {
            [DEBUG_FILTER.INFO]: DebugAlert.createDelegate("Info")
        };
        public static createDelegate(_headline: string): Function {
            let delegate: Function = function (_message: Object, ..._args: Object[]): void {
                let out: string = _headline + "\n\n" + DebugTarget.mergeArguments(_message, _args);
                DebugTextArea.textArea.textContent += out;
            };
            return delegate;
        }
    }
}