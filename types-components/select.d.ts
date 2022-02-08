import { PropType, Ref } from 'vue';
import { themed } from '../types-utils';
interface SelectOption {
    name: string;
    value: string | number;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: (StringConstructor | NumberConstructor)[];
    placeholder: {
        type: StringConstructor[];
        default: string;
    };
    options: {
        type: PropType<SelectOption[]>;
        default: () => any[];
    };
}, {
    inputVal: Ref<string | number>;
    placeholder: Ref<string>;
    themed: typeof themed;
    dropVisible: Ref<boolean>;
    inputBlur: () => void;
    options: Ref<SelectOption[]>;
    onItemClick: (item: SelectOption) => void;
    selectRef: Ref<HTMLElement>;
    dropStyle: {
        width: string;
        top: string;
        left: string;
        maxHeight: string;
        bottom: string;
    };
    tansitionName: Ref<string>;
    inputClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    placeholder?: unknown;
    options?: unknown;
} & {
    options: SelectOption[];
    placeholder: string;
} & {
    modelValue?: string | number;
}>, {
    options: SelectOption[];
    placeholder: string;
}>;
export default _default;
