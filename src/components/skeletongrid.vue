<script setup lang="ts">
defineProps({
    count: {
        type: Number,
        default: 8,
    },
})
</script>

<template>
    <noimage v-for="i in count" class="min-h-[380px]" />
</template>
