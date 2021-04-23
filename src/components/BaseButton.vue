<template>
  <button :part="partName">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed } from 'vue'
export default {
  name: 'BaseButton',
  props: {
    color: {
      type: String,
      validator (value) {
        return [
          'primary',
          'secondary'
        ].includes(value)
      },
      default: 'primary'
    }
  },
  setup (props) {
    const partName = computed(() => `base-button ${props.color}`)

    return {
      partName
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables.scss';

#{$app-selector} {
  &::part(base-button) {
    display: inline-block;
    width: 100%;
    min-width: 118px;
    padding: 14px 32px;
    margin-top: 1em;
    border-radius: 6px;
    font-family: $font-family;
    font-size: $font-size;
    font-weight: $font-bold;
    background: color('primary');
    color: color('light');
    cursor: pointer;
    border: none;
    outline: 0;
    transition: 0.1s ease;

    &:hover {
      box-shadow: 0 4px 20px color('primary', 'light');
    }
  }

  &::part(secondary) {
    background: color('secondary');
    color: color('dark');

    &:hover {
      box-shadow: none;
      background: color('secondary', 'dark');
    }
  }
}
</style>
