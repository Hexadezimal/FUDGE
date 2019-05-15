/// <reference path="DebugTarget.ts"/>
namespace Fudge {
    export class DebugAlert extends DebugTarget {
        public static delegates: MapDebugFilterToFunction = {
            [DEBUG_FILTER.INFO]: DebugAlert.createDelegate("Info")
        };
        public static createDelegate(_headline: string): Function {
            let delegate: Function = function (_message: Object, _args: Object[] = null): void {
                let out: string = _headline + "\n\n" + DebugTarget.mergeArguments(_message, _args);
                alert(out);
            };
            return delegate;
        }
    }
}