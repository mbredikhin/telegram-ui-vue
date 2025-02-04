<template>
  <a class="link"><slot /></a>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: var(--tgui-link-color);
}
</style>
