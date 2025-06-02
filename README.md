<h1 align="center">telegram-ui-vue</h1>

<p align="center">
Vue UI kit for Telegram Mini Apps inspired by Telegram interface.
<p>

<p align="center">
<a href="https://www.npmjs.com/package/telegram-ui-vue" target="__blank"><img src="https://img.shields.io/npm/v/telegram-ui-vue?style=flat&colorA=002438&colorB=41c399" alt="NPM version"></a>
</p>

## Overview

<p>
This UI kit equips you with a variety of pre-designed components and tools to help you quickly develop high-quality Telegram applications. Whether you're aiming to create custom client apps, integrate Telegram functionality, or develop unique bots, this toolkit is your go-to resource.
<p>

## Features

- **Cross-Platform Design Consistency:** Use built-in support for iOS’s Human Interface Guidelines and Android’s Material Design to maintain a uniform look and functionality across both platforms.
- **Pre-designed UI Components:** Access a variety of ready-to-use UI components inspired by Telegram’s interface, designed for easy integration and customization.
- **Responsive Design:** Create apps that look and work great on any device, using flexible layouts and media queries to ensure optimal display and functionality.
- **Telegram Color Scheme Support:** Apply Telegram’s native color schemes to your apps for consistent branding and a familiar user experience.

## 🖥 Environment Support

- Modern browsers
- [All known](https://telegram.org/apps) Telegram clients

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Ios |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \>= 79                                                                                                                                                                                               | \>= 78                                                                                                                                                                                                           | \>= 73                                                                                                                                                                                                       | \>= 12.0                                                                                                                                                                                                     | \>= 12.0                                                                                                                                                                                                  |

## Installation

```bash
pnpm add telegram-ui-vue
```

```bash
npm install telegram-ui-vue
```

```bash
yarn add telegram-ui-vue
```

## Resources

- **Playground and Storybook:** Experiment with components and visualize changes in real-time at <a href="https://telegram-ui-vue.mbredikhin.com" target="__blank">Playground and Storybook</a>
- **Figma Resources:** Design and prototype with ease using our comprehensive Figma files available at [Figma](https://figma.com/community/file/1348989725141777736/).

## Usage

```js
<template>
  <AppRoot>
    <Placeholder>
      <template #header>Title</template>
      <template #description>Description</template>
      <img
        alt="Telegram sticker"
        src="https://storage.mbredikhin.com/tg-banana.gif"
        style="display: block; width: 144px; height: 144px"
      />
    </Placeholder>
  </AppRoot>
</template>

<script setup lang="ts">
import 'telegram-ui-vue/dist/index.css';
import { AppRoot, Placeholder } from 'telegram-ui-vue';
</script>
```

## Dev Setup

1. Clone the repo `git clone git@github.com:mbredikhin/telegram-ui-vue.git`
2. Run `pnpm install`
3. Run `pnpm dev` to run storybook, preview is available at `http://localhost:6006`

- Run `pnpm build` to run build `telegram-ui-vue` locally
- Run `pnpm build-stories` to build stories locally
- Run `pnpm test` to run unit tests

## Releases

For changelog, visit [releases](https://github.com/mbredikhin/telegram-ui-vue/releases).

## Contributing

We would love to have your contributions, all PRs are welcome! We need help building the core components, docs, tests, stories.
