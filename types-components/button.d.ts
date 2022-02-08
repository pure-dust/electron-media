import { PropType } from 'vue';
import { themed } from '../types-utils';
declare type ButtonType = 'default' | 'primary' | 'error' | 'success' | 'warning';
declare type ButtonSize = 'small' | 'normal' | 'large';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<ButtonType>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<ButtonSize>;
        default: string;
    };
}, {
    buttonClass: import("vue").ComputedRef<string>;
    icon: import("vue").Ref<string>;
    onClick: (e: MouseEvent) => void;
    themed: typeof themed;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type?: unknown;
    disabled?: unknown;
    icon?: unknown;
    round?: unknown;
    plain?: unknown;
    size?: unknown;
} & {
    type: ButtonType;
    disabled: boolean;
    icon: string;
    round: boolean;
    plain: boolean;
    size: ButtonSize;
} & {}>, {
    type: ButtonType;
    disabled: boolean;
    icon: string;
    round: boolean;
    plain: boolean;
    size: ButtonSize;
}>;
export default _default;
