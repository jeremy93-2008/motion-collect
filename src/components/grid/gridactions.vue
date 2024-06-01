<script setup lang="ts">
import PlusIcon from 'assets/plus.svg'

const dropdownId = useId()
const tooltipId = useId()
</script>
<template>
    <VDropdown :aria-id="dropdownId" distance="8">
        <VTooltip :aria-id="tooltipId" placement="bottom" distance="8">
            <div class="poster--item_add-button">
                <img :src="PlusIcon" alt="Add to a collection" />
            </div>
            <template #popper>Add to a collection</template>
        </VTooltip>
        <template #popper>
            <List />
        </template>
    </VDropdown>
</template>
<style scoped>
.poster--item_add-button {
    padding: 8px;
    border-radius: 50%;
    border: solid 3px transparent;
    cursor: pointer;
    transition:
        border 0.3s ease-in-out,
        background-color 0.3s ease-in-out;

    &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
    }

    & img {
        width: 24px;
        height: 24px;
    }
}
</style>
