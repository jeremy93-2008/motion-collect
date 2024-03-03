<script setup lang="ts">
import { ClerkLoaded, SignInButton, useAuth, UserButton } from 'vue-clerk'

const { isSignedIn } = useAuth()
</script>

<template>
    <section class="profile-user">
        <ClerkLoaded>
            <UserButton v-if="isSignedIn" />
            <SignInButton v-else />
        </ClerkLoaded>
    </section>

</template>

<style scoped>
section.profile-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-white);
    background: var(--color-background);
}
</style>