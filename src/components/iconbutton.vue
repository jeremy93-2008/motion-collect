<script setup lang="ts">
defineProps({
    variant: {
        type: String,
        default: 'secondary',
    },
    icon: String,
    size: {
        type: String,
        default: '16px',
    },
    className: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <button :class="disabled ? 'disabled' : ''" class="iconbutton">
        <img
            :class="`h-[${size}] w-[${size}] ${className} ${variant === 'primary' ? 'primary' : ''}`"
            :src="icon"
            alt="icon"
        />
    </button>
</template>

<style scoped>
.iconbutton {
    display: flex;
    flex: 0;
    align-items: center;
    color: var(--color-white);
    padding: 12px;
    border-radius: 100%;
    cursor: pointer;
    border: solid 2px transparent;

    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:hover:not(.disabled) {
        border: solid 2px var(--color-shade);
    }
    &:active:not(.disabled) {
        border: solid 2px var(--color-white);
    }

    &:has(.primary):hover:not(.disabled):not(.selected) {
        background-color: var(--color-accent);
        border: solid 2px var(--color-accent);
    }

    &:has(.primary):active:not(.disabled):not(.selected) {
        background-color: var(--color-accent);
        border: solid 2px var(--color-white);
    }
}
</style>
