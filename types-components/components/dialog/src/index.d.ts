declare const _default: import("vue").DefineComponent<{
    visible: {
        required: true;
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, {
    visible: import("vue").Ref<boolean>;
    title: import("vue").Ref<string | boolean>;
    onClose: () => void;
    slots: Readonly<{
        [name: string]: import("vue").Slot;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "onClose"[], "onClose", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    visible?: unknown;
    title?: unknown;
} & {
    visible: boolean;
    title: string | boolean;
} & {}> & {
    onOnClose?: (...args: any[]) => any;
}, {
    title: string | boolean;
}>;
export default _default;
