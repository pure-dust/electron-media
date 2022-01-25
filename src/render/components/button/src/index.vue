<template>
  <button class="kl-button" :class="buttonClass" @click="onClick">
    <kl-icon
      class="kl-button-icon"
      v-if="icon !== ''"
      :icon="icon"
      :auto="false"
      :size="12"
      :color="themed(type === 'default' ? 'primary' : type)"
    />
    <span :style="{ paddingLeft: icon !== '' ? '14px' : 0 }">
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { themed } from '../../../utils';
type ButtonType = 'default' | 'primary' | 'error' | 'success' | 'warning';
type ButtonSize = 'small' | 'normal' | 'large';
export default defineComponent({
  name: 'KlButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'normal',
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, { emit }) {
    const { type, disabled, icon, round, plain, size, text } = toRefs(prop);

    const buttonClass = computed(() => {
      let styles = [];
      if (disabled.value)
        styles.push(
          plain.value ? 'kl-button-disabled-plain' : 'kl-button-disabled',
        );
      if (round.value) {
        styles.push('kl-button-round');
      }
      if (plain.value) {
        styles.push(`kl-button-${type.value}-plain`);
      } else {
        styles.push(`kl-button-${type.value}`);
      }
      if (text.value) {
        styles.push(`is-text`);
      }
      styles.push(`size-${size.value}`);
      return styles.join(' ');
    });

    const onClick = (e: MouseEvent) => {
      e.stopImmediatePropagation();
      if (disabled.value) return;
      emit('click', e);
    };

    return {
      buttonClass,
      icon,
      onClick,
      themed,
    };
  },
});
</script>
<style lang="scss">
.kl-button {
  display: inline-flex;
  align-items: center;
  position: relative;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #ffffff;
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-weight: 500;
  user-select: none;
  @include size(small);
  border-radius: 2px;
  margin-right: 10px;
  overflow: hidden;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  &-icon {
    position: absolute;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &.size-small {
    padding: 4px 8px;
  }
  &.size-normal {
    padding: 6px 12px;
  }
  &.size-large {
    padding: 8px 16px;
  }

  &.is-text {
    border: none;
    padding: 0;
    background: transparent;
  }
}

@mixin theme($theme) {
  .kl-button-#{$theme} {
    @if $theme != disabled {
      background-color: themed($theme);
      border: 1px solid themed(#{$theme}-dark);

      &.is-text {
        color: themed($theme);
      }

      &:hover:not(.is-text) {
        background-color: themed(#{$theme}-hover);
      }

      &:active:not(.is-text) {
        background-color: themed($theme);
      }
    } @else {
      background-color: themed($theme) !important;
      border: 1px solid themed(#{$theme}-dark) !important;
      cursor: default;

      &:hover:not(.is-text) {
        background-color: themed(#{$theme}) !important;
      }

      &:active:not(.is-text) {
        background-color: themed($theme) !important;
      }
    }
  }

  .kl-button-#{$theme}-plain {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.3;
      background-color: themed($theme);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      z-index: 1;
    }

    @if $theme != disabled {
      border: 1px solid themed(#{$theme}-dark);
      color: themed($theme);

      &:hover:not(.is-text) {
        &::before {
          opacity: 1;
        }
        @include color(light);
      }

      &:active:not(.is-text) {
        &::before {
          background-color: themed(#{$theme}-dark);
          opacity: 1;
        }
      }
    } @else {
      border: 1px solid themed(#{$theme}-dark) !important;
      cursor: default;
      color: themed($theme);

      &:hover:not(.is-text) {
        &::before {
          opacity: 0.3 !important;
        }
        color: themed($theme) !important;
      }

      &:active:not(.is-text) {
        &::before {
          opacity: 0.3 !important;
        }
      }
    }
  }
}

.kl-button-default {
  background-color: themed(bg-light);
  border: 1px solid themed(border-light);
  color: themed(primary);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background-color: themed(primary);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 1;
  }

  &:hover:not(.is-text) {
    border: 1px solid themed(primary);
    color: themed(primary);
    &::before {
      opacity: 0.3;
    }
  }

  &:active:not(.is-text) {
    border: 1px solid themed(primary);
  }
}

@include theme(primary);
@include theme(success);
@include theme(warning);
@include theme(error);
@include theme(disabled);
</style>
