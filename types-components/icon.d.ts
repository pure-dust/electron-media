declare const _default: import("vue").DefineComponent<{
    icon: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    animate: {
        type: BooleanConstructor;
        default: boolean;
    };
    hover: {
        type: BooleanConstructor;
        default: boolean;
    };
    fixedHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    auto: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    iconStyle: import("vue").ComputedRef<{
        fill: string;
        fontSize: string;
        width?: string;
        height?: string;
    }>;
    iconClass: import("vue").ComputedRef<string>;
    icon: import("vue").Ref<string>;
    onClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    icon?: unknown;
    color?: unknown;
    animate?: unknown;
    hover?: unknown;
    fixedHover?: unknown;
    size?: unknown;
    auto?: unknown;
} & {
    icon: string;
    size: string | number;
    auto: boolean;
    color: string;
    animate: boolean;
    hover: boolean;
    fixedHover: boolean;
} & {}>, {
    icon: string;
    size: string | number;
    auto: boolean;
    color: string;
    animate: boolean;
    hover: boolean;
    fixedHover: boolean;
}>;
export default _default;
