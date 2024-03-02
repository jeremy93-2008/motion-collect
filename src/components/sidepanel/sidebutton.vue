<script setup lang="ts">
defineProps({
  leftIcon: String,
  selected: Boolean,
});
defineEmits(['click']);

</script>

<template>
  <button @click="$emit('click');" class="button" :class="{selected}">
    <img class="h-[24px] w-[24px] mr-4" :src="leftIcon" alt="icon" />
    <slot />
  </button>
</template>

<style scoped>
  .button {
    display: flex;
    align-items: center;
    color: var(--color-white);
    padding: 16px 24px;
    border: none;
    border-radius: 48px;
    cursor: pointer;
    border: 2px solid transparent;

    &.selected {
      background-color: var(--color-accent);
      border: 2px solid transparent;
    }

    &:hover {
      border: 2px solid var(--color-shade);
    }

    &.selected:hover {
      border: 2px solid var(--color-white);
    }
  }
</style>