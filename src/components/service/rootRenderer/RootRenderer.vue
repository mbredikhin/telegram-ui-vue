<template>
  <Teleport
    v-if="appRootInjection.teleportContainer"
    :to="appRootInjection.teleportContainer"
  >
    <slot />
  </Teleport>
  <slot v-else />
</template>

<script setup lang="ts">
import { useAppRootInjection } from '../appRoot';

const appRootInjection = useAppRootInjection();
</script>
