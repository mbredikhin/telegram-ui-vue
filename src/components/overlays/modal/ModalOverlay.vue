<template>
  <DrawerOverlay
    :style="{
      background: `rgba(${overlayBgColor[0]}, ${overlayBgColor[1]}, ${overlayBgColor[2]}, 0.4)`,
    }"
    class="modal-overlay"
  />
</template>

<script setup lang="ts">
import {
  AppRootInjection,
  useAppRootInjection,
} from '@/components/service/appRoot';
import { hexToRGB } from '@/lib/color';
import { getTelegramData } from '@/lib/telegram';
import { DrawerOverlay } from 'vauland';
import { computed, Ref } from 'vue';

const DEFAULT_LIGHT_OVERLAY_RGB = [255, 255, 255];
const DEFAULT_DARK_OVERLAY_RGB = [33, 33, 33];

const appRootInjection = useAppRootInjection() as Ref<AppRootInjection>;

const overlayBgColor = computed(() => {
  const telegramData = getTelegramData();
  if (telegramData && telegramData.themeParams.bg_color) {
    return hexToRGB(telegramData.themeParams.bg_color);
  }

  return appRootInjection.value.appearance === 'light'
    ? DEFAULT_LIGHT_OVERLAY_RGB
    : DEFAULT_DARK_OVERLAY_RGB;
});
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--tgui-z-index-overlay);
}
</style>
