import { Ref } from 'vue';
import { HSB } from '../../../utils';
interface pos {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: StringConstructor[];
    defaultValue: {
        type: StringConstructor;
        default: string;
    };
}, {
    colorBox: Ref<HTMLElement>;
    slideBar: Ref<HTMLElement>;
    pointMove: (ev: MouseEvent) => void;
    pointStyle: import("vue").ComputedRef<string>;
    slideMove: (ev: MouseEvent) => void;
    slide: Ref<number>;
    hsb: HSB;
    bgStyle: import("vue").ComputedRef<string>;
    visible: Ref<boolean>;
    reference: Ref<HTMLElement>;
    computedStyle: Ref<pos>;
    open: () => void;
    close: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    defaultValue?: unknown;
} & {
    defaultValue: string;
} & {
    modelValue?: string;
}> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    defaultValue: string;
}>;
export default _default;
