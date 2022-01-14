import { PropType } from 'vue';
declare type inputType = 'text' | 'textarea';
declare const _default: import("vue").DefineComponent<{
    modelValue: (StringConstructor | NumberConstructor)[];
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<inputType>;
        default: string;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
    };
    background: {
        type: StringConstructor;
    };
}, {
    inputVal: import("vue").Ref<string | number>;
    updateInput: (e: Event) => void;
    placeholder: import("vue").Ref<string>;
    type: import("vue").Ref<inputType>;
    computedStyle: import("vue").ComputedRef<{
        color?: string;
        background?: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    placeholder?: unknown;
    type?: unknown;
    readonly?: unknown;
    color?: unknown;
    background?: unknown;
} & {
    type: inputType;
    readonly: boolean;
    placeholder: string;
} & {
    background?: string;
    color?: string;
    modelValue?: string | number;
}>, {
    type: inputType;
    readonly: boolean;
    placeholder: string;
}>;
export default _default;
