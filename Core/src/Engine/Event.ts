namespace Fudge {
    export interface MapEventTypeToListener {
        [eventType: string]: EventListener[];
    }

    /**
     * Types of events specific to Fudge, in addition to the standard DOM/Browser-Types and custom strings
     */
    export enum EVENT {
        ANIMATION_FRAME = "animationFrame", /** fired, when requested animation frame starts */
        COMPONENT_ADD = "componentAdd",
        COMPONENT_REMOVE = "componentRemove",
        CHILD_ADD = "childAdd",
        CHILD_REMOVE = "childRemove",
        MUTATE = "mutate"
    }
    /**
     * Base class for EventTarget singletons, which are fixed entities in the structure of Fudge, such as the core loop 
     */
    export class EventTargetStatic extends EventTarget {
        protected static targetStatic: EventTargetStatic = new EventTargetStatic();

        protected constructor() {
            super();
        }

        public static addEventListener(_type: string, _handler: EventListener): void {
            EventTargetStatic.targetStatic.addEventListener(_type, _handler);
        }
        public static removeEventListener(_type: string, _handler: EventListener): void {
            EventTargetStatic.targetStatic.removeEventListener(_type, _handler);
        }
        public static dispatchEvent(_event: Event): boolean {
            EventTargetStatic.targetStatic.dispatchEvent(_event);
            return true;
        }
    }
}